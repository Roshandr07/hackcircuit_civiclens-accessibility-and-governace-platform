import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChatPage from './components/ChatPage';
import DocumentPage from './components/DocumentPage';
import PortalPage from './components/PortalPage';
import EligibilityPage from './components/EligibilityPage';
import CentersPage from './components/CentersPage';
import NewsPage from './components/NewsPage';
import CalendarPage from './components/CalendarPage';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Register from './components/Register';

const translations = {
  en: {
    heroTitle: "Simplify Government Services",
    heroSub: "CivicLens AI makes it easier for every citizen to understand and access essential documents and services through advanced artificial intelligence.",
    getStarted: "Get Started",
    navChat: "Chat",
    navDocs: "Documents",
    navPortals: "Portals",
    navEligibility: "Eligibility",
    navCenters: "Centers",
    navNews: "News",
    navCalendar: "Calendar",
    chatPlaceholder: "Type your question...",
    thinking: "Thinking...",
    voiceAssistant: "Voice Assistant",
    voiceSub: "Ask anything about government services in English, Hindi, or Kannada.",
    suggestionsTitle: "Common Questions",
    suggest1: "How to apply for Aadhar?",
    suggest2: "Ration card eligibility",
    suggest3: "Scholarship services",
    suggest4: "Voter ID correction",
    suggest5: "Income certificate process",
    suggest6: "Pension scheme details",
    docTitle: "Analyze Documents",
    docSub: "Upload any government document ID or notice to get a simplified explanation.",
    dropzone: "Drag & drop here",
    dropzoneSub: "Supports Aadhar, Ration Card, etc. (JPG/PNG)",
    selectFile: "Select File",
    aiInsights: "AI Insights",
    analyzingDoc: "Analyzing Document...",
    visionAi: "Gemini Vision AI is extracting key details",
    uploadPrompt: "Upload a document to see the smart analysis",
    back: "Back",
    step: "Step",
    action: "Action",
    portalTitle: "Official Portals",
    portalSub: "Direct access to essential government websites.",
    eligibilityTitle: "Eligibility Checker",
    eligibilitySub: "Check if you qualify for various social welfare schemes.",
    centersTitle: "Nearby Centers",
    centersSub: "Find official Seva and grievance centers near you.",
    newsTitle: "Governance News",
    newsSub: "Stay updated with the latest policy changes and announcements.",
    calendarTitle: "Important Dates",
    calendarSub: "Deadlines for renewals, applications, and payments."
  },
  hi: {
    heroTitle: "सरकारी सेवाओं को सरल बनाएं",
    heroSub: "CivicLens AI उन्नत कृत्रिम बुद्धिमत्ता (AI) के माध्यम से प्रत्येक नागरिक के लिए आवश्यक दस्तावेजों और सेवाओं को समझना और उन तक पहुँचना आसान बनाता है।",
    getStarted: "शुरू करें",
    navChat: "चैट",
    navDocs: "दस्तावेज़",
    navPortals: "पोर्टल",
    navEligibility: "पात्रता",
    navCenters: "केंद्र",
    navNews: "समाचार",
    navCalendar: "कैलेंडर",
    chatPlaceholder: "अपना प्रश्न पूछें...",
    thinking: "सोच रहा हूँ...",
    voiceAssistant: "वॉयस असिस्टेंट",
    voiceSub: "सरकारी सेवाओं के बारे में अंग्रेजी, हिंदी या कन्नड़ में कुछ भी पूछें।",
    suggestionsTitle: "सामान्य प्रश्न",
    suggest1: "आधार के लिए आवेदन कैसे करें?",
    suggest2: "राशन कार्ड पात्रता",
    suggest3: "छात्रवृत्ति सेवाएं",
    suggest4: "वोटर आईडी सुधार",
    suggest5: "आय प्रमाण पत्र प्रक्रिया",
    suggest6: "पेंशन योजना विवरण",
    docTitle: "दस्तावेज़ों का विश्लेषण करें",
    docSub: "सरलीकृत स्पष्टीकरण प्राप्त करने के लिए कोई भी सरकारी पहचान पत्र या नोटिस अपलोड करें।",
    dropzone: "यहाँ खींचें और छोड़ें",
    dropzoneSub: "आधार, राशन कार्ड, आदि (JPG/PNG) का समर्थन करता है",
    selectFile: "फ़ाइल चुनें",
    aiInsights: "AI अंतर्दृष्टि",
    analyzingDoc: "दस्तावेज़ का विश्लेषण हो रहा है...",
    visionAi: "जेमिनी विजन एआई मुख्य विवरण निकाल रहा है",
    uploadPrompt: "स्मार्ट विश्लेषण देखने के लिए एक दस्तावेज़ अपलोड करें",
    back: "पीछे",
    step: "चरण",
    action: "कार्रवाई",
    portalTitle: "आधिकारिक पोर्टल",
    portalSub: "आवश्यक सरकारी वेबसाइटों तक सीधी पहुँच।",
    eligibilityTitle: "पात्रता जाँचकर्ता",
    eligibilitySub: "जांचें कि क्या आप विभिन्न समाज कल्याण योजनाओं के लिए पात्र हैं।",
    centersTitle: "नज़दीकी केंद्र",
    centersSub: "अपने आस-पास के आधिकारिक सेवा और शिकायत केंद्र खोजें।",
    newsTitle: "शासन समाचार",
    newsSub: "नवीनतम नीति परिवर्तनों और घोषणाओं के साथ अपडेट रहें।",
    calendarTitle: "महत्वपूर्ण तिथियां",
    calendarSub: "नवीनीकरण, आवेदन और भुगतान की समय सीमा।"
  },
  kn: {
    heroTitle: "ಸರ್ಕಾರಿ ಸೇವೆಗಳನ್ನು ಸರಳಗೊಳಿಸಿ",
    heroSub: "CivicLens AI ಸುಧಾರಿತ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯ ಮೂಲಕ ಪ್ರತಿಯೊಬ್ಬ ನಾಗರಿಕರಿಗೆ ಅಗತ್ಯ ದಾಖಲೆಗಳು ಮತ್ತು ಸೇವೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮತ್ತು ಪ್ರವೇಶಿಸಲು ಸುಲಭಗೊಳಿಸುತ್ತದೆ.",
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    navChat: "ಚಾಟ್",
    navDocs: "ದಾಖಲೆಗಳು",
    navPortals: "ಪೋರ್ಟಲ್‌ಗಳು",
    navEligibility: "ಅರ್ಹತೆ",
    navCenters: "ಕೇಂದ್ರಗಳು",
    navNews: "ಸುದ್ದಿ",
    navCalendar: "ಕ್ಯಾಲೆಂಡರ್",
    chatPlaceholder: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...",
    thinking: "ಯೋಚಿಸುತ್ತಿದೆ...",
    voiceAssistant: "ಧ್ವನಿ ಸಹಾಯಕ",
    voiceSub: "ಸರ್ಕಾರಿ ಸೇವೆಗಳ ಬಗ್ಗೆ ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ ಅಥವಾ ಕನ್ನಡದಲ್ಲಿ ಏನು ಬೇಕಾದರೂ ಕೇಳಿ.",
    suggestionsTitle: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು",
    suggest1: "ಆಧಾರ್‌ಗಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು ಹೇಗೆ?",
    suggest2: "ಪಡಿತರ ಚೀಟಿ ಅರ್ಹತೆ",
    suggest3: "ಶಿಷ್ಯವೇತನ ಸೇವೆಗಳು",
    suggest4: "ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ ತಿದ್ದುಪಡಿ",
    suggest5: "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಪ್ರಕ್ರಿಯೆ",
    suggest6: "ಪಿಂಚಣಿ ಯೋಜನೆಯ ವಿವರಗಳು",
    docTitle: "ದಾಖಲೆಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    docSub: "ಸರಳೀಕೃತ ವಿವರಣೆಯನ್ನು ಪಡೆಯಲು ಯಾವುದೇ ಸರ್ಕಾರಿ ದಾಖಲೆ ಅಥವಾ ನೋಟಿಸ್ ಅನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    dropzone: "ಇಲ್ಲಿ ಎಳೆಯಿರಿ ಮತ್ತು ಬಿಡಿ",
    dropzoneSub: "ಆಧಾರ್, ಪಡಿತರ ಚೀಟಿ ಇತ್ಯಾದಿಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ (JPG/PNG)",
    selectFile: "ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ",
    aiInsights: "AI ಒಳನೋಟಗಳು",
    analyzingDoc: "ದಾಖಲೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    visionAi: "ಜೆಮಿನಿ ವಿಷನ್ AI ಪ್ರಮುಖ ವಿವರಗಳನ್ನು ಹೊರತೆಗೆಯುತ್ತಿದೆ",
    uploadPrompt: "ಸ್ಮಾರ್ಟ್ ವಿಶ್ಲೇಷಣೆಯನ್ನು ನೋಡಲು ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    back: "ಹಿಂದಕ್ಕೆ",
    step: "ಹಂತ",
    action: "ಕ್ರಮ",
    portalTitle: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗಳು",
    portalSub: "ಅಗತ್ಯ ಸರ್ಕಾರಿ ವೆಬ್‌ಸೈಟ್‌ಗಳಿಗೆ ನೇರ ಪ್ರವೇಶ.",
    eligibilityTitle: "ಅರ್ಹತಾ ಪರಿಶೀಲಕ",
    eligibilitySub: "ವಿವಿಧ ಸಮಾಜ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳಿಗೆ ನೀವು ಅರ್ಹರಾಗಿದ್ದೀರಾ ಎಂದು ಪರಿಶೀಲಿಸಿ.",
    centersTitle: "ಹತ್ತಿರದ ಕೇಂದ್ರಗಳು",
    centersSub: "ನಿಮ್ಮ ಹತ್ತಿರವಿರುವ ಅಧಿಕೃತ ಸೇವಾ ಮತ್ತು ಕುಂದುಕೊರತೆ ಕೇಂದ್ರಗಳನ್ನು ಹುಡುಕಿ.",
    newsTitle: "ಆಡಳಿತ ಸುದ್ದಿ",
    newsSub: "ಇತ್ತೀಚಿನ ನೀತಿ ಬದಲಾವಣೆಗಳು ಮತ್ತು ಘೋಷಣೆಗಳೊಂದಿಗೆ ನವೀಕೃತವಾಗಿರಿ.",
    calendarTitle: "ಪ್ರಮುಖ ದಿನಾಂಕಗಳು",
    calendarSub: "ನವೀಕರಣಗಳು, ಅರ್ಜಿಗಳು ಮತ್ತು ಪಾವತಿಗಳ ಕೊನೆಯ ದಿನಾಂಕಗಳು."
  }
};

function App() {
  const [language, setLanguage] = useState('en');
  const { loading } = useAuth();
  const t = translations[language];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 bg-emerald-500/10 blur-xl"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#020617]">
      <Sidebar t={t} />
      
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Navbar language={language} setLanguage={setLanguage} t={t} />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-24">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Hero language={language} t={t} />} />
              <Route path="/chat" element={<ChatPage language={language} t={t} />} />
              <Route path="/document" element={<DocumentPage language={language} t={t} />} />
              <Route path="/portals" element={<PortalPage t={t} />} />
              <Route path="/eligibility" element={<EligibilityPage t={t} />} />
              <Route path="/centers" element={<CentersPage t={t} />} />
              <Route path="/news" element={<NewsPage t={t} />} />
              <Route path="/calendar" element={<CalendarPage t={t} />} />
              <Route path="/login" element={<Login t={t} />} />
              <Route path="/register" element={<Register t={t} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <footer className="py-12 border-t border-white/5 bg-black/50 backdrop-blur-md mt-auto">
          <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
            <p>© 2026 CivicLens AI. Empowering Citizens through Technology.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
