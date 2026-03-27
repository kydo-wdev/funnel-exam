'use client';

import { useState, useEffect, useCallback } from 'react';
import { quizSteps, TOTAL_STEPS } from '@/lib/config/quizConfig';

export type QuizAnswers = Record<string, string>;

const STORAGE_KEY = 'cc_quiz_state_v2';
const EXPIRY_MS = 3 * 60 * 1000; // 3 minutes

interface PersistedState {
  stepIndex: number;
  answers: QuizAnswers;
  savedAt: number;
}

export function useQuiz() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isReady, setIsReady] = useState(false);

  // Restore from localStorage on mount (within 3-min window)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: PersistedState = JSON.parse(raw);
        const expired = Date.now() - parsed.savedAt > EXPIRY_MS;
        if (!expired && parsed.stepIndex < quizSteps.length) {
          setStepIndex(parsed.stepIndex);
          setAnswers(parsed.answers);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      // ignore
    }
    setIsReady(true);
  }, []);

  // Persist on every change
  useEffect(() => {
    if (!isReady) return;
    const state: PersistedState = { stepIndex, answers, savedAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [stepIndex, answers, isReady]);

  const currentStep = quizSteps[stepIndex];
  const isLastStep = stepIndex >= quizSteps.length - 1;
  const progressPercent = Math.round(((stepIndex + 1) / TOTAL_STEPS) * 100);
  const displayStep = stepIndex + 1; // 1-based for UI

  const answer = useCallback(
    (stepId: string, value: string, nextStepOverride?: number) => {
      setAnswers((prev) => ({ ...prev, [stepId]: value }));
      if (nextStepOverride !== undefined) {
        setStepIndex(nextStepOverride);
      } else if (!isLastStep) {
        setStepIndex((i) => i + 1);
      }
    },
    [isLastStep]
  );

  const goBack = useCallback(() => {
    setStepIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    if (!isLastStep) setStepIndex((i) => i + 1);
  }, [isLastStep]);

  return {
    stepIndex,
    currentStep,
    answers,
    isReady,
    isLastStep,
    progressPercent,
    displayStep,
    totalSteps: TOTAL_STEPS,
    answer,
    goBack,
    goNext,
  };
}
