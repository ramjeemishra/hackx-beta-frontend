
import React from 'react';
import { motion } from 'framer-motion';

const Sponsors: React.FC = () => {
  const tiers = [
    { name: "Title Sponsor", count: 2, size: "h-48", label: "PLATINUM CREW" },
    { name: "Powered By", count: 3, size: "h-36", label: "GOLDEN PIT" },
    { name: "Associate Sponsors", count: 8, size: "h-24", label: "SILVER TRACK" }
  ];

  return (
    <section id="sponsors" className="bg-zinc-50 f1-grid py-20 md:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h4 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-red-600 font-black uppercase tracking-widest text-sm mb-2"
          >
            Our Pit Crew
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black italic tracking-tight text-black uppercase"
          >
            SPONSORS & PARTNERS
          </motion.h2>
          <p className="text-zinc-400 mt-4 uppercase tracking-[0.2em] text-xs">The engineering teams fueling our innovation race</p>
        </div>

        <div className="space-y-32">
          {tiers.map((tier, tIdx) => (
            <div key={tier.name} className="text-center">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex items-center justify-center space-x-4 mb-12"
              >
                <div className="h-[1px] bg-zinc-200 flex-1" />
                <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.5em]">{tier.label}</p>
                <div className="h-[1px] bg-zinc-200 flex-1" />
              </motion.div>

              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {Array.from({ length: tier.count }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + tIdx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10, rotate: 1 }}
                    className={`w-full sm:w-64 lg:w-72 ${tier.size} glass-card rounded-[32px] flex items-center justify-center group relative overflow-hidden transition-all shadow-xl hover:shadow-red-600/10 cursor-pointer border border-white/50 bg-white/40`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-zinc-300 font-black group-hover:text-red-600/40 transition-colors uppercase tracking-widest italic text-sm">
                      {tier.name} {i + 1}
                    </span>
                    <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-zinc-200 group-hover:bg-red-600 group-hover:animate-ping" />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32 p-12 md:p-16 rounded-[60px] bg-zinc-900 text-center relative overflow-hidden shadow-2xl group"
        >
          <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-10 transition-opacity" />
          <h3 className="relative z-10 text-2xl md:text-3xl font-black italic mb-6 text-white uppercase tracking-tighter">Want to join the pit crew?</h3>
          <p className="relative z-10 text-zinc-400 text-sm max-w-xl mx-auto mb-10 font-bold uppercase tracking-widest">Help us fuel the next generation of technical innovators. Get in touch for partnership opportunities.</p>
          <button className="relative z-10 px-12 py-5 bg-red-600 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-white hover:text-black transition-all shadow-xl shadow-red-600/20">
            Sponsor HackX 4.0
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
