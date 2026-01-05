
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Radio } from 'lucide-react';

const faqs = [
  {
    q: "When and where will HackX be held?",
    a: "HackX 4.0 will be held on February 28 - March 1, 2026 at NMIMS University, Navi Mumbai. The event starts at 8:30 AM on Day 1 with reporting and concludes at 4:00 PM on Day 2 with the closing ceremony."
  },
  {
    q: "Who can participate in HackX?",
    a: "College students across India from any discipline are welcome to participate. Whether you are a developer, designer, or entrepreneur, there is a track for you."
  },
  {
    q: "How many members can be in a team?",
    a: "Teams must consist of 2-4 members. Equal contribution from all team members is mandatory."
  },
  {
    q: "Is there a registration fee?",
    a: "Yes, there is a refundable registration fee of ₹600 per team required to confirm your slot."
  }
];

const FAQItem: React.FC<{ item: { q: string; a: string }; i: number }> = ({ item, i }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-8 bg-zinc-50 border border-zinc-100 rounded-[32px] text-left transition-all hover:bg-white hover:shadow-xl group"
      >
        <div className="flex items-center space-x-6">
          <span className="text-red-600 font-black italic text-xl">0{i+1}</span>
          <span className="font-bold text-sm uppercase tracking-widest text-black">{item.q}</span>
        </div>
        <ChevronDown className={`text-red-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-10 text-sm text-zinc-500 leading-relaxed border-x border-b border-zinc-100 rounded-b-[32px] bg-zinc-50/50">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  return (
    <section id="faqs" className="bg-white py-32">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Radio className="text-red-600 animate-pulse" />
            <h4 className="text-red-600 font-black uppercase tracking-[0.3em] text-sm">Pit Radio</h4>
          </div>
          <h2 className="text-6xl font-black italic tracking-tight uppercase text-black">Common Queries</h2>
        </div>
        
        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} item={faq} i={i} />
          ))}
        </div>

        <div className="mt-20 p-12 rounded-[50px] bg-zinc-900 text-center relative overflow-hidden group">
           <div className="absolute inset-0 bg-red-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
           <h3 className="relative z-10 text-3xl font-black italic mb-6 text-white">STILL HAVE QUESTIONS?</h3>
           <button className="relative z-10 px-10 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform">Get In Touch</button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
