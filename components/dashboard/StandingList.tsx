
import React from 'react';
import { motion } from 'framer-motion';

const participants = [
  { pos: 1, name: 'CYBER-PULSE', team: 'WEB3 TRACK', score: 98, color: 'bg-blue-600' },
  { pos: 2, name: 'NEURAL-SHIFT', team: 'AI TRACK', score: 92, color: 'bg-orange-500' },
  { pos: 3, name: 'DATA-DRIFT', team: 'DATA TRACK', score: 88, color: 'bg-red-600', active: true },
  { pos: 4, name: 'GRID-LOCK', team: 'BLOCKCHAIN', score: 84, color: 'bg-emerald-500' },
  { pos: 5, name: 'VELO-DEV', team: 'FINTECH', score: 79, color: 'bg-red-600' },
  { pos: 6, name: 'HACK-TRON', team: 'ROBOTICS', score: 72, color: 'bg-teal-500' },
  { pos: 7, name: 'VERTEX', team: 'UI/UX TRACK', score: 65, color: 'bg-purple-600' },
  { pos: 8, name: 'BYTE-RACE', team: 'IOT TRACK', score: 58, color: 'bg-blue-900' },
  { pos: 9, name: 'Z-CODE', team: 'CLOUDNATIVE', score: 42, color: 'bg-green-700' },
];

const StandingList: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/90 backdrop-blur-2xl rounded-[40px] p-8 border border-white/40 shadow-2xl overflow-hidden h-full max-h-[600px] flex flex-col"
    >
      <div className="flex items-center justify-between mb-8 border-b border-black/5 pb-5">
        <div>
          <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-black">Live Leaderboard</h3>
          <p className="text-[9px] font-bold text-black/30 uppercase mt-1">Real-time team standings</p>
        </div>
        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {participants.map((s, idx) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`flex items-center p-4 rounded-3xl transition-all cursor-pointer group ${
              s.active ? 'bg-red-600 text-white shadow-xl shadow-red-600/20' : 'hover:bg-black/5'
            }`}
          >
            <span className={`text-[10px] font-black w-8 ${s.active ? 'text-white' : 'text-black/30'}`}>
              {s.pos.toString().padStart(2, '0')}
            </span>
            <div className={`w-1 h-10 rounded-full mr-5 ${s.active ? 'bg-white/20' : 'bg-black/5'} relative overflow-hidden`}>
               <div className={`absolute top-0 left-0 w-full h-1/2 ${s.active ? 'bg-white' : s.color}`} />
            </div>
            <div className="flex-1">
              <h4 className={`text-[11px] font-black tracking-widest ${s.active ? 'text-white' : 'text-black'}`}>
                {s.name}
              </h4>
              <p className={`text-[9px] font-bold uppercase tracking-widest mt-1 ${s.active ? 'text-white/60' : 'text-black/30'}`}>
                {s.team}
              </p>
            </div>
            <div className={`text-sm font-black italic ${s.active ? 'text-white' : 'text-black/80'}`}>
              {s.score}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StandingList;
