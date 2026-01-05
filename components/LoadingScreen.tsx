
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const [lights, setLights] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLights(prev => (prev < 5 ? prev + 1 : prev));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 f1-grid opacity-20" />
      
      <div className="flex space-x-4 mb-20 relative z-10">
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="flex flex-col items-center space-y-2">
            <div className={`w-12 h-12 rounded-full border-4 border-zinc-200 flex items-center justify-center ${lights >= num ? 'bg-red-600 shadow-[0_0_30px_rgba(239,68,68,0.8)]' : 'bg-transparent'}`}>
              <div className={`w-4 h-4 rounded-full ${lights >= num ? 'bg-white/40' : 'bg-transparent'}`} />
            </div>
          </div>
        ))}
      </div>

      <motion.div 
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-black italic text-black tracking-tighter uppercase mb-4">
          Lights Out and Away We <span className="text-red-600">Go!</span>
        </h1>
        
        <div className="max-w-md mx-auto w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden mt-8">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-red-600"
          />
        </div>
      </motion.div>
      {lights === 5 && (
        <motion.div 
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: [0, 1, 0], x: '100%' }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.2 }}
          className="absolute top-1/2 left-0 w-full h-24 bg-gradient-to-r from-transparent via-red-600/40 to-transparent blur-3xl -translate-y-1/2"
        />
      )}

      <div className="absolute bottom-10 flex flex-col items-center">
        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.8em] animate-pulse">Initializing Telemetry</span>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
