import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, ChevronRight, Volume2, Sparkles, ArrowLeft, ExternalLink } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const ChatPage = ({ language, t }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const navigate = useNavigate();

  const readAloud = (text) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'en' ? 'en-US' : (language === 'hi' ? 'hi-IN' : 'kn-IN');
    utterance.pitch = 1.1;
    utterance.rate = 1.0;
    synth.speak(utterance);
  };

  const handleSend = async (text) => {
    if (!text || text.trim() === '') return;
    
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInterimTranscript('');
    setInputText('');
    setIsLoading(true);

    try {
      const resp = await axios.post(`${API_URL}/chat`, { 
        message: text, 
        language 
      });
      
      const aiMsg = { 
        role: 'ai', 
        content: resp.data.answer,
        steps: resp.data.steps 
      };
      setMessages(prev => [...prev, aiMsg]);
      readAloud(resp.data.answer);

    } catch (err) {
      console.error(err);
      const detail = err.response?.data?.detail || err.message || "Unknown error";
      setMessages(prev => [...prev, { role: 'ai', content: `Error: ${detail}. Please check backend logs or try again shortly.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser doesn't support Speech Recognition");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'en' ? 'en-US' : (language === 'hi' ? 'hi-IN' : 'kn-IN');
    recognition.continuous = false;
    recognition.interimResults = true;
    
    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => {
      setIsRecording(false);
      setInterimTranscript('');
    };
    recognition.onerror = (event) => {
      console.error(event.error);
      setIsRecording(false);
      setInterimTranscript('');
    };
    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          handleSend(event.results[i][0].transcript);
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      setInterimTranscript(interim);
    };
    recognition.start();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto pt-32 px-6"
    >
      <div className="flex flex-col h-[70vh] glass rounded-3xl overflow-hidden border-emerald-500/10 shadow-2xl">
        <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
          {messages.length === 0 && !interimTranscript && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-6 text-center">
              <div className="relative">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center border transition-all duration-500 ${isRecording ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)]' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
                  {isRecording ? (
                    <div className="voice-wave">
                      <div className="wave-bar"></div>
                      <div className="wave-bar"></div>
                      <div className="wave-bar"></div>
                      <div className="wave-bar"></div>
                      <div className="wave-bar"></div>
                    </div>
                  ) : (
                    <Mic size={40} className="text-emerald-400" />
                  )}
                </div>
                {isRecording && (
                   <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20"></div>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">{isRecording ? (language === 'kn' ? 'ಆಲಿಸಲಾಗುತ್ತಿದೆ...' : (language === 'hi' ? 'सुन रहा हूँ...' : 'Listening...')) : t.voiceAssistant}</h3>
                <p className="max-w-md">{t.voiceSub}</p>
              </div>
              <div className="flex flex-col items-center gap-3 w-full max-w-lg mx-auto">
                {[t.suggest1, t.suggest2, t.suggest3, t.suggest4, t.suggest5, t.suggest6].map(suggestion => (
                  <button 
                    key={suggestion}
                    onClick={() => handleSend(suggestion)} 
                    className="w-full px-8 py-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all text-sm md:text-base font-bold text-slate-200 shadow-lg hover:scale-[1.02] active:scale-95"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {interimTranscript && (
            <div className="flex justify-center">
              <div className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-4 rounded-2xl text-emerald-400 italic text-lg animate-pulse">
                "{interimTranscript}"
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              key={i} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-5 rounded-2xl shadow-lg relative group ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-slate-800/80 border border-white/5 rounded-tl-none'
              }`}>
                <div className="flex justify-between items-start gap-4">
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  {msg.role === 'ai' && (
                    <button 
                      onClick={() => readAloud(msg.content)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-slate-400 hover:text-white"
                      title="Read Aloud"
                    >
                      <Volume2 size={16} />
                    </button>
                  )}
                </div>
                {msg.steps && msg.steps.length > 0 && (
                  <div className="mt-8 space-y-6">
                    {msg.steps.map((step, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx} 
                        className="flex gap-6 group/step"
                      >
                        <div className="flex flex-col items-center">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-sm font-black text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] z-10 group-hover/step:scale-110 transition-transform duration-300">
                            {step.step_number}
                          </div>
                          {idx !== msg.steps.length - 1 && (
                            <div className="w-0.5 h-full bg-gradient-to-b from-emerald-500/40 to-transparent my-2 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div 
                            onClick={() => {
                              const tLower = step.title.toLowerCase();
                              if (tLower.includes('center') || tLower.includes('ಕೇಂದ್ರ') || tLower.includes('केंद्र')) {
                                navigate('/centers');
                              } else if (tLower.includes('document') || tLower.includes('ದಾಖಲೆ') || tLower.includes('दस्ताವೆಜ')) {
                                navigate('/document');
                              } else if (tLower.includes('portal') || tLower.includes('ಪೋರ್ಟಲ್') || tLower.includes('पोर्टल') || tLower.includes('form') || tLower.includes('ಫಾರ್ಮ್')) {
                                navigate('/portals');
                              } else {
                                alert(`AI Deep Dive Tip: For "${step.title}", ensure you have your original ID proofs ready and check for office timings on official portals.`);
                              }
                            }}
                            className="glass p-5 rounded-2xl border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300 shadow-xl relative overflow-hidden cursor-pointer group/card"
                          >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full translate-x-12 -translate-y-12"></div>
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-black text-sm text-emerald-400 tracking-wide uppercase">{step.title}</h5>
                              <span className="text-[10px] text-emerald-500/50 font-bold opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center gap-1">
                                Open <ExternalLink size={10} />
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">{step.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="text-slate-500 italic flex items-center gap-3 bg-white/5 w-fit px-4 py-2 rounded-full border border-white/5">
              <Sparkles className="animate-spin text-emerald-400" size={16} /> 
              {t.thinking}
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-white/5 bg-black/40 backdrop-blur-xl flex gap-4 items-center">
          <button 
            onClick={startListening}
            className={`p-4 rounded-full transition-all flex-shrink-0 shadow-lg ${
              isRecording 
                ? 'bg-red-500 pulse ring-4 ring-red-500/20' 
                : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20'
            }`}
          >
            <Mic size={24} />
          </button>
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder={t.chatPlaceholder}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-white placeholder-slate-500"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend(inputText)}
            />
            <button 
              onClick={() => handleSend(inputText)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-emerald-500 rounded-xl hover:bg-emerald-400 transition-all text-white shadow-lg shadow-emerald-500/20"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatPage;
