import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from pydantic import BaseModel
from typing import List, Optional
import io
import PIL.Image
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
import models, database, auth
from database import engine, get_db

load_dotenv()

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="CivicLens AI API")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "YOUR_API_KEY_HERE")
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-flash-latest')

class ChatRequest(BaseModel):
    message: str
    language: str = "en"  # "en", "hi", "kn"

class StepSimplification(BaseModel):
    step_number: int
    title: str
    description: str

class ChatResponse(BaseModel):
    answer: str
    steps: Optional[List[StepSimplification]] = None

class EligibilityRequest(BaseModel):
    income: int
    occupation: str
    category: str
    state: str = "Karnataka"
    has_house: bool = True
    is_pregnant: bool = False
    language: str = "en"

class SchemeResult(BaseModel):
    name: str
    is_eligible: bool
    reason: str

class EligibilityResponse(BaseModel):
    results: List[SchemeResult]

# --- Auth Models ---
class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserResponse(BaseModel):
    username: str

@app.get("/")
async def root():
    return {"status": "active", "service": "CivicLens AI"}

# --- Auth Routes ---
@app.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    access_token = auth.create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/me", response_model=UserResponse)
def get_me(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = auth.decode_access_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    username = payload.get("sub")
    db_user = db.query(models.User).filter(models.User.username == username).first()
    if db_user is None:
        raise HTTPException(status_code=401, detail="User not found")
    
    return db_user

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        lang_map = {
            "en": "English",
            "hi": "Hindi",
            "kn": "Kannada"
        }
        full_language = lang_map.get(request.language, "English")
        
        prompt = f"""
        You are CivicLens AI, an expert in simplifying government services.
        User Question: {request.message}
        Target Language: {full_language}
        
        CRITICAL: YOU MUST RESPOND ENTIRELY IN {full_language}.
        
        GOAL: Provide a simple, clear, and actionable response.
        
        FORMAT:
        1. Start with a concise ANSWER (1-2 sentences).
        2. If the user is asking "how to" or for a process, provide STEPS.
        3. Steps must be strictly in the format: "Step X: [Action] → [Detail]"
        4. Focus on the core actions: "Fill Form", "Attach Documents", "Visit Office".
        
        Example Steps Format (if Target Language was English):
        Step 1: Get Form → Download Form 1A from Seva Sindhu portal.
        Step 2: Attach Proof → Attach Aadhaar card and Address proof.
        Step 3: Submit → Submit at the nearest Taluk office.
        
        REMEMBER: Everything, including "Step X" and titles, must be in {full_language}. 
        Important: Use the "→" symbol exactly as shown.
        """
        
        response = model.generate_content(prompt)
        
        full_text = response.text
        
        # Parse logic
        answer = ""
        steps = []
        
        # Split by "Step" to isolate the answer and steps
        parts = full_text.split("Step 1:")
        answer = parts[0].strip()
        
        if len(parts) > 1:
            # Reconstruct the steps text and split by "Step"
            steps_text = "Step 1:" + parts[1]
            step_blocks = steps_text.split("Step ")
            
            for block in step_blocks:
                if ":" in block:
                    try:
                        step_parts = block.split(":", 1)
                        num_part = step_parts[0].strip()
                        content_part = step_parts[1]
                        
                        if "→" in content_part:
                            title, desc = content_part.split("→", 1)
                        elif "->" in content_part:
                            title, desc = content_part.split("->", 1)
                        elif ":" in content_part:
                            title, desc = content_part.split(":", 1)
                        else:
                            title = content_part.strip()
                            desc = ""
                            
                        steps.append(StepSimplification(
                            step_number=int(num_part) if num_part.isdigit() else (len(steps) + 1),
                            title=title.strip(),
                            description=desc.strip()
                        ))
                    except Exception as e:
                        print(f"Error parsing step: {e}")
                        continue

        return ChatResponse(answer=answer, steps=steps)
    except Exception as e:
        error_msg = str(e)
        print(f"ERROR in chat: {error_msg}")
        raise HTTPException(status_code=500, detail=error_msg)

@app.post("/analyze-document", response_model=ChatResponse)
async def analyze_document(
    file: UploadFile = File(...),
    language: str = Form("en")
):
    try:
        content = await file.read()
        image = PIL.Image.open(io.BytesIO(content))
        
        lang_map = {
            "en": "English",
            "hi": "Hindi",
            "kn": "Kannada"
        }
        full_language = lang_map.get(language, "English")

        prompt = f"""
        Analyze this government document and explain it simply in {full_language}.
        Format the steps if there is a process involved using: 'Step X: [Action] → [Detail]'.
        Ensure all output is in {full_language}.
        """
        
        response = model.generate_content([prompt, image])
        
        # Simple parse for document analysis (reusing the chat logic)
        full_text = response.text
        parts = full_text.split("Step 1:")
        answer = parts[0].strip()
        steps = []
        # ... simplified parsing (similar to chat)
        
        return ChatResponse(answer=answer, steps=steps)
    except Exception as e:
        print(f"ERROR in doc analysis: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/check-eligibility", response_model=EligibilityResponse)
async def check_eligibility(request: EligibilityRequest):
    try:
        lang_map = {"en": "English", "hi": "Hindi", "kn": "Kannada"}
        full_language = lang_map.get(request.language, "English")

        prompt = f"""
        User Profile for Social Welfare Eligibility:
        - Annual Income: \u20b9{request.income}
        - Occupation: {request.occupation}
        - Category: {request.category}
        - State: {request.state}
        - Has Pucca House: {request.has_house}
        - Is Pregnant: {request.is_pregnant}

        As CivicLens AI, determine eligibility for these schemes:
        1. PM Kisan Samman Nidhi
        2. Ayushman Bharat (PM-JAY)
        3. Ration Card (BPL vs APL)
        4. PM Awas Yojana
        5. Janani Suraksha Yojana

        Respond strictly in JSON format matching this structure:
        {{
          "results": [
            {{
              "name": "Scheme Name",
              "is_eligible": true/false,
              "reason": "Brief reason in {full_language}"
            }}
          ]
        }}
        """

        response = model.generate_content(prompt)
        # Extract JSON from potential markdown blocks
        clean_text = response.text.replace('```json', '').replace('```', '').strip()
        import json
        data = json.loads(clean_text)
        
        return EligibilityResponse(results=data['results'])
    except Exception as e:
        print(f"ERROR in eligibility: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
