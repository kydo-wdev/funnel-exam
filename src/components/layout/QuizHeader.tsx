'use client';

import Link from 'next/link';
import CortisolLogo from '@/components/ui/CortisolLogo';

interface QuizHeaderProps {
  onBack?: () => void;
  showBack?: boolean;
  currentStep: number;
  totalSteps: number;
  progressPercent: number;
}

export default function QuizHeader({
  onBack,
  showBack = true,
  currentStep,
  totalSteps,
  progressPercent,
}: QuizHeaderProps) {
  return (
    <header className="w-full bg-white sticky top-0 z-50">
      {/* Progress bar — thin line at the very top */}
      <div className="w-full h-[3px] bg-gray-100">
        <div
          className="h-full bg-[#F5A623] transition-all duration-400 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Header row */}
      <div className="relative flex items-center justify-center h-16 px-4">
        {/* Back button — absolute left */}
        {showBack && (
          <button
            onClick={onBack}
            aria-label="Go back"
            className="absolute left-4 w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 active:scale-95 transition-all duration-150"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 14L6 9L11 4"
                stroke="#1A1A1A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* Centered logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <CortisolLogo size={36} />
          <span
            className="text-[#1A1A1A] font-black text-xs tracking-widest uppercase leading-tight"
            style={{ fontFamily: 'Poppins, system-ui, sans-serif', letterSpacing: '0.12em' }}
          >
            CORTISOL<br />CHALLENGE
          </span>
        </Link>

        {/* Step counter — absolute right */}
        <span className="absolute right-4 text-sm font-semibold text-[#6B7280]">
          {currentStep}/{totalSteps}
        </span>
      </div>
    </header>
  );
}
