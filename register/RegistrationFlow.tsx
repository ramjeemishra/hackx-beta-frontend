
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RegistrationData, FormStep, TeamMember } from './types';
import TeamDetailsForm from './components/TeamDetailsForm';
import MemberDetailsForm from './components/MemberDetailsForm';
import SuccessScreen from './components/SuccessScreen';
import StepIndicator from './components/StepIndicator';
import { Trophy, Zap, Flag } from 'lucide-react';

const RegistrationFlow: React.FC = () => {
  const [step, setStep] = useState<FormStep>(FormStep.TEAM_DETAILS);
  const [formData, setFormData] = useState<RegistrationData>({
    teamName: '',
    leadName: '',
    leadEmail: '',
    leadPhone: '',
    leadGender: 'Male',
    totalMembers: 2,
    members: [],
  });

  const handleStep1Submit = (data: Partial<RegistrationData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(FormStep.MEMBER_DETAILS);
  };

const handleStep2Submit = async (members: TeamMember[]) => {
  const payload = { ...formData, members };

  try {
    await fetch("https://hackx-beta-backend.onrender.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setFormData(payload);
    setStep(FormStep.SUCCESS);
  } catch (error) {
    alert("Registration failed. Please try again.");
  }
};


  const resetForm = () => {
    setStep(FormStep.TEAM_DETAILS);
    setFormData({
      teamName: '',
      leadName: '',
      leadEmail: '',
      leadPhone: '',
      leadGender: 'Male',
      totalMembers: 2,
      members: [],
    });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white flex flex-col items-center justify-start py-12 px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-carbon opacity-20 pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-red-600/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-red-900/5 blur-[120px] rounded-tl-full" />

      {/* Header Section */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 text-center mb-12"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <Zap className="text-red-600 w-10 h-10 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-black font-f1 tracking-tighter uppercase italic">
            Grand <span className="text-red-600">Prix</span> Hack
          </h1>
          <Trophy className="text-red-600 w-10 h-10 animate-bounce" />
        </div>
        <p className="font-mono text-gray-400 tracking-widest uppercase text-sm">
          Race to the Finish • Q1 Registration Phase
        </p>
      </motion.header>

      {/* Progress Track */}
      {step !== FormStep.SUCCESS && (
        <div className="w-full max-w-4xl mb-12 z-10">
          <StepIndicator currentStep={step} />
        </div>
      )}

      {/* Form Container */}
      <main className="w-full max-w-4xl relative z-10">
        <AnimatePresence mode="wait">
          {step === FormStep.TEAM_DETAILS && (
            <motion.div
              key="step1"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            >
              <TeamDetailsForm 
                initialData={formData} 
                onNext={handleStep1Submit} 
              />
            </motion.div>
          )}

          {step === FormStep.MEMBER_DETAILS && (
            <motion.div
              key="step2"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            >
              <MemberDetailsForm 
                totalMembers={formData.totalMembers} 
                onBack={() => setStep(FormStep.TEAM_DETAILS)}
                onSubmit={handleStep2Submit}
              />
            </motion.div>
          )}

          {step === FormStep.SUCCESS && (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
            >
              <SuccessScreen 
                teamName={formData.teamName} 
                onReset={resetForm} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Decoration */}
      <footer className="mt-auto pt-12 pb-4 opacity-30 flex items-center gap-2">
        <Flag size={16} />
        <span className="text-xs uppercase font-mono tracking-tighter">Powered by V12 Engine • Built for Speed</span>
      </footer>
    </div>
  );
};

export default RegistrationFlow;
