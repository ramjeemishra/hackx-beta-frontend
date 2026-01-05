import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MapPin,
  Flag,
  ChevronRight,
  Zap,
  Coffee,
  ShieldCheck,
} from "lucide-react";

const scheduleData = [
  { time: "8:30 AM", event: "Reporting", x: "10%", y: "50%", details: "Initial scrutineering and paddock entry.", strategy: "Full tank, hard tires.", icon: <MapPin size={16} /> },
  { time: "9:00 AM", event: "Registrations", x: "20%", y: "30%", details: "Driver registration and livery collection.", strategy: "Aero setup optimization.", icon: <ShieldCheck size={16} /> },
  { time: "10:30 AM", event: "Opening Ceremony", x: "35%", y: "20%", details: "Formation lap before green flag.", strategy: "System diagnostics complete.", icon: <Zap size={16} /> },
  { time: "12:00 PM", event: "Hackathon Starts", x: "50%", y: "40%", details: "Green flag! The 24-hour race begins.", strategy: "DRS enabled. Maximum push.", icon: <Flag size={16} /> },
  { time: "7:00 PM", event: "Mentorship I", x: "65%", y: "25%", details: "Mid-race pit stop for strategy tuning.", strategy: "Data telemetry analysis.", icon: <Coffee size={16} /> },
  { time: "9:00 AM", event: "Mentorship II", x: "80%", y: "60%", details: "Final sector adjustment and performance check.", strategy: "Push for the fastest lap.", icon: <Zap size={16} /> },
  { time: "4:00 PM", event: "Closing Ceremony", x: "92%", y: "50%", details: "The checkered flag. Podium celebration.", strategy: "Victory lap.", icon: <Flag size={16} /> },
];

const Schedule: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scanX = useTransform(scrollYProgress, [0, 1], ["-20%", "120%"]);
  const hudOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const startGlow = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const startPulse = useTransform(scrollYProgress, [0, 0.2], [0.6, 1]);

  return (
    <section id="schedule" className="bg-white py-20 md:py-32 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <motion.h4 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-red-600 font-black uppercase tracking-widest text-sm mb-2">
            Race Timeline
          </motion.h4>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black italic tracking-tight text-black uppercase">
            THE RACE CIRCUIT
          </motion.h2>
          <p className="text-zinc-400 mt-4 uppercase tracking-[0.2em] text-xs">
            A technical breakdown of the 24-hour sprint
          </p>
        </div>

        <div className="hidden lg:block relative w-full h-[650px] bg-zinc-950 rounded-[60px] border border-red-600/20 overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.6)] p-10">

          <motion.div style={{ opacity: hudOpacity }} className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.12),transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(239,68,68,0.12)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
          </motion.div>

          <div className="absolute top-8 left-10 z-40">
            <div className="flex space-x-1 mb-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-1 h-3 bg-red-600/40 rounded-full" />
              ))}
            </div>
            <p className="text-[10px] font-black italic tracking-widest text-white/40">
              CIRCUIT_TELEMETRY_v4.0
            </p>
          </div>

          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path
              d="M 50 300 Q 150 100 300 200 T 600 150 T 900 400 T 1180 300"
              fill="transparent"
              stroke="#020617"
              strokeWidth="80"
              strokeLinecap="round"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 4, ease: "easeInOut" }}
              d="M 50 300 Q 150 100 300 200 T 600 150 T 900 400 T 1180 300"
              fill="transparent"
              stroke="#ef4444"
              strokeWidth="6"
              strokeLinecap="round"
              className="drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]"
            />
          </svg>

          <motion.div style={{ x: scanX }} className="absolute top-0 left-0 h-full w-[120px] bg-gradient-to-r from-transparent via-red-600/20 to-transparent blur-xl" />

          <motion.div style={{ opacity: startGlow }} className="absolute left-4 bottom-28 w-24 h-24 rounded-full bg-red-600/30 blur-3xl" />
          <motion.div style={{ scale: startPulse }} className="absolute left-6 bottom-32 w-10 h-10 rounded-full bg-red-600 shadow-[0_0_40px_rgba(239,68,68,0.9)]" />

          <div className="absolute left-6 bottom-40 text-[10px] font-black tracking-[0.4em] text-white/40 rotate-[-90deg] origin-left">
            STARTING GRID
          </div>

          <div className="absolute left-10 bottom-10 w-[360px] h-[220px] bg-black/70 backdrop-blur-xl rounded-[32px] border border-red-600/20 p-6">
            <p className="text-[11px] font-black tracking-widest text-red-500 mb-4">
              &gt; SYS_LOG_FEED
            </p>
            <div className="space-y-2 text-[10px] font-mono text-white/70">
              <div>0X8D_DRS_ENABLED</div>
              <div>0X22_CORE_TEMP_34.5C</div>
              <div>0X8D_DRS_ENABLED</div>
              <div>0X22_CORE_TEMP_34.5C</div>
              <div>0X22_CORE_TEMP_34.5C</div>
            </div>
          </div>

          <div className="absolute left-[420px] bottom-[70px] flex items-end space-x-6">
            <div>
              <p className="text-[48px] font-black text-white leading-none">
                98<span className="text-red-500 text-[28px] align-top">.4%</span>
              </p>
              <p className="text-[10px] font-black tracking-widest text-red-500 uppercase">
                OPTIMUM_CHASSIS_LOAD
              </p>
            </div>
            <div className="h-[60px] w-px bg-red-600/30" />
            <div className="space-y-1">
              <p className="text-[10px] text-white/50 font-black uppercase tracking-widest">
                AERO_EFF
              </p>
              <p className="text-sm font-black text-white">0.24 CD</p>
              <p className="text-[10px] text-white/50 font-black uppercase tracking-widest mt-2">
                DOWNFORCE
              </p>
              <p className="text-sm font-black text-white">4.2K LBS</p>
            </div>
          </div>

          {scheduleData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2, type: "spring", damping: 14 }}
              style={{ left: item.x, top: item.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-40"
            >
              <div className="absolute bottom-full mb-3 whitespace-nowrap bg-black/80 backdrop-blur-md text-white px-3 py-1 rounded-md text-[10px] font-black italic tracking-tight">
                {item.time} — {item.event}
              </div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-zinc-900 border border-red-600/40 p-3 rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.45)] cursor-pointer"
              >
                <div className="text-red-600">{item.icon}</div>
              </motion.div>

              <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-64 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                <div className="bg-zinc-950/95 backdrop-blur-xl p-5 rounded-[32px] shadow-2xl border border-red-600/20">
                  <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-2">
                    Technical Briefing
                  </p>
                  <p className="text-xs font-black text-white uppercase leading-tight mb-2">
                    {item.details}
                  </p>
                  <p className="text-[11px] font-black italic text-zinc-400">
                    {item.strategy}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "PRE-RACE", desc: "Strategy & Scrutineering" },
            { label: "QUALIFYING", desc: "Build & Prototype" },
            { label: "PIT STOP", desc: "Mentorship & Review" },
            { label: "PODIUM", desc: "Judging & Victory" },
          ].map((sector, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="p-10 glass-card rounded-[40px] text-center border-t-8 border-red-600 shadow-2xl"
            >
              <h3 className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-2">
                Sector {i + 1}
              </h3>
              <p className="text-2xl font-black text-black uppercase italic tracking-tighter mb-1">
                {sector.label}
              </p>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                {sector.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
