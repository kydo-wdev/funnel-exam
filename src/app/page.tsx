'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OptionCard from '@/components/ui/OptionCard';

const AGE_OPTIONS = [
  { id: '18-25', label: '18–25', emoji: '🍳' },
  { id: '26-35', label: '26–35', emoji: '🥘' },
  { id: '36-45', label: '36–45', emoji: '🍲' },
  { id: '46+',   label: '46+',   emoji: '🥗' },
];

export default function HomePage() {
  const router = useRouter();

  const handleAgeSelect = (ageId: string) => {
    try {
      localStorage.setItem('cc_age', ageId);
    } catch { /* ignore */ }
    router.push('/quiz');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF0E4' }}>
      {/* Age-select page uses the standard marketing Header (no back/counter) */}
      <Header />

      <main className="flex-1 flex flex-col items-center px-4 py-14">
        <h1
          className="text-5xl sm:text-6xl font-black text-[#1A1A1A] text-center mb-3 leading-tight"
          style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
        >
          Cortisol Challenge
        </h1>

        <p className="text-[#6B7280] text-lg font-medium text-center mb-10">
          According to your age
        </p>

        <div className="w-full max-w-lg flex flex-col gap-3">
          {AGE_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.id}
              emoji={opt.emoji}
              label={opt.label}
              onClick={() => handleAgeSelect(opt.id)}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
