'use client';

import type { QuizStep } from '@/lib/config/quizConfig';

interface ImageGridStepProps {
  step: QuizStep;
  onAnswer: (stepId: string, value: string, nextStep?: number) => void;
}

export default function ImageGridStep({ step, onAnswer }: ImageGridStepProps) {
  return (
    <div className="animate-slide-left w-full max-w-3xl mx-auto px-4 py-10">
      {/* Question */}
      {step.question && (
        <h1
          className="text-[1.6rem] font-bold text-[#1A1A1A] text-center mb-8 leading-snug"
          style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
        >
          {step.question}
        </h1>
      )}

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4">
        {step.options?.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onAnswer(step.id, opt.id, opt.nextStep)}
            className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#F5A623] hover:shadow-sm active:scale-[0.97] transition-all duration-150 text-left"
          >
            {/* Image area */}
            <div className="relative w-full aspect-[3/4] bg-gray-100">
              {opt.image ? (
                <img
                  src={opt.image}
                  alt={opt.imageAlt ?? opt.label}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                /* Placeholder when image not yet added */
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
                  👤
                </div>
              )}
            </div>

            {/* Label + arrow */}
            <div className="flex items-center justify-between px-4 py-3">
              <span className="font-semibold text-[#1A1A1A] text-sm">{opt.label}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="text-gray-400 group-hover:text-[#F5A623] transition-colors duration-150 flex-shrink-0"
              >
                <path
                  d="M6 13.5L11 9L6 4.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
