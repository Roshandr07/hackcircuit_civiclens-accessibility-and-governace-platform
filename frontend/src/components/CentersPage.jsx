import React from 'react';
import { Search, MapPin, ChevronRight } from 'lucide-react';
import FeatureLayout from './FeatureLayout';

const CentersPage = ({ t }) => {
  const centers = [
    { name: "Bangalore One - Indiranagar", distance: "0.8 km", status: "Open" },
    { name: "Seva Sindhu Center - Domlur", distance: "1.2 km", status: "Open" },
    { name: "Aadhaar Enrollment Center", distance: "2.5 km", status: "Closed" },
    { name: "Taluk Office - North", distance: "4.0 km", status: "Open" }
  ];

  return (
    <FeatureLayout title={t.centersTitle} sub={t.centersSub}>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by pincode or area..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 outline-none focus:border-emerald-500/50 text-white" 
            />
          </div>
          <button className="p-4 glass rounded-2xl text-emerald-400 hover:bg-emerald-500/10 transition-all">
            <MapPin size={24} />
          </button>
        </div>
        <div className="space-y-3">
          {centers.map((c, i) => (
            <div 
              key={i} 
              onClick={() => alert(`Center Details: ${c.name}\nAddress: 123 Main Road, ${c.name.split(' - ')[1] || 'Bangalore'}, Karnataka\n\nClick OK to simulate opening Google Maps directions.`)}
              className="glass p-4 rounded-2xl flex items-center justify-between hover:bg-emerald-500/5 hover:border-emerald-500/30 cursor-pointer transition-all group scale-100 active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-all">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{c.name}</p>
                  <p className="text-xs text-slate-500">{c.distance} away</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${c.status === 'Open' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                  {c.status}
                </span>
                <ChevronRight size={14} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </FeatureLayout>
  );
};

export default CentersPage;
