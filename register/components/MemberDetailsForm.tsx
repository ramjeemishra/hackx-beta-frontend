
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeamMember } from '../types';
import { User, Mail, Phone, ArrowLeft, ArrowRight, Cog } from 'lucide-react';

interface MemberDetailsFormProps {
  totalMembers: number;
  onBack: () => void;
  onSubmit: (members: TeamMember[]) => void;
}

const MemberDetailsForm: React.FC<MemberDetailsFormProps> = ({ totalMembers, onBack, onSubmit }) => {
  // We assume member 1 is the lead (already filled), so we ask for totalMembers - 1 additional members.
  // Actually, for hackathons often they ask for all members even if lead is one. 
  // Let's assume we need details for (totalMembers - 1) additional members.
  const additionalCount = totalMembers - 1;
  const [members, setMembers] = useState<TeamMember[]>(
    Array(additionalCount).fill(null).map(() => ({ fullName: '', email: '', phone: '' }))
  );

  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setMembers(newMembers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(members);
  };

  const inputClass = "w-full bg-neutral-900/50 border-b-2 border-neutral-800 focus:border-red-600 p-3 pl-10 outline-none transition-all duration-300 font-mono text-white placeholder-neutral-600 hover:bg-neutral-800/50 rounded-t-md text-sm";

  return (
    <form onSubmit={handleSubmit} className="bg-neutral-950/40 p-8 rounded-2xl border border-neutral-800 backdrop-blur-md">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-f1 italic uppercase tracking-tighter flex items-center gap-3">
            <Cog className="text-red-600 animate-spin-slow" />
            Crew Assembly
          </h2>
          <p className="text-neutral-500 text-sm mt-1">Registering {additionalCount} additional teammates for the grid.</p>
        </div>
        <button 
          type="button" 
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-xs font-mono uppercase"
        >
          <ArrowLeft size={14} /> Revisit Technical Specs
        </button>
      </div>

      <div className="space-y-12 max-h-[50vh] overflow-y-auto pr-4 scroll-custom">
        {members.map((member, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 border-l-4 border-red-600 bg-neutral-900/20 rounded-r-xl space-y-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-f1 italic text-neutral-600 uppercase">ENGINEER #0{idx + 2}</span>
              <div className="h-px bg-neutral-800 flex-1 ml-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-600 transition-colors" size={16} />
                <input 
                  required
                  type="text"
                  placeholder="FULL NAME"
                  className={inputClass}
                  value={member.fullName}
                  onChange={(e) => updateMember(idx, 'fullName', e.target.value)}
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-600 transition-colors" size={16} />
                <input 
                  required
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className={inputClass}
                  value={member.email}
                  onChange={(e) => updateMember(idx, 'email', e.target.value)}
                />
              </div>

              <div className="relative group">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-600 transition-colors" size={16} />
                <input 
                  required
                  type="tel"
                  placeholder="CONTACT"
                  className={inputClass}
                  value={member.phone}
                  onChange={(e) => updateMember(idx, 'phone', e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-10">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-f1 italic text-2xl py-5 rounded-lg flex items-center justify-center gap-4 group transition-all"
        >
          FINISH LAP & REGISTER
          <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </motion.button>
      </div>

      <style>{`
        .scroll-custom::-webkit-scrollbar {
          width: 4px;
        }
        .scroll-custom::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
};

export default MemberDetailsForm;
