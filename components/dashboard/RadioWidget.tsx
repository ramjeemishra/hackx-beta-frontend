
import React from 'react';
import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';

const RadioWidget: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-lg p-6 rounded-[40px] border border-white/40 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Radio size={14} className="text-red-600 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Official Feed</span>
        </div>
        <span className="text-[8px] font-black text-red-600 uppercase tracking-widest bg-red-600/10 px-3 py-1 rounded-full">LIVE BROADCST</span>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center border border-white/10 shadow-lg">
          <span className="text-red-600 font-black text-xs">HQ</span>
        </div>
        <div>
          <h5 className="text-[10px] font-black text-black uppercase tracking-widest">Hackathon HQ</h5>
          <p className="text-[11px] font-medium text-black/60 italic leading-tight">"Check-point 2 completed. All teams moving to Dev Phase."</p>
        </div>
      </div>

      <div className="h-10 flex items-end space-x-1 px-1">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              height: [4, Math.random() * 32 + 4, 4],
              backgroundColor: ['rgba(220,38,38,0.2)', 'rgba(220,38,38,0.6)', 'rgba(220,38,38,0.2)']
            }}
            transition={{ duration: 0.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
            className="flex-1 rounded-full"
          />
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center text-[9px] font-black text-black/20 uppercase tracking-[0.2em]">
        <div className="flex items-center space-x-2">
          <div className="w-1 h-1 bg-green-500 rounded-full" />
          <span>Stream Stable</span>
        </div>
        <span>Channel 4.0</span>
      </div>
    </motion.div>
  );
};

export default RadioWidget;
