
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Target, Cpu, Activity, Crosshair, BarChart3, Radio, Terminal, Box } from 'lucide-react';

const About: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [systemLog, setSystemLog] = useState<string[]>([]);

  useEffect(() => {
    const logs = [
      "0x4F_AERO_SYNC_OK", "0x22_CORE_TEMP_34.5C", "0x8D_DRS_ENABLED", 
      "0x11_GRID_LOCK_AUTH", "0x9A_POWER_OPTIMIZED", "0xBB_LATENCY_2ms"
    ];
    const interval = setInterval(() => {
      setSystemLog(prev => [logs[Math.floor(Math.random() * logs.length)], ...prev].slice(0, 5));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const hotspots = [
    { id: 'engine', x: '55%', y: '50%', label: 'CORE V10 POWER UNIT', detail: 'High-performance backend systems & logic.', icon: <Cpu size={14} /> },
    { id: 'aero', x: '35%', y: '25%', label: 'ACTIVE AERO', detail: 'Fluid and responsive frontend architecture.', icon: <Zap size={14} /> },
    { id: 'tyres', x: '75%', y: '80%', label: 'GRIP CHASSIS', detail: 'Robust system security and infrastructure.', icon: <Shield size={14} /> },
    { id: 'cockpit', x: '45%', y: '42%', label: 'STRATEGY HUB', detail: 'The center of project vision and leadership.', icon: <Target size={14} /> },
  ];

  return (
    <section id="about" className="bg-white scroll-mt-24 py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-[2px] bg-red-600" />
            <h4 className="text-red-600 font-black uppercase tracking-[0.3em] text-xs">Mission Control</h4>
          </div>
          <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-8 text-black uppercase leading-[0.85]">
            ENGINEER THE <br/><span className="text-red-600">FUTURE</span>
          </h2>
          <p className="text-lg text-zinc-500 font-medium leading-relaxed mb-10 max-w-lg">
            HackX 4.0 & DSC is where technical prowess meets creative strategy. We provide the circuit; you provide the velocity. Optimize your stack and push your limits.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-10 bg-zinc-50 rounded-[45px] border border-zinc-100 group hover:bg-zinc-100 transition-colors">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 group-hover:text-red-600 transition-colors">MAX VELOCITY</p>
              <h3 className="text-5xl font-black italic text-black">24H</h3>
              <p className="text-xs font-bold text-zinc-400 mt-2 uppercase">SPRINT TO FINISH</p>
            </div>
            <div className="p-10 bg-zinc-900 rounded-[45px] shadow-2xl shadow-red-600/20 group relative overflow-hidden">
              <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-10 transition-opacity" />
              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">GRID SIZE</p>
              <h3 className="text-5xl font-black italic text-white">200+</h3>
              <p className="text-xs font-bold text-white/50 mt-2 uppercase">TOP ENGINEERS</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square lg:aspect-[5/6] bg-zinc-950 rounded-[60px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] group border-4 border-zinc-900"
        >
          <div className="absolute inset-0 f1-grid opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 via-transparent to-blue-600/10" />
          
          <motion.div 
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-red-600/20 to-transparent pointer-events-none z-10"
          />

          <div className="absolute top-10 left-10 z-20 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_15px_rgba(239,68,68,1)]" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">CHASSIS_DIAGNOSTIC: LIVE</span>
            </div>
            <p className="text-[8px] font-mono text-zinc-600">SECTOR_ID: ANDHERI_MUMBAI_04</p>
          </div>

          <div className="absolute top-10 right-10 z-20 text-right">
             <div className="flex space-x-1 items-end mb-2 justify-end">
               {[...Array(5)].map((_, i) => (
                 <motion.div 
                  key={i} 
                  animate={{ height: [8, 16, 8] }} 
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1 bg-red-600/50 rounded-full" 
                 />
               ))}
             </div>
             <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">WAVEFORM_ANALYSIS</p>
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="relative w-full h-full">
              <svg viewBox="0 0 400 600" className="w-full h-full drop-shadow-[0_0_20px_rgba(239,68,68,0.2)]">

                <motion.path
                  d="M200 50 L140 100 L140 450 L100 520 L100 560 L300 560 L300 520 L260 450 L260 100 Z"
                  fill="none"
                  stroke="rgba(239, 68, 68, 0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                  animate={{ strokeDashoffset: [0, 50] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                <path d="M140 180 L260 180 M140 350 L260 350 M200 50 L200 560" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                {[
                  { cx: 100, cy: 150 }, { cx: 300, cy: 150 },
                  { cx: 80, cy: 480 }, { cx: 320, cy: 480 }
                ].map((pos, i) => (
                  <motion.circle 
                    key={i}
                    cx={pos.cx} cy={pos.cy} r="35"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1.5"
                    animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  />
                ))}
              </svg>

              <div className="absolute inset-0 pointer-events-none opacity-40">
                {[...Array(25)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: `${20 + Math.random() * 60}%`, y: '-10%', opacity: 0 }}
                    animate={{ y: '110%', opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: Math.random() * 3, ease: "linear" }}
                    className="absolute w-[1px] h-12 bg-red-600/30 blur-[1px]"
                  />
                ))}
              </div>

              {hotspots.map((spot) => (
                <div key={spot.id} className="absolute" style={{ left: spot.x, top: spot.y }}>
                  <motion.button
                    onMouseEnter={() => setActiveHotspot(spot.id)}
                    onMouseLeave={() => setActiveHotspot(null)}
                    whileHover={{ scale: 1.4, rotate: 15 }}
                    className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 backdrop-blur-md ${activeHotspot === spot.id ? 'bg-red-600 border-red-600 text-white shadow-[0_0_40px_rgba(239,68,68,0.9)]' : 'bg-black/60 border-white/20 text-white/50'}`}
                  >
                    {spot.icon}
                  </motion.button>
                  
                  <AnimatePresence>
                    {activeHotspot === spot.id && (
                      <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 10, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        className="absolute left-full ml-4 top-1/2 -translate-y-1/2 w-56 bg-white p-6 rounded-[32px] z-50 shadow-2xl border border-zinc-100"
                      >
                        <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-white rotate-45" />
                        <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">{spot.label}</p>
                        <p className="text-[11px] font-bold leading-tight text-zinc-800">{spot.detail}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-10 left-10 z-20">
             <div className="bg-black/40 backdrop-blur-md p-5 rounded-[24px] border border-white/5 w-52">
                <div className="flex items-center space-x-2 mb-3">
                   <Terminal size={12} className="text-red-600" />
                   <span className="text-[9px] font-black text-white uppercase tracking-widest">SYS_LOG_FEED</span>
                </div>
                <div className="space-y-1.5 overflow-hidden h-24">
                   {systemLog.map((log, i) => (
                     <motion.p 
                      key={log + i} 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      className="text-[8px] font-mono text-zinc-500 uppercase tracking-tighter"
                     >
                       {log}
                     </motion.p>
                   ))}
                </div>
             </div>
          </div>

          <div className="absolute bottom-10 right-10 z-20 text-right">
             <div className="flex items-baseline space-x-2">
                <BarChart3 size={14} className="text-red-600" />
                <span className="text-5xl font-black italic text-white tracking-tighter">98<span className="text-2xl text-red-600">.4</span>%</span>
             </div>
             <p className="text-[9px] font-black text-red-600 uppercase tracking-[0.4em] mt-2">OPTIMUM_CHASSIS_LOAD</p>
             
             <div className="mt-4 flex space-x-4 justify-end">
                <div>
                   <p className="text-[7px] font-black text-zinc-500 uppercase">AERO_EFF</p>
                   <p className="text-[10px] font-black text-white font-mono">0.24 cD</p>
                </div>
                <div className="h-6 w-[1px] bg-zinc-800" />
                <div>
                   <p className="text-[7px] font-black text-zinc-500 uppercase">DOWNFORCE</p>
                   <p className="text-[10px] font-black text-white font-mono">4.2k LBS</p>
                </div>
             </div>
          </div>
          
          <div className="absolute inset-0 pointer-events-none opacity-10 flex flex-wrap content-start">
             {[...Array(64)].map((_, i) => (
               <div key={i} className="w-1/8 h-1/8 border-[0.5px] border-white/20 relative">
                  <span className="absolute top-1 left-1 text-[6px] font-mono text-white/50">{i}</span>
               </div>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
