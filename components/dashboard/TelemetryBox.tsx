
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
  small?: boolean;
}

const TelemetryBox: React.FC<Props> = ({ label, value, unit, color = 'text-black', small }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex-1 bg-white/80 backdrop-blur-lg rounded-3xl border border-white/40 shadow-xl ${small ? 'p-4' : 'p-6'}`}
    >
      <p className="text-[9px] font-black uppercase tracking-widest text-black/30 mb-1">{label}</p>
      <div className="flex items-baseline space-x-2">
        <h4 className={`${small ? 'text-3xl' : 'text-5xl'} font-black italic tracking-tighter ${color}`}>
          {value}
        </h4>
        {unit && <span className="text-xs font-bold text-black/40 uppercase">{unit}</span>}
      </div>
    </motion.div>
  );
};

export default TelemetryBox;
