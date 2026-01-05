
import React from 'react';
import { motion } from 'framer-motion';
import { FormStep } from '../types';

interface StepIndicatorProps {
  currentStep: FormStep;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: FormStep.TEAM_DETAILS, label: 'Pit Entry' },
    { id: FormStep.MEMBER_DETAILS, label: 'Crew Assignment' },
    { id: FormStep.SUCCESS, label: 'Checkered Flag' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2 px-2">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center flex-1">
             <span className={`text-[10px] font-mono uppercase tracking-[0.2em] mb-2 ${currentStep >= step.id ? 'text-red-500' : 'text-gray-600'}`}>
              {step.label}
            </span>
            <div className={`h-1 w-full relative transition-all duration-700 ${currentStep >= step.id ? 'bg-red-600' : 'bg-gray-800'}`}>
                {currentStep === step.id && (
                  <motion.div 
                    layoutId="activeStep"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-4 border-red-600 rounded-full shadow-[0_0_15px_rgba(225,6,0,0.8)]" 
                  />
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
