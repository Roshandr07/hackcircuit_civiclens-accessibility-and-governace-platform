import { motion } from 'framer-motion';
import { Mic, ArrowRight, Upload, Sparkles, Shield } from 'lucide-react';
import SplineScene from './SplineScene';
import { useNavigate } from 'react-router-dom';

const Hero = ({ t, language }) => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center">
      <SplineScene />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              {language === 'kn' ? 'ಆಡಳಿತವನ್ನು AI ನೊಂದಿಗೆ ಸಂಯೋಜಿಸುವುದು' : (language === 'hi' ? 'एआई के साथ शासन को जोड़ना' : 'Bridging Governance with AI')}
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              {t.heroTitle.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{t.heroTitle.split(' ').slice(-1)}</span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
              {t.heroSub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/chat')}
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 group shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
              >
                <Mic size={24} /> {language === 'kn' ? 'ಧ್ವನಿ ಸಹಾಯಕವನ್ನು ಪ್ರಯತ್ನಿಸಿ' : (language === 'hi' ? 'वॉयस असिस्टेंट आज़माएं' : 'Try Voice Assistant')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate('/document')}
                className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
              >
                <Upload size={20} /> {language === 'kn' ? 'ದಾಖಲೆ ವಿಶ್ಲೇಷಿಸಿ' : (language === 'hi' ? 'दस्तावेज़ विश्लेषण' : 'Analyze Document')}
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8 opacity-70">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">3+</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Languages</span>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">Gemini</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">AI Powered</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-6 rounded-2xl flex flex-col gap-4 hover:border-emerald-500/50 transition-colors">
                <div className="bg-emerald-500/20 p-3 rounded-xl w-fit">
                  <Sparkles className="text-emerald-400 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">{language === 'kn' ? 'ಸುಲಭ ಹಂತಗಳು' : (language === 'hi' ? 'आसान चरण' : 'Easy Steps')}</h3>
                <p className="text-slate-400 text-sm">{language === 'kn' ? 'ಸಂಕೀರ್ಣ ಶಬ್ದಕೋಶವನ್ನು ಸರಳ ಕಾರ್ಯಗಳಾಗಿ ಬದಲಾಯಿಸಲಾಗಿದೆ.' : (language === 'hi' ? 'जटिल शब्दावली को सरल कार्यों में बदल दिया गया है।' : 'Complex jargon converted into simple daily-life tasks.')}</p>
              </div>
              <div className="glass p-6 rounded-2xl flex flex-col gap-4 hover:border-emerald-500/50 transition-colors translate-y-8">
                <div className="bg-blue-500/20 p-3 rounded-xl w-fit">
                  <Shield className="text-blue-400 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">{language === 'kn' ? 'ಸುರಕ್ಷಿತ ಮತ್ತು ಖಾಸಗಿ' : (language === 'hi' ? 'सुरक्षित और निजी' : 'Safe & Private')}</h3>
                <p className="text-slate-400 text-sm">{language === 'kn' ? 'ನಿಮ್ಮ ದಾಖಲೆಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತದೆ.' : (language === 'hi' ? 'आपके दस्तावेज़ सुरक्षित रूप से संसाधित किए जाते हैं।' : 'Your documents are processed securely.')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
