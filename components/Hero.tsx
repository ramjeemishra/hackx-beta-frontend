import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Countdown from "./Countdown";
import f1 from "../images/f1.png";
import { useNavigate } from "react-router-dom";
import { Component } from "lucide-react";

const title = "HACKX";

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  const carY = useTransform(scrollY, [0, 400], [0, -60]);
  const textY = useTransform(scrollY, [0, 400], [0, 40]);
  const fade = useTransform(scrollY, [0, 300], [1, 0]);
  const blur = useTransform(scrollY, [0, 300], ["blur(0px)", "blur(12px)"]);

  return (
    <section className="relative h-screen overflow-hidden bg-white f1-grid">
      <motion.div
        style={{ y: carY }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          initial={{ x: "100vw", opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1400px] flex justify-center"
        >
          <motion.img
            // src="/images/f1.png"
            src={f1}
            alt="F1 Racing Car"
            animate={{ y: [-6, 6], rotate: [-0.15, 0.15] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="w-full max-w-[1400px] h-auto object-contain select-none opacity-95"
            style={{
              filter: "contrast(1.1) saturate(1.1)",
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: fade, filter: blur }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <div className="inline-block px-5 py-3 bg-white/70 md:bg-white/60 backdrop-blur-md border border-white/40 rounded-xl mb-4">
          <p className="text-red-600 font-black tracking-[0.45em] uppercase text-xs md:text-sm">
            24-Hour Innovation Sprint
          </p>
        </div>

        <div className="inline-block px-6 py-4 bg-white/75 md:bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl mb-6">
          <h1 className="flex justify-center text-6xl md:text-8xl lg:text-[160px] font-black italic tracking-tighter text-black leading-none uppercase">
            {title.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.6 + i * 0.08,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
            <span className="text-red-600 ml-2">4.0</span>
          </h1>
        </div>

        <div className="inline-block px-6 py-3 bg-white/65 md:bg-white/50 backdrop-blur-md border border-white/30 rounded-xl mb-3">
          <h2 className="text-lg md:text-2xl lg:text-4xl font-bold uppercase tracking-widest text-zinc-600">
            Race to Innovation
          </h2>
        </div>

        <div className="flex flex-col items-center mb-3">
          <div className="inline-block px-4 py-2 bg-white/70 md:bg-white/55 backdrop-blur-md border border-white/30 rounded-lg mb-2">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-zinc-700">
              Race Begins In
            </p>
          </div>
          <Countdown />
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: "0 20px 40px rgba(239,68,68,0.25)",
              transition: { type: "spring", stiffness: 220, damping: 18 },
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/register")}
            className="px-12 py-5 bg-red-600 text-white font-black uppercase tracking-widest rounded-xl"
          >
            Register Now
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.03,
              transition: { type: "spring", stiffness: 220, damping: 18 },
            }}
            whileTap={{ scale: 0.97 }}
            className="px-12 py-5 border border-zinc-200 text-black font-black uppercase tracking-widest bg-white/60 backdrop-blur-md rounded-xl"
          >
            View Tracks
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-10 left-6 md:left-10 z-10"
      >
        <p className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
          February 28 – March 1, 2026
        </p>
        <p className="text-xs font-black text-black italic">
          NMIMS University, Mumbai
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
