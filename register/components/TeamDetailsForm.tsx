
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RegistrationData, Gender } from '../types';
import { User, Mail, Phone, Users, Shield, ArrowRight } from 'lucide-react';

interface TeamDetailsFormProps {
  initialData: RegistrationData;
  onNext: (data: Partial<RegistrationData>) => void;
}

const TeamDetailsForm: React.FC<TeamDetailsFormProps> = ({ initialData, onNext }) => {
  const [formData, setFormData] = useState({
    teamName: initialData.teamName,
    leadName: initialData.leadName,
    leadEmail: initialData.leadEmail,
    leadPhone: initialData.leadPhone,
    leadGender: initialData.leadGender,
    totalMembers: initialData.totalMembers,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const inputClass = "w-full bg-neutral-900/50 border-b-2 border-neutral-800 focus:border-red-600 p-4 pl-12 outline-none transition-all duration-300 font-mono text-white placeholder-neutral-600 hover:bg-neutral-800/50 rounded-t-lg";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-neutral-950/40 p-8 rounded-2xl border border-neutral-800 backdrop-blur-md">
      <div className="md:col-span-2 mb-4">
        <h2 className="text-2xl font-f1 italic uppercase tracking-tighter flex items-center gap-3">
          <Shield className="text-red-600" />
          Technical Regulations
        </h2>
        <p className="text-neutral-500 text-sm mt-1">Initialize your constructor profile and designate a lead driver.</p>
      </div>

      {/* Team Name */}
      <div className="relative group md:col-span-2">
        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-600 transition-colors" size={20} />
        <input 
          required
          type="text" 
          placeholder="CONSTRUCTOR (TEAM) NAME"
          className={inputClass}
          value={formData.teamName}
          onChange={(e) => setFormData({...formData, teamName: e.target.value})}
        />
      </div>

      {/* Lead Name */}
      <div className="relative group">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-600 transition-colors" size={20} />
        <input 
          required
          type="text" 
          placeholder="LEAD DRIVER FULL NAME"
          className={inputClass}
          value={formData.leadName}
          onChange={(e) => setFormData({...formData, leadName: e.target.value})}
        />
      </div>

      {/* Lead Email */}
      <div className="relative group">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-600 transition-colors" size={20} />
        <input 
          required
          type="email" 
          placeholder="COMMUNICATION CHANNEL (EMAIL)"
          className={inputClass}
          value={formData.leadEmail}
          onChange={(e) => setFormData({...formData, leadEmail: e.target.value})}
        />
      </div>

      {/* Lead Phone */}
      <div className="relative group">
        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-600 transition-colors" size={20} />
        <input 
          required
          type="tel" 
          placeholder="PIT WALL CONTACT (PHONE)"
          className={inputClass}
          value={formData.leadPhone}
          onChange={(e) => setFormData({...formData, leadPhone: e.target.value})}
        />
      </div>

      {/* Lead Gender */}
      <div className="relative group">
        <select 
          className={inputClass}
          value={formData.leadGender}
          onChange={(e) => setFormData({...formData, leadGender: e.target.value as Gender})}
        >
          <option value="Male">MALE</option>
          <option value="Female">FEMALE</option>
          <option value="Other">OTHER</option>
          <option value="Prefer not to say">REDACTED</option>
        </select>
      </div>

      {/* Total Members */}
      <div className="md:col-span-2">
        <label className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-4">Total Crew Size (2-5)</label>
        <div className="flex gap-4">
          {[2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setFormData({...formData, totalMembers: num})}
              className={`flex-1 py-3 font-f1 italic text-xl transition-all duration-300 rounded border ${
                formData.totalMembers === num 
                  ? 'bg-red-600 border-red-500 text-white scale-105 shadow-[0_0_20px_rgba(225,6,0,0.4)]' 
                  : 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:border-neutral-700'
              }`}
            >
              0{num}
            </button>
          ))}
        </div>
      </div>

      <div className="md:col-span-2 pt-4">
        <motion.button
          whileHover={{ x: 5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-f1 italic text-2xl py-5 rounded-lg flex items-center justify-center gap-4 group transition-all"
        >
          NEXT PHASE: CREW ASSEMBLY
          <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </motion.button>
      </div>
    </form>
  );
};

export default TeamDetailsForm;
