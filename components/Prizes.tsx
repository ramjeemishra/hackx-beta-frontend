import React, { useEffect, useRef } from "react";
import {
  motion,
  Variants,
  useInView,
  animate,
  useScroll,
  useTransform,
  useVelocity
} from "framer-motion";
import bottle from "../images/bottle.png";
import flag from "../images/flag.png";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.22 }
  }
};

const podium: Variants = {
  hidden: { opacity: 0, y: 120 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  }
};

const Count = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate(v) {
        ref.current!.textContent = `₹${Math.floor(v).toLocaleString()}`;
      }
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>₹0</span>;
};

const Prizes: React.FC = () => {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  const liftFast = useTransform(velocity, [-1500, 0, 1500], [10, 0, -10]);
  const liftSlow = useTransform(velocity, [-1500, 0, 1500], [5, 0, -5]);
  const glow = useTransform(scrollY, [0, 600], [0, 1]);

  return (
    <section
      id="prizes"
      className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-black py-32 sm:py-40 md:py-48"
    >
      <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[length:14px_14px]" />

      <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        <div className="absolute left-[10%] bottom-[54%] w-[360px] pointer-events-none">
          <motion.div
            style={{ opacity: glow }}
            className="
      absolute inset-0
      bg-white/40
      blur-[40px]
      rounded-full
      mix-blend-soft-light
      mask-image-[radial-gradient(circle,white_40%,transparent_70%)]
    "
          />
          <motion.img
            src={flag}
            style={{ opacity: glow }}
            className="relative w-full blur-[1px] rotate-[-22deg]"
            alt=""
          />
        </div>

        <motion.img
          src={bottle}
          style={{ opacity: glow }}
          className="absolute right-[12%] bottom-[52%] w-[340px] blur-[0.8px] rotate-[-6deg]"
          alt=""
        />
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center text-white">
        <motion.h4
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-red-500 font-black uppercase tracking-[0.45em] text-xs mb-6"
        >
          Post-Race Ceremony
        </motion.h4>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black italic tracking-tight mb-20 sm:mb-28 md:mb-36"
        >
          RACE RESULTS
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="flex flex-col md:flex-row items-center md:items-end justify-center gap-16 md:gap-0"
        >
          <motion.div
            variants={podium}
            style={{ y: liftFast }}
            whileHover={{ y: -12, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="order-1 md:order-2 w-full md:flex-1"
          >
            <div className="relative bg-red-600 h-64 sm:h-72 md:h-80 rounded-t-[48px] flex flex-col justify-center items-center border border-red-700 overflow-hidden shadow-[0_40px_120px_rgba(239,68,68,0.5)]">
              <span className="absolute -bottom-8 text-[160px] md:text-[180px] font-black italic text-black/20">
                1
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black italic">
                <Count value={35000} />
              </h3>
              <p className="mt-3 text-sm uppercase tracking-[0.4em] font-black">
                Champion
              </p>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </motion.div>

          <motion.div
            variants={podium}
            style={{ y: liftSlow }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
            className="order-2 md:order-1 w-full md:flex-1"
          >
            <div className="relative bg-zinc-800/90 backdrop-blur h-52 sm:h-60 md:h-64 rounded-t-[48px] flex flex-col justify-center items-center border border-white/10 overflow-hidden">
              <span className="absolute -bottom-6 text-[120px] md:text-[140px] font-black italic text-white/5">
                2
              </span>
              <h3 className="text-xl sm:text-2xl font-black italic text-red-500">
                <Count value={25000} />
              </h3>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] font-bold text-zinc-400">
                P2 · Runner Up
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={podium}
            style={{ y: liftSlow }}
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ type: "spring", stiffness: 160, damping: 24 }}
            className="order-3 w-full md:flex-1"
          >
            <div className="relative bg-zinc-900/90 backdrop-blur h-56 sm:h-48 md:h-48 rounded-t-[48px] flex flex-col justify-center items-center border border-white/10 overflow-hidden">
              <div className="absolute inset-0 flex items-start justify-center md:hidden pointer-events-none">
                <img
                  src={bottle}
                  className="mt-[-36px] w-[180px] opacity-20 blur-[3px] rotate-[-6deg]"
                  alt=""
                />
              </div>
              <span className="absolute -bottom-6 text-[120px] font-black italic text-white/5">
                3
              </span>
              <h3 className="text-xl font-black italic text-red-500">
                <Count value={15000} />
              </h3>
              <p className="mt-3 text-[10px] uppercase tracking-[0.35em] font-bold text-zinc-400">
                P3 · Runner Up
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative h-10 mt-0 bg-zinc-900 rounded-b-[48px] overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-x-0 top-0 h-[8px] bg-[repeating-linear-gradient(90deg,#fff_0_18px,#000_18px_36px)] opacity-70" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="mt-20 text-zinc-500 text-xs uppercase tracking-[0.45em] font-bold"
        >
          🏁 Race completed · only three teams reach the podium
        </motion.p>
      </div>
    </section>
  );
};

export default Prizes;
