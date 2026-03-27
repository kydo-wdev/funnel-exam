'use client';

import ChoiceStep from '@/components/quiz/steps/ChoiceStep';
import MultiChoiceStep from '@/components/quiz/steps/MultiChoiceStep';
import InfoStep from '@/components/quiz/steps/InfoStep';
import ImageGridStep from '@/components/quiz/steps/ImageGridStep';
import BodyAreasStep from '@/components/quiz/steps/BodyAreasStep';
import ChartStep from '@/components/quiz/steps/ChartStep';
import HeightStep from '@/components/quiz/steps/HeightStep';
import WeightStep from '@/components/quiz/steps/WeightStep';
import AgeStep from '@/components/quiz/steps/AgeStep';
import PersonaCardStep from '@/components/quiz/steps/PersonaCardStep';
import ResultsStep from '@/components/quiz/steps/ResultsStep';
import type { QuizStep } from '@/lib/config/quizConfig';
import type { QuizAnswers } from '@/hooks/useQuiz';

interface QuizEngineProps {
  step: QuizStep;
  answers: QuizAnswers;
  onAnswer: (stepId: string, value: string, nextStep?: number) => void;
  onContinue: (value?: string) => void;
}

export default function QuizEngine({ step, answers, onAnswer, onContinue }: QuizEngineProps) {
  switch (step.type) {
    case 'choice':
      return <ChoiceStep step={step} onAnswer={onAnswer} />;

    case 'multi-choice':
      return (
        <MultiChoiceStep
          step={step}
          initialValue={answers[step.id]}
          onContinue={(value) => onContinue(value)}
        />
      );

    case 'info':
      return <InfoStep step={step} onContinue={onContinue} />;

    case 'image-grid':
      return <ImageGridStep step={step} onAnswer={onAnswer} />;

    case 'body-areas':
      return (
        <BodyAreasStep
          step={step}
          onContinue={onContinue}
        />
      );

    case 'chart':
      return (
        <ChartStep
          title={step.title ?? ''}
          body={step.body}
          onContinue={onContinue}
        />
      );

    case 'height':
      return (
        <HeightStep
          question={step.question ?? 'What is your height?'}
          subtitle={step.subtitle}
          onAnswer={(val) => { onAnswer(step.id, val); }}
        />
      );

    case 'weight':
      return (
        <WeightStep
          question={step.question ?? 'What is your weight?'}
          subtitle={step.subtitle}
          onAnswer={(val) => { onAnswer(step.id, val); }}
        />
      );

    case 'age':
      return (
        <AgeStep
          question={step.question ?? 'What is your age?'}
          onAnswer={(val) => { onAnswer(step.id, val); }}
        />
      );

    case 'persona-card':
      return <PersonaCardStep step={step} answers={answers} onContinue={onContinue} />;

    case 'results':
      return <ResultsStep answers={answers} onContinue={onContinue} />;

    default:
      return null;
  }
}
