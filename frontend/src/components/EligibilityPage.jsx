import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, ChevronRight } from 'lucide-react';
import axios from 'axios';
import FeatureLayout from './FeatureLayout';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const EligibilityPage = ({ t }) => {
  const [formData, setFormData] = useState({
    income: '',
    occupation: 'Unemployed',
    category: 'General',
    has_house: false,
    is_pregnant: false
  });
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    if (!formData.income) {
      alert("Please enter your annual income");
      return;
    }
    setIsLoading(true);
    try {
      const resp = await axios.post(`${API_URL}/check-eligibility`, {
        ...formData,
        income: parseInt(formData.income),
        language: 'en'
      });
      setResults(resp.data.results);
    } catch (err) {
      console.error(err);
      alert("Error checking eligibility. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FeatureLayout title={t.eligibilityTitle} sub={t.eligibilitySub}>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="glass p-8 rounded-3xl border-emerald-500/20 bg-emerald-500/5 shadow-xl">
          <h4 className="text-2xl font-bold text-white mb-6 items-center flex gap-3">
            <Sparkles className="text-emerald-400" size={24} /> AI Eligibility Form
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Annual Income (₹)</label>
              <input 
                type="number" 
                placeholder="e.g. 50000"
                className="w-full bg-black/30 border border-white/10 rounded-2xl px-6 py-5 text-xl text-white outline-none focus:border-emerald-500/50 transition-all font-medium"
                value={formData.income}
                onChange={(e) => setFormData({...formData, income: e.target.value})}
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Occupation</label>
              <select 
                className="w-full bg-black/30 border border-white/10 rounded-2xl px-6 py-5 text-xl text-slate-300 outline-none focus:border-emerald-500/50 transition-all font-medium"
                value={formData.occupation}
                onChange={(e) => setFormData({...formData, occupation: e.target.value})}
              >
                <option value="Farmer">Farmer</option>
                <option value="Daily Wage Laborer">Daily Wage Laborer</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Salaried">Salaried</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Category</label>
              <select 
                className="w-full bg-black/30 border border-white/10 rounded-2xl px-6 py-5 text-xl text-slate-300 outline-none focus:border-emerald-500/50 transition-all font-medium"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>

            <div className="flex gap-8 items-center h-full pt-6">
              <label className="flex items-center gap-4 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-6 h-6 accent-emerald-500 rounded-lg"
                  checked={formData.has_house}
                  onChange={(e) => setFormData({...formData, has_house: e.target.checked})}
                />
                <span className="text-base text-slate-300 group-hover:text-white transition-colors">Has Pucca House</span>
              </label>
              
              <label className="flex items-center gap-4 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-6 h-6 accent-emerald-500 rounded-lg"
                  checked={formData.is_pregnant}
                  onChange={(e) => setFormData({...formData, is_pregnant: e.target.checked})}
                />
                <span className="text-base text-slate-300 group-hover:text-white transition-colors">Is Pregnant</span>
              </label>
            </div>
          </div>

          <button 
            onClick={handleCheck}
            disabled={isLoading}
            className="w-full mt-8 py-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 active:scale-[0.98] transition-all rounded-2xl text-white font-black text-lg shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3"
          >
            {isLoading ? <Sparkles className="animate-spin" /> : <ChevronRight size={20} />}
            {isLoading ? "Analyzing Eligibility..." : "Check My Eligibility"}
          </button>
        </div>

        {results && (
          <div className="space-y-6">
            <h5 className="text-2xl font-bold text-white flex items-center gap-3">
              <Shield className="text-emerald-400" size={24} /> Assessment Results
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((res, i) => (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: i * 0.1 }}
                   key={i} 
                   className={`glass p-6 rounded-3xl border-l-4 transition-all hover:scale-[1.02] ${
                     res.is_eligible ? 'border-l-emerald-500 bg-emerald-500/5' : 'border-l-red-500 bg-red-500/5'
                   }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h6 className="font-bold text-white">{res.name}</h6>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-lg ${
                      res.is_eligible ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-red-500 text-white shadow-red-500/20'
                    }`}>
                      {res.is_eligible ? "Eligible ✅" : "Not Eligible ❌"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">{res.reason}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </FeatureLayout>
  );
};

export default EligibilityPage;
