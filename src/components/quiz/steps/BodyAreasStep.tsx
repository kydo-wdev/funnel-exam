'use client';

import { useState } from 'react';
import type { QuizStep } from '@/lib/config/quizConfig';

interface BodyAreasStepProps {
  step: QuizStep;
  onContinue: (value: string) => void;
}

export default function BodyAreasStep({ step, onContinue }: BodyAreasStepProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleContinue = () => {
    // Save comma-separated selected areas
    onContinue(Array.from(selected).join(','));
  };

  return (
    <div className="animate-slide-left w-full max-w-xl mx-auto px-4 py-8 flex flex-col gap-4">
      {/* Question */}
      {step.question && (
        <div className="text-center">
          <h1
            className="text-[1.4rem] font-bold text-[#1A1A1A] leading-snug mb-1"
            style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
          >
            {step.question}
          </h1>
          {step.subtitle && (
            <p className="text-sm text-[#6B7280]">{step.subtitle}</p>
          )}
        </div>
      )}

      {/* Figure + floating tags */}
      <div className="relative w-full" style={{ minHeight: '420px' }}>
        {/* Body figure image */}
        <div className="absolute inset-0 flex items-center justify-center">
          {step.bodyImage ? (
            <div className="h-full w-full">
              <img
                src={step.bodyImage}
                alt={step.bodyImageAlt ?? 'Body figure'}
                className="w-full h-full object-contain object-center"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          ) : (
            /* Placeholder silhouette */
            <div className="flex items-center justify-center h-full text-gray-200 text-9xl select-none">
              🧍
            </div>
          )}
        </div>

        {/* Floating area tags */}
        {step.areas?.map((area) => {
          const isSelected = selected.has(area.id);
          return (
            <button
              key={area.id}
              onClick={() => toggle(area.id)}
              style={{ top: area.top, left: area.left, transform: 'translateY(-50%)' }}
              className={`
                absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-semibold
                transition-all duration-150 active:scale-95 whitespace-nowrap z-10
                ${isSelected
                  ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white'
                  : 'bg-white border-gray-300 text-[#1A1A1A] hover:border-[#F5A623]'}
              `}
            >
              {/* + / ✓ icon */}
              {isSelected ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6.5" stroke="white" strokeWidth="1"/>
                  <path d="M4 7L6.5 9.5L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6.5" stroke="#9CA3AF" strokeWidth="1"/>
                  <path d="M7 4V10M4 7H10" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
              {area.label}
            </button>
          );
        })}
      </div>

      {/* Continue button */}
      <button
        onClick={handleContinue}
        className="w-full bg-[#1A1A1A] hover:bg-[#333333] active:scale-[0.98] text-white font-bold text-base py-4 rounded-2xl transition-all duration-150"
      >
        Continue
      </button>
    </div>
  );
}
