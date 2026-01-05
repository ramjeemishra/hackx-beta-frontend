
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const links = ['About', 'Schedule', 'Tracks', 'Prizes', 'Sponsors', 'FAQs'];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-5 bg-white/80 backdrop-blur-xl border-b border-zinc-100"
    >
      <div className="flex items-center space-x-2">
        <span className="text-2xl md:text-3xl font-black italic tracking-tighter text-red-600">HACKX</span>
        <div className="hidden md:block w-1 h-8 bg-zinc-200 mx-4 rotate-12" />
        <span className="hidden md:block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">DSC & NMIMS University</span>
      </div>
      
      <ul className="hidden lg:flex items-center space-x-10">
        {links.map((link) => (
          <li key={link} className="group relative">
            <a href={`#${link.toLowerCase()}`} className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-black transition-colors">
              {link}
            </a>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full" />
          </li>
        ))}
      </ul>

      <div className="flex items-center space-x-4 md:space-x-6">
        <div className="hidden sm:flex items-center space-x-3 bg-red-50 px-4 py-2 rounded-full border border-red-100">
          <Activity size={14} className="text-red-600 animate-pulse" />
          <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Live</span>
        </div>
        <button className="px-5 md:px-6 py-2 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-sm hover:bg-red-600 transition-all">
          Join
        </button>
        <button 
          className="lg:hidden p-2 text-zinc-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 top-[72px] bg-white z-[60] p-10 lg:hidden"
          >
            <ul className="space-y-8">
              {links.map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-black uppercase tracking-widest text-zinc-400 hover:text-red-600"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
