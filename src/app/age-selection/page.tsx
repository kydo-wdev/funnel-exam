'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface AgeRange {
  id: string;
  label: string;
  emoji: string;
}

const ageRanges: AgeRange[] = [
  { id: '18-25', label: '18-25', emoji: '⚡' },
  { id: '26-35', label: '26-35', emoji: '🌀' },
  { id: '36-45', label: '36-45', emoji: '💪' },
  { id: '46+', label: '46+', emoji: '🌟' },
];

export default function AgeSelectionPage() {
  const router = useRouter();

  const handleSelectAge = (ageRange: string) => {
    // Route to quiz and start the flow
    router.push('/quiz');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#FAF3E8] to-[#F5F0E8]">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-black text-[#1A1A1A] mb-3"
            style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
          >
            Cortisol Challenge
          </h1>
          <p className="text-xl text-[#6B7280]">According to your age</p>
        </div>

        <div className="w-full max-w-2xl space-y-4">
          {ageRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => handleSelectAge(range.id)}
              className="w-full flex items-center justify-between bg-white hover:bg-[#FAFAFA] border border-gray-200 rounded-2xl p-5 transition-all duration-200 hover:shadow-md active:scale-95"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{range.emoji}</span>
                <span className="text-lg font-semibold text-[#1A1A1A]">{range.label}</span>
              </div>
              <span className="text-2xl text-[#D1D5DB]">→</span>
            </button>
          ))}
        </div>

        <p className="text-sm text-[#9CA3AF] text-center mt-12 max-w-md">
          We customize your plan based on your age group to maximize results.
        </p>
      </main>
      <Footer />
    </div>
  );
}
