
import React from 'react';
import { motion } from 'framer-motion';
import { Flag, CheckCircle, RefreshCw, Share2 } from 'lucide-react';

interface SuccessScreenProps {
  teamName: string;
  onReset: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ teamName, onReset }) => {
  return (
    <div className="text-center bg-neutral-950/60 p-12 rounded-3xl border-2 border-red-600 backdrop-blur-xl relative overflow-hidden">
      {/* Background Animated Stripes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(45deg,#E10600,#E10600_10px,#000_10px,#000_20px)]" />
      </div>

      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(225,6,0,0.6)]"
      >
        <CheckCircle size={48} className="text-white" />
      </motion.div>

      <h2 className="text-4xl md:text-5xl font-f1 italic uppercase tracking-tighter mb-4">
        Pole Position <span className="text-red-600">Secured!</span>
      </h2>
      
      <p className="text-neutral-400 font-mono text-lg mb-2">Team <span className="text-white font-bold">{teamName.toUpperCase()}</span> has been entered into the grid.</p>
      <p className="text-neutral-500 text-sm max-w-md mx-auto mb-10 italic">Your entry is under review by the stewards. Keep your tires warm and your sensors calibrated. See you at lights out!</p>

      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="flex items-center gap-2 px-8 py-3 bg-neutral-900 border border-neutral-700 rounded-full font-mono text-sm hover:border-red-600 transition-all uppercase tracking-widest"
        >
          <RefreshCw size={16} /> New Entry
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#E10600' }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-8 py-3 bg-red-700 text-white rounded-full font-mono text-sm shadow-lg shadow-red-900/20 transition-all uppercase tracking-widest"
        >
          <Share2 size={16} /> Share Paddock Access
        </motion.button>
      </div>

      <div className="mt-12 flex justify-center items-center gap-8 border-t border-neutral-800 pt-8 opacity-50">
        <div className="text-center">
          <p className="text-xs font-mono text-neutral-500 uppercase">Status</p>
          <p className="text-red-500 font-f1 italic">CONFIRMED</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-mono text-neutral-500 uppercase">Sector 1</p>
          <p className="text-white font-f1 italic">PURPLE</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-mono text-neutral-500 uppercase">Fuel</p>
          <p className="text-white font-f1 italic">100%</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
