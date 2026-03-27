'use client';

import { useEffect, useState } from 'react';
import type { QuizAnswers } from '@/hooks/useQuiz';

interface PersonaCardStepProps {
  step: {
    title?: string;
    body?: string;
    image?: string;
    imageAlt?: string;
    showGauge?: boolean;
  };
  answers: QuizAnswers;
  onContinue: () => void;
}

function getAgeBucket(ageValue?: string) {
  const age = Number(ageValue || 0);
  if (!age || Number.isNaN(age)) return 'in your age';
  if (age < 30) return 'in your 20s';
  if (age < 40) return 'in your 30s';
  if (age < 50) return 'in your 40s';
  return '50+';
}

export default function PersonaCardStep({ step, answers, onContinue }: PersonaCardStepProps) {
  const gender = answers.gender === 'female' ? 'female' : 'male';
  const ageBucket = getAgeBucket(answers.age);
  const title = step.title ?? 'Your personal summary';
  const body = step.body ?? `${gender === 'female' ? 'Women' : 'Men'} ${ageBucket}, this plan is tailored to reduce stress-driven weight retention and improve your energy & sleep.`;
  const image = step.image;
  const imageAlt = step.imageAlt;
  const showGauge = step.showGauge ?? false;

  const stress = answers.stress;
  const sleep = answers.sleep;

  const cortisolScore =
    (stress === 'always' ? 3 : stress === 'pretty-often' ? 2 : stress === 'sometimes' ? 1 : 0) +
    (sleep === 'lt-5h' ? 2 : sleep === '5-6h' ? 1 : 0);

  const cortisolLevel =
    cortisolScore >= 4 ? 'Elevated' : cortisolScore >= 2 ? 'Borderline' : 'Balanced';

  const gaugeValue = Math.min(1, Math.max(0, cortisolScore / 5));
  const targetAngle = -90 + gaugeValue * 180;

  const [needleAngle, setNeedleAngle] = useState(-90);

  useEffect(() => {
    const timeout = setTimeout(() => setNeedleAngle(targetAngle), 200);
    return () => clearTimeout(timeout);
  }, [targetAngle]);

  return (
    <div className="animate-slide-left w-full max-w-xl mx-auto px-4 py-8 flex flex-col gap-5">
      <h1
        className="text-[1.6rem] font-bold text-[#1A1A1A] text-center mb-2 leading-snug"
        style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
      >
        {title}
      </h1>

      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        {showGauge ? (
          <>
            <p className="text-sm text-gray-500 mb-2 text-center">Your Cortisol Levels</p>
            <h2 className="text-3xl font-extrabold text-[#CA3A59] text-center leading-tight">{cortisolLevel}</h2>

            <div className="mt-4 flex justify-center">
              <div className="relative w-full max-w-[280px] h-[170px]">
                <svg viewBox="0 0 280 170" className="w-full h-full">
                  <defs>
                    <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#34D399" />
                      <stop offset="50%" stopColor="#FACC15" />
                      <stop offset="100%" stopColor="#F97316" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M20 130 A110 110 0 0 1 260 130"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="14"
                  />
                  <path
                    d="M20 130 A110 110 0 0 1 260 130"
                    fill="none"
                    stroke="url(#gaugeGrad)"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />

                  <g
                    transform={`translate(140 130) rotate(${needleAngle})`}
                    style={{ transition: 'transform 0.8s ease-out' }}
                  >
                    <line x1="0" y1="0" x2="0" y2="-95" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="0" cy="0" r="7" fill="#111827" />
                  </g>

                  <circle cx="140" cy="130" r="108" fill="none" stroke="#ffffff" strokeWidth="8" />
                </svg>

                <div className="absolute left-0 right-0 top-[130px] flex justify-between px-2 text-xs text-gray-500">
                  <span>Low</span>
                  <span>Med</span>
                  <span>High</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <span>Low</span>
              <span>Med</span>
              <span>High</span>
            </div>

            <p className="mt-4 text-[13px] text-[#4B5563] text-center">{body}</p>
          </>
        ) : (
          <div className="mt-2">
            {image && (
              <img
                src={image}
                alt={imageAlt ?? 'Result image'}
                className="mx-auto rounded-xl max-h-40 object-cover mb-4"
              />
            )}
            <p className="text-[13px] text-[#4B5563] text-center">{body}</p>
          </div>
        )}
      </div>

      <button
        onClick={() => onContinue()}
        className="w-full bg-[#111111] hover:bg-[#2A2A2A] active:scale-[0.98] text-white font-bold text-base py-4 rounded-2xl transition-all duration-150"
      >
        Continue
      </button>
    </div>
  );
}
