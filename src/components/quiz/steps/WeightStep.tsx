'use client';

import { useState } from 'react';

interface WeightStepProps {
  question: string;
  subtitle?: string;
  defaultValue?: number;
  onAnswer: (value: string) => void;
}

type Unit = 'lbs' | 'kg';

export default function WeightStep({ question, subtitle, defaultValue, onAnswer }: WeightStepProps) {
  const [unit, setUnit] = useState<Unit>('lbs');
  const [value, setValue] = useState(defaultValue ? String(defaultValue) : '');
  const [error, setError] = useState('');

  const handleContinue = () => {
    setError('');
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
      setError('Please enter a valid weight.');
      return;
    }
    if (unit === 'lbs' && (num < 44 || num > 660)) {
      setError('Please enter a weight between 44 and 660 lbs.');
      return;
    }
    if (unit === 'kg' && (num < 20 || num > 300)) {
      setError('Please enter a weight between 20 and 300 kg.');
      return;
    }
    onAnswer(`${num}${unit}`);
  };

  const handleUnitChange = (u: Unit) => {
    if (u === unit) return;
    setUnit(u);
    setError('');
    // Convert value when switching units
    const num = parseFloat(value);
    if (!isNaN(num) && num > 0) {
      if (u === 'kg') setValue(String(Math.round(num / 2.205)));
      else setValue(String(Math.round(num * 2.205)));
    }
  };

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

      {/* Single input with unit suffix */}
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          placeholder="0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full text-center text-3xl font-bold text-[#1A1A1A] bg-white border border-gray-200 rounded-2xl py-5 pr-16 focus:outline-none focus:border-[#F5A623] transition-colors duration-150"
        />
        {/* Unit toggle inside input — right side */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
          {(['lbs', 'kg'] as Unit[]).map((u) => (
            <button
              key={u}
              onClick={() => handleUnitChange(u)}
              className={`text-xs font-bold leading-none py-0.5 transition-colors ${
                unit === u ? 'text-[#1A1A1A]' : 'text-[#D1D5DB] hover:text-[#9CA3AF]'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

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
