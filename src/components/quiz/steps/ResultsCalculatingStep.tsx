'use client';

import { useEffect, useState } from 'react';

interface ResultsCalculatingStepProps {
  onContinue: () => void;
}

interface Testimonial {
  name: string;
  avatar: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Lucy T.',
    avatar: '👩‍🦰',
    text: 'Cortisol Challenge is worth it. Straight forward, clean eating meal plans and shopping lists. Blood results confirm I\'m doing better',
    rating: 5,
  },
  {
    name: 'Samuel M.',
    avatar: '👨',
    text: 'My biggest issue was my sugar addiction. I tried PB for the sugar challenge and I\'m on day after a few weeks I\'m already 10s down and going in for more',
    rating: 5,
  },
  {
    name: 'Emily S.',
    avatar: '👩‍💼',
    text: 'Lots of options to customize recipes, foods you love/don\'t like, time to prepare, complexity, health concerns, so much more! Just about everything is perfect',
    rating: 5,
  },
  {
    name: 'Benjamin A.',
    avatar: '👨‍💻',
    text: 'This is the best app on meal planning that will save so much time. It was always a headache for the every week. This is very simplified. Thankyou! I recommend',
    rating: 5,
  },
  {
    name: 'Caroline N.',
    avatar: '👩‍🎓',
    text: 'I\'ve been using Cortisol Challenge for many years. I was really overweight and now I\'m back to 130LBS! It\'s wonderful, thank you 💪💪💪💪💪',
    rating: 5,
  },
  {
    name: 'Nicholas H.',
    avatar: '👨‍🏫',
    text: 'Honestly idk where id be if not for this. I quite literally lost over 40 lbs and I\'ve never been this active! I ❤️ this thinng',
    rating: 5,
  },
  {
    name: 'Megan W.',
    avatar: '👩‍⚕️',
    text: 'Couldn\'t do the exercises in the app due to my poor joints (too many years playing tennis) but the food is really good and I already notice my double chin becoming one again',
    rating: 5,
  },
  {
    name: 'Laura G.',
    avatar: '👩‍🍳',
    text: 'I rarely cook, but living alone was hell for my health. They actually teach you step-by-step no bs. Very good to lose weight.',
    rating: 5,
  },
  {
    name: 'Andrew T.',
    avatar: '👨‍🎨',
    text: 'Finally an app that the exercises aren\'t super thing and the meals aren\'t just boiled broccoli 🥦 so much',
    rating: 5,
  },
  {
    name: 'Anthony W.',
    avatar: '👨💪',
    text: 'I\'m a student at uni. PB helps me meal plan once a week before the student trip to the market and I\'m so much more thinner. I\'m so thankful for this.',
    rating: 5,
  },
  {
    name: 'Matthew H.',
    avatar: '👨‍🔧',
    text: 'Thank you for the variety. even though it does everything else too.',
    rating: 5,
  },
];

export default function ResultsCalculatingStep({ onContinue }: ResultsCalculatingStepProps) {
  const [percentage, setPercentage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Animate progress bar from 0 to 100 over 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setCompleted(true);
          return 100;
        }
        return prev + Math.random() * 25; // Random increment
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Auto-rotate testimonials every 3 seconds
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(testimonialInterval);
  }, []);

  // Auto-continue when completed
  useEffect(() => {
    if (completed) {
      const timeout = setTimeout(() => {
        onContinue();
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [completed, onContinue]);

  const visibleTestimonials = [
    testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length],
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
  ];

  const circumference = 2 * Math.PI * 45; // 45 is the radius
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#FACC15] to-[#F5A623] flex flex-col items-center justify-center py-10 px-4">
      {/* Progress Circle */}
      <div className="flex flex-col items-center gap-4 mb-12">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 120 120" className="w-full h-full">
            {/* Background circle */}
            <circle cx="60" cy="60" r="45" fill="none" stroke="#FFE8A0" strokeWidth="8" />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="white"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            />
          </svg>

          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-extrabold text-[#1A1A1A]">{Math.round(percentage)}%</span>
          </div>
        </div>

        <p className="text-lg font-semibold text-[#1A1A1A]">
          {completed ? 'Complete!' : 'Calculating your results'}
        </p>
      </div>

      {/* Testimonials Carousel */}
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-[#1A1A1A] text-center mb-8">What our users are saying</h2>

        <div className="flex items-center justify-center gap-4 perspective">
          {/* Left card (fading out) */}
          <div className="w-48 opacity-30 transform scale-90 transition-all duration-500">
            <div className="bg-white rounded-2xl p-5 shadow-lg h-full flex flex-col">
              <p className="text-sm text-gray-600 mb-3 flex-1">{visibleTestimonials[0].text.substring(0, 60)}...</p>
              <div className="text-lg mb-2">{visibleTestimonials[0].avatar}</div>
              <p className="font-bold text-sm text-[#1A1A1A]">{visibleTestimonials[0].name}</p>
              <div className="flex gap-1 text-xs mt-2">{'⭐'.repeat(visibleTestimonials[0].rating)}</div>
            </div>
          </div>

          {/* Center card (main) */}
          <div className="w-64 transform transition-all duration-500 scale-100">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <p className="text-sm text-gray-700 mb-4 font-medium">{visibleTestimonials[1].text}</p>
              <div className="flex items-center gap-3">
                <div className="text-3xl">{visibleTestimonials[1].avatar}</div>
                <div>
                  <p className="font-bold text-[#1A1A1A]">{visibleTestimonials[1].name}</p>
                  <div className="flex gap-0.5 text-sm">{'⭐'.repeat(visibleTestimonials[1].rating)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right card (fading in) */}
          <div className="w-48 opacity-30 transform scale-90 transition-all duration-500">
            <div className="bg-white rounded-2xl p-5 shadow-lg h-full flex flex-col">
              <p className="text-sm text-gray-600 mb-3 flex-1">{visibleTestimonials[2].text.substring(0, 60)}...</p>
              <div className="text-lg mb-2">{visibleTestimonials[2].avatar}</div>
              <p className="font-bold text-sm text-[#1A1A1A]">{visibleTestimonials[2].name}</p>
              <div className="flex gap-1 text-xs mt-2">{'⭐'.repeat(visibleTestimonials[2].rating)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
