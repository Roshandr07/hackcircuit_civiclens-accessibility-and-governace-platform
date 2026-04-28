import React from 'react';
import { motion } from 'framer-motion';

const FeatureLayout = ({ title, sub, children }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -20 }}
    className="max-w-6xl mx-auto pt-32 px-6 pb-20"
  >
    <div className="mb-12 text-center space-y-2">
      <h2 className="text-4xl font-bold">{title}</h2>
      <p className="text-slate-400">{sub}</p>
    </div>
    {children}
  </motion.div>
);

export default FeatureLayout;
