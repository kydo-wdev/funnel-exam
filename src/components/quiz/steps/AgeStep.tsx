'use client';

import { useState } from 'react';

interface AgeStepProps {
  question: string;
  onAnswer: (value: string) => void;
}

export default function AgeStep({ question, onAnswer }: AgeStepProps) {
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    setError('');
    const value = parseInt(age || '0', 10);
    if (value < 18 || value > 99) {
      setError('Please enter a valid age (18-99).');
      return;
    }
    onAnswer(String(value));
  };

  return (
    <div className="animate-slide-left w-full max-w-xl mx-auto px-4 py-10 flex flex-col gap-6">
      <h1
        className="text-[1.6rem] font-bold text-[#1A1A1A] text-center mb-2 leading-snug"
        style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
      >
        {question}
      </h1>

      <input
        type="number"
        inputMode="numeric"
        placeholder="0"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="w-full max-w-[220px] mx-auto text-center text-4xl font-bold text-[#6B7280] bg-white border border-gray-300 rounded-md py-2 focus:outline-none focus:border-[#F5A623] transition-colors duration-150"
        min={18}
        max={99}
      />

      {error && <p className="text-sm text-red-500 text-center -mt-2">{error}</p>}

      <button
        onClick={handleContinue}
        className="w-full max-w-[260px] mx-auto bg-[#111111] hover:bg-[#2A2A2A] active:scale-[0.98] text-white font-semibold text-sm py-3 rounded-md transition-all duration-150"
      >
        Continue
      </button>
    </div>
  );
}
