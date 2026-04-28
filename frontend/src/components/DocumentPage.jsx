import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Sparkles, Info } from 'lucide-react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const DocumentPage = ({ language, t }) => {
  const [file, setFile] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [docType, setDocType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
    handleUpload(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: {'image/*': ['.jpeg', '.jpg', '.png']} 
  });

  const handleUpload = async (file) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);

    try {
      const resp = await axios.post(`${API_URL}/analyze-document`, formData);
      setExplanation(resp.data.answer); // fixed mismatch: answer vs explanation
      setDocType(resp.data.document_type || 'Government ID');
    } catch (err) {
      console.error(err);
      setExplanation("Error analyzing document. Please ensure the backend server is running and your API key is configured.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-6xl mx-auto pt-32 px-6 pb-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold">{t.docTitle}</h2>
            <p className="text-slate-400">{t.docSub}</p>
          </div>
          
          <div {...getRootProps()} className={`lg:h-[400px] glass p-10 border-dashed border-2 flex flex-col items-center justify-center gap-6 cursor-pointer transition-all rounded-3xl ${
            isDragActive ? 'border-emerald-500 bg-emerald-500/5' : 'border-white/10 hover:border-emerald-500/30'
          }`}>
            <input {...getInputProps()} />
            {preview ? (
              <img src={preview} alt="Document Preview" className="h-full w-full object-contain rounded-xl" />
            ) : (
              <>
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                  <Upload className="text-emerald-400" size={32} />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold mb-1">{t.dropzone}</p>
                  <p className="text-slate-500 text-sm">{t.dropzoneSub}</p>
                </div>
                <button className="px-8 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-400 transition-all">{t.selectFile}</button>
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="glass h-full p-8 rounded-3xl border-emerald-500/10 flex flex-col min-h-[500px] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full"></div>
            <h3 className="text-xl font-bold mb-6 flex items-center justify-between gap-3 relative z-10 w-full">
              <span className="flex items-center gap-3">
                <Sparkles size={20} className="text-emerald-400" /> {t.aiInsights}
              </span>
              {docType && (
                <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] uppercase font-bold rounded-full shadow-lg shadow-emerald-500/20 animate-in fade-in zoom-in duration-500">
                  {docType}
                </span>
              )}
            </h3>
            
            <div className="flex-1 text-slate-300 whitespace-pre-wrap leading-relaxed relative z-10">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 text-slate-500">
                  <div className="relative">
                    <Sparkles className="animate-spin text-emerald-400" size={48} />
                    <div className="absolute inset-0 bg-emerald-400/20 blur-xl animate-pulse"></div>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-lg font-medium text-white">{t.analyzingDoc}</p>
                    <p className="text-sm">{t.visionAi}</p>
                  </div>
                </div>
              ) : explanation ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 p-6 rounded-2xl border border-white/5">
                  {explanation}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4 opacity-50">
                  <Info size={40} />
                  <p>{t.uploadPrompt}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentPage;
