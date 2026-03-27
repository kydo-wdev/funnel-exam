'use client';

import { useRouter } from 'next/navigation';
import QuizHeader from '@/components/layout/QuizHeader';
import QuizEngine from '@/components/quiz/QuizEngine';
import { useQuiz } from '@/hooks/useQuiz';

export default function QuizPage() {
  const router = useRouter();
  const { currentStep, answers, isReady, displayStep, totalSteps, progressPercent, answer, goBack, goNext, isLastStep } =
    useQuiz();

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB]">
        <div className="w-8 h-8 border-4 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleAnswer = (stepId: string, value: string, nextStep?: number) => {
    if (isLastStep) {
      router.push('/results');
      return;
    }
    answer(stepId, value, nextStep);
  };

  const handleContinue = (value?: string | Event) => {
    if (typeof value === 'string') {
      if (isLastStep) {
        router.push('/results');
      } else {
        answer(currentStep.id, value);
      }
      return;
    }

    if (isLastStep) {
      router.push('/results');
    } else {
      goNext();
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <QuizHeader
        onBack={goBack}
        showBack={displayStep > 1}
        currentStep={displayStep}
        totalSteps={totalSteps}
        progressPercent={progressPercent}
      />

      <div className="flex-1 flex flex-col justify-start pt-4 pb-10">
        <QuizEngine
          step={currentStep}
          answers={answers}
          onAnswer={handleAnswer}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
}
