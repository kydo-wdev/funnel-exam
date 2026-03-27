export type Gender = 'male' | 'female';

export type AgeRange = '18-25' | '26-35' | '36-45' | '46+';

export type StressLevel = 'always' | 'pretty-often' | 'sometimes' | 'rarely' | 'never';

/** All collected quiz answers keyed by step ID */
export interface QuizAnswers {
  age?: AgeRange;
  gender?: Gender;
  stress?: StressLevel;
  [key: string]: string | undefined;
}

/** Persisted state stored in localStorage */
export interface PersistedQuizState {
  stepIndex: number;
  answers: QuizAnswers;
  savedAt: number; // Unix ms timestamp
}

/** Offer persistence stored after reaching offer page */
export interface OfferState {
  offerSeen: boolean;
  savedAt: number; // Unix ms — expires after 12h
}
