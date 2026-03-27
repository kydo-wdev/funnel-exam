'use client';

import type { QuizStep } from '@/lib/config/quizConfig';

interface InfoStepProps {
  step: QuizStep;
  onContinue: () => void;
}

export default function InfoStep({ step, onContinue }: InfoStepProps) {
  return (
    <div className="animate-slide-left w-full max-w-xl mx-auto px-4 py-6 flex flex-col gap-4">
      {/* Card */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        {/* Image */}
        {step.image && (
          <div className="w-full aspect-[16/9] bg-gray-100">
            <img
              src={step.image}
              alt={step.imageAlt ?? ''}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Avoid runtime crash when placeholder assets are missing.
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Text content */}
        <div className="p-5">
          {step.title && (
            <h2
              className="text-lg font-bold text-[#1A1A1A] mb-3 leading-snug"
              style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
            >
              {step.title}
            </h2>
          )}

          {step.body && (
            <p className="text-sm text-[#374151] leading-relaxed mb-4">{step.body}</p>
          )}

          {step.bullets && step.bullets.length > 0 && (
            <ul className="space-y-2.5">
              {step.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#374151] leading-relaxed">
                  <span className="mt-0.5 text-[#F5A623] flex-shrink-0">•</span>
                  <span>
                    <strong className="text-[#1A1A1A]">{b.bold}</strong>
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Continue button */}
      <button
        onClick={() => onContinue()}
        className="w-full bg-[#1A1A1A] hover:bg-[#333333] active:scale-[0.98] text-white font-bold text-base py-4 rounded-2xl transition-all duration-150"
      >
        Continue
      </button>
    </div>
  );
}
