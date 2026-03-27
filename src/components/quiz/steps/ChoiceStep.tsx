'use client';

import OptionCard from '@/components/ui/OptionCard';
import type { QuizStep } from '@/lib/config/quizConfig';

interface ChoiceStepProps {
  step: QuizStep;
  onAnswer: (stepId: string, value: string, nextStep?: number) => void;
}

export default function ChoiceStep({ step, onAnswer }: ChoiceStepProps) {
  return (
    <div className="animate-slide-left w-full max-w-xl mx-auto px-4 py-10">
      {/* Question */}
      <h1
        className="text-[1.6rem] font-bold text-[#1A1A1A] text-center mb-8 leading-snug"
        style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
      >
        {step.question}
      </h1>
      {step.subtitle && (
        <p className="-mt-5 mb-6 text-center text-sm text-[#4B5563]">{step.subtitle}</p>
      )}

      {/* Options */}
      <div className="flex flex-col gap-3">
        {step.options?.map((opt) => (
          <OptionCard
            key={opt.id}
            emoji={opt.emoji}
            label={opt.label}
            onClick={() => onAnswer(step.id, opt.id, opt.nextStep)}
          />
        ))}
      </div>
    </div>
  );
}
