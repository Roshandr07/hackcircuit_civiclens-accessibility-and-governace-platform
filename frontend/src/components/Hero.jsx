import { motion } from 'framer-motion';
import { Mic, ArrowRight, Upload, Sparkles, Shield, MessageSquare, FileText } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import { useNavigate } from 'react-router-dom';

const Hero = ({ t, language }) => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-12">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] text-xs font-black uppercase tracking-widest mb-10">
              <span className="flex h-2 w-2 rounded-full bg-[#38bdf8] animate-pulse"></span>
              {language === 'kn' ? 'ಆಡಳಿತವನ್ನು AI ನೊಂದಿಗೆ ಸಂಯೋಜಿಸುವುದು' : (language === 'hi' ? 'एआई के साथ शासन को जोड़ना' : 'Bridging Governance with AI')}
            </div>
            
            <h1 className="text-5xl lg:text-8xl font-black leading-[1.1] mb-8 text-white tracking-tighter">
              {t.heroTitle.split('AI')[0]}<span className="text-[#38bdf8] drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]">AI</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              {t.heroSub}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => navigate('/chat')}
                className="w-full sm:w-auto px-10 py-5 bg-[#38bdf8] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] text-black rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 group active:scale-95"
              >
                <Mic size={24} /> {language === 'kn' ? 'ಧ್ವನಿ ಸಹಾಯಕ' : (language === 'hi' ? 'वॉयस असिस्टेंट' : 'Try Voice Assistant')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate('/document')}
                className="w-full sm:w-auto px-10 py-5 border-2 border-white/10 hover:border-white/40 hover:bg-white/5 text-white rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <Upload size={22} /> {language === 'kn' ? 'ದಾಖಲೆ ವಿಶ್ಲೇಷಿಸಿ' : (language === 'hi' ? 'दस्तावेज़ विश्लेषण' : 'Analyze Document')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="glass group p-8 rounded-3xl hover:border-[#38bdf8]/50 transition-all hover:translate-y-[-10px] bg-white/5 border border-white/10 text-center">
              <div className="w-16 h-16 bg-[#38bdf8]/10 rounded-2xl flex items-center justify-center text-[#38bdf8] mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Mic size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{language === 'kn' ? 'ಧ್ವನಿ ಪ್ರವೇಶ' : (language === 'hi' ? 'वॉयस एक्सेस' : 'Voice Access')}</h3>
              <p className="text-slate-400 leading-relaxed">
                {language === 'kn' ? 'ನಿಮ್ಮ ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ ಕೇಳಿ' : (language === 'hi' ? 'अपनी स्थानीय भाषा में पूछें' : 'Ask questions and access services in your local language naturally.')}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass group p-8 rounded-3xl hover:border-[#a78bfa]/50 transition-all hover:translate-y-[-10px] bg-white/5 border border-white/10 text-center">
              <div className="w-16 h-16 bg-[#a78bfa]/10 rounded-2xl flex items-center justify-center text-[#a78bfa] mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Sparkles size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{language === 'kn' ? 'AI ಮಾರ್ಗದರ್ಶನ' : (language === 'hi' ? 'एआई मार्गदर्शन' : 'AI Guidance')}</h3>
              <p className="text-slate-400 leading-relaxed">
                {language === 'kn' ? 'ಸರಳ ಹಂತ-ಹಂತದ ಸಹಾಯ' : (language === 'hi' ? 'सरल चरण-दर-चरण सहायता' : 'Get complex government procedures simplified into easy step-by-step actions.')}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass group p-8 rounded-3xl hover:border-emerald-500/50 transition-all hover:translate-y-[-10px] bg-white/5 border border-white/10 text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FileText size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{language === 'kn' ? 'ದಾಖಲೆ ಸಹಾಯ' : (language === 'hi' ? 'दस्तावेज़ सहायता' : 'Document Help')}</h3>
              <p className="text-slate-400 leading-relaxed">
                {language === 'kn' ? 'ನಿಮ್ಮ ಫೈಲ್‌ಗಳನ್ನು ತಕ್ಷಣವೇ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ' : (language === 'hi' ? 'अपनी फाइलों को तुरंत समझें' : 'Upload any document to receive an instant, clear explanation of its contents.')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
