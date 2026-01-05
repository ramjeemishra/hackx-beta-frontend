
import React from 'react';
import { motion } from 'framer-motion';

console.log("Rendering Tracks Component");
const tracks = [
  { id: '01', title: 'Virtual Medical Examiner Assistant', track: 'VMEA' },
  { id: '02', title: 'Multi-Lingual Medical Screening Bot', track: 'MedLingual' },
  { id: '03', title: 'Find Your Fit AI', track: 'FitAI' },
  { id: '04', title: 'Comedy Event Marketplace Platform', track: 'ComedyHub' },
  { id: '05', title: 'Real-time Medical Risk Analyzer', track: 'RiskMed' },
  { id: '06', title: 'Smart Cafe: Gamified Ordering', track: 'SmartCafe' },
  { id: '07', title: 'API-Driven Event Invitation System', track: 'EventAPI' },
];

const Tracks: React.FC = () => {
  return (
    <section id="tracks" className="bg-zinc-50 f1-grid py-20 md:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <motion.h4 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-red-600 font-black uppercase tracking-widest text-sm mb-2"
          >
            Problem Tracks
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black italic tracking-tight text-black uppercase"
          >
            CHOOSE YOUR LANE
          </motion.h2>
          <p className="text-zinc-400 mt-4 uppercase tracking-[0.2em] text-xs">Seven challenging tracks await your innovation</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tracks.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.05, y: -12 }}
              className="p-10 glass-card rounded-[48px] group relative overflow-hidden flex flex-col justify-between h-80 bg-white shadow-xl hover:shadow-red-600/10 border border-white transition-all"
            >
              <div className="absolute top-0 right-0 p-8 text-7xl font-black text-zinc-50 group-hover:text-red-600/5 transition-colors italic pointer-events-none">
                {track.id}
              </div>
              <div className="relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50 px-4 py-1.5 rounded-full">Track: {track.track}</span>
                <h3 className="text-xl md:text-2xl font-black mt-8 leading-tight text-black tracking-tighter">{track.title}</h3>
              </div>
              <button className="relative z-10 mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 group-hover:text-red-600 transition-colors flex items-center gap-3">
                VIEW SPECS <span className="text-xl">→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tracks;
