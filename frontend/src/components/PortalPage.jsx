import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronRight } from 'lucide-react';
import FeatureLayout from './FeatureLayout';

const PortalPage = ({ t }) => {
  const portals = [
    { name: "UIDAI (Aadhaar)", url: "https://uidai.gov.in/", desc: "Aadhaar services, updates, and downloads." },
    { name: "Seva Sindhu", url: "https://sevasindhu.karnataka.gov.in/", desc: "Karnataka's one-stop for citizen services." },
    { name: "National Portal", url: "https://www.india.gov.in/", desc: "Access to information and services provided by the Govt." },
    { name: "Scholarship Portal", url: "https://scholarships.gov.in/", desc: "National Scholarship Portal (NSP) central hub." },
    { name: "Voter Service", url: "https://www.nvsp.in/", desc: "Registration, corrections, and search for electoral roll." },
    { name: "DigiLocker", url: "https://www.digilocker.gov.in/", desc: "Safe storage and verification of documents." }
  ];

  return (
    <FeatureLayout title={t.portalTitle} sub={t.portalSub}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portals.map((p, i) => (
          <motion.a 
            key={i} href={p.url} target="_blank" rel="noreferrer"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-2xl hover:border-emerald-500/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <ExternalLink size={24} />
              </div>
              <ChevronRight className="text-slate-600 group-hover:text-emerald-400" size={20} />
            </div>
            <h4 className="font-bold text-white mb-2">{p.name}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
          </motion.a>
        ))}
      </div>
    </FeatureLayout>
  );
};

export default PortalPage;
