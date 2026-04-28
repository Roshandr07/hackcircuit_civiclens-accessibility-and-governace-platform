import React from 'react';
import { ChevronRight } from 'lucide-react';
import FeatureLayout from './FeatureLayout';

const NewsPage = ({ t }) => {
  const news = [
    { title: "Aadhaar-Pan Linking Deadline Extended", date: "2 Hours Ago", category: "Alert" },
    { title: "New Digital Health ID Reaches 50 Crore Marks", date: "5 Hours Ago", category: "Notice" },
    { title: "Tax Exemption Changes for Financial Year 2026", date: "1 Day Ago", category: "Finance" },
    { title: "PM Kisan 17th Installment to be Released Soon", date: "2 Days Ago", category: "Agriculture" }
  ];

  return (
    <FeatureLayout title={t.newsTitle} sub={t.newsSub}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item, i) => (
          <div key={i} className="glass p-6 rounded-3xl space-y-4 hover:border-emerald-500/20 transition-all">
            <div className="flex justify-between items-center">
              <span className="px-2 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.category}</span>
              <span className="text-[10px] text-slate-500">{item.date}</span>
            </div>
            <h5 className="font-bold text-lg text-white leading-tight">{item.title}</h5>
            <button 
              onClick={() => alert(`Opening details for: ${item.title}`)}
              className="text-xs text-emerald-400 font-bold flex items-center gap-1 hover:gap-2 transition-all"
            >
              Read More <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </FeatureLayout>
  );
};

export default NewsPage;
