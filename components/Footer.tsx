
import React from 'react';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-4xl font-black italic text-red-600 mb-6 tracking-tighter">HACKX 4.0</h2>
          <p className="text-white/40 text-sm max-w-sm leading-relaxed mb-8">
            Race to innovation. The ultimate 24-hour hackathon where brilliant minds compete for glory and push the limits of technology.
          </p>
          <div className="flex space-x-4">
            {[Instagram, Twitter, Linkedin, Github].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover:bg-red-600 transition-all group">
                <Icon size={18} className="group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">Quick Links</h4>
          <ul className="space-y-4">
            {['About', 'Schedule', 'Tracks', 'Prizes', 'FAQ'].map(item => (
              <li key={item}><a href={`#${item.toLowerCase()}`} className="text-xs text-white/40 hover:text-red-600 transition-colors uppercase font-bold tracking-widest">{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">Organized By</h4>
          <ul className="space-y-4 text-xs font-bold text-white/40 uppercase tracking-widest">
            <li>DSC ITM</li>
            <li>GDG NMIMS</li>
            <li>IEEE NMIMS</li>
            <li>GDG UMIT</li>
            <li>IEEE UMIT</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
        <p>© 2026 DSC/HACKX ALL RIGHTS RESERVED.</p>
        <p>BUILT WITH PASSION BY THE HACKX & DSC TEAM</p>
      </div>
    </footer>
  );
};

export default Footer;
