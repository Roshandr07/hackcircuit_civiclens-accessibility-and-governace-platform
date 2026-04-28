import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

models_to_test = [
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-pro',
    'gemini-pro-latest',
    'gemini-flash-latest',
    'gemini-1.0-pro'
]

print(f"Testing API Key: {GEMINI_API_KEY[:10]}...")

for model_name in models_to_test:
    print(f"\nTesting {model_name}...")
    try:
        model = genai.GenerativeModel(model_name)
        response = model.generate_content("Hi")
        print(f"SUCCESS {model_name}: {response.text[:50]}")
    except Exception as e:
        print(f"FAILED {model_name}: {e}")
