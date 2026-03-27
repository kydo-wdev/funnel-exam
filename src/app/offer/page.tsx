'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function OfferPage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/age-selection');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="inline-block bg-[#FEF3C7] text-[#92400E] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          Limited Time Offer
        </div>
        <h1
          className="text-4xl font-black text-[#1A1A1A] mb-4"
          style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
        >
          Get 61% Off Your Plan
        </h1>
        <p className="text-[#6B7280] text-lg max-w-md mb-10">
          Start your personalized cortisol reset program today at our best price.
        </p>
        <button
          onClick={handleStart}
          className="bg-[#F5A623] hover:bg-[#E09420] text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
        >
          Get My 61% Discount →
        </button>
      </main>
      <Footer />
    </div>
  );
}
