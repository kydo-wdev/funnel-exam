'use client';

import { useState } from 'react';

interface HeightStepProps {
  question: string;
  subtitle?: string;
  onAnswer: (value: string) => void;
}

type Unit = 'ft' | 'cm';

export default function HeightStep({ question, subtitle, onAnswer }: HeightStepProps) {
  const [unit, setUnit] = useState<Unit>('ft');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [cm, setCm] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    setError('');
    if (unit === 'ft') {
      const f = parseInt(feet || '0', 10);
      const i = parseInt(inches || '0', 10);
      if (f < 1 || f > 8) { setError('Please enter a valid height in feet (1–8).'); return; }
      if (i < 0 || i > 11) { setError('Inches must be between 0 and 11.'); return; }
      onAnswer(`${f}ft ${i}in`);
    } else {
      const c = parseInt(cm || '0', 10);
      if (c < 50 || c > 250) { setError('Please enter a valid height in cm (50–250).'); return; }
      onAnswer(`${c}cm`);
    }
  };

  const inputClass =
    'w-full text-center text-2xl font-bold text-[#1A1A1A] bg-white border border-gray-200 rounded-2xl py-4 focus:outline-none focus:border-[#F5A623] transition-colors duration-150';

  return (
    <div className="animate-slide-left w-full max-w-xl mx-auto px-4 py-10 flex flex-col gap-6">
      {/* Question */}
      <div className="text-center">
        <h1
          className="text-[1.5rem] font-bold text-[#1A1A1A] leading-snug mb-1"
          style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
        >
          {question}
        </h1>
        {subtitle && <p className="text-sm text-[#6B7280]">{subtitle}</p>}
      </div>

      {/* Unit toggle */}
      <div className="flex mx-auto bg-white border border-gray-200 rounded-full p-1 gap-1">
        {(['ft', 'cm'] as Unit[]).map((u) => (
          <button
            key={u}
            onClick={() => { setUnit(u); setError(''); }}
            className={`px-8 py-2 rounded-full text-sm font-bold transition-all duration-150 ${
              unit === u
                ? 'bg-[#1A1A1A] text-white'
                : 'text-[#6B7280] hover:text-[#1A1A1A]'
            }`}
          >
            {u}
          </button>
        ))}
      </div>

      {/* Inputs */}
      {unit === 'ft' ? (
        <div className="flex gap-3">
          {/* Feet */}
          <div className="flex-1 relative">
            <input
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={feet}
              onChange={(e) => setFeet(e.target.value)}
              className={inputClass}
              min={1}
              max={8}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#9CA3AF] font-medium pointer-events-none">
              ft
            </span>
          </div>
          {/* Inches */}
          <div className="flex-1 relative">
            <input
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={inches}
              onChange={(e) => setInches(e.target.value)}
              className={inputClass}
              min={0}
              max={11}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#9CA3AF] font-medium pointer-events-none">
              in
            </span>
          </div>
        </div>
      ) : (
        <div className="relative">
          <input
            type="number"
            inputMode="numeric"
            placeholder="0"
            value={cm}
            onChange={(e) => setCm(e.target.value)}
            className={inputClass}
            min={50}
            max={250}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#9CA3AF] font-medium pointer-events-none">
            cm
          </span>
        </div>
      )}

      {/* Error */}
      {error && <p className="text-sm text-red-500 text-center -mt-2">{error}</p>}

      {/* Continue */}
      <button
        onClick={handleContinue}
        className="w-full bg-[#1A1A1A] hover:bg-[#333333] active:scale-[0.98] text-white font-bold text-base py-4 rounded-2xl transition-all duration-150"
      >
        Continue
      </button>
    </div>
  );
}
