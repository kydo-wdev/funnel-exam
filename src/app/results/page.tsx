'use client';

import { useRouter } from 'next/navigation';
import ResultsCalculatingStep from '@/components/quiz/steps/ResultsCalculatingStep';

export default function ResultsPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/email');
  };

  return <ResultsCalculatingStep onContinue={handleComplete} />;
}
