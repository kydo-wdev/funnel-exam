'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';

export default function EmailPage() {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!email || !agreed) return;

    setLoading(true);
    try {
      // Store email in localStorage or send to API
      localStorage.setItem('cc_email', email);
      // Here you would typically send to backend or email service
      // For now, just redirect to offer/thank you page
      window.location.href = '/offer';
    } catch (error) {
      console.error('Error submitting email:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F0F4F8] to-[#E8EFF8]">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-2 leading-tight">
              Enter your email to see how you can reach{' '}
              <span className="text-[#E6B800] font-extrabold">100 lbs</span>
            </h1>
            <p className="text-lg text-[#6B7280]">with Cortisol Detox</p>
          </div>

          {/* Email Form */}
          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Your email
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-5 h-5 cursor-pointer accent-[#F5A623]"
              />
              <label htmlFor="agree" className="text-sm text-[#4B5563] cursor-pointer">
                I agree to the{' '}
                <a href="/privacy" className="text-[#1A1A1A] underline font-semibold hover:text-[#F5A623]">
                  Privacy policy
                </a>{' '}
                and receiving future information from Cortisol Challenge
              </label>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={!email || !agreed || loading}
              className="w-full bg-[#C4C7CE] hover:bg-[#B0B3BA] disabled:bg-[#C4C7CE] disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Continue'}
            </button>
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex gap-3">
              <div className="text-xl">🔒</div>
              <div className="text-sm text-[#6B7280]">
                <p className="font-semibold text-[#4B5563] mb-1">
                  We respect your privacy and use your email only to send you the
                </p>
                <p>
                  <a href="#" className="text-[#1A1A1A] underline font-semibold hover:text-[#F5A623]">
                    Cortisol Challenge
                  </a>{' '}
                  program and other important emails. You won't receive spam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
