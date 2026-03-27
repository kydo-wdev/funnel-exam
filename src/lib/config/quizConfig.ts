export type StepType =
  | 'choice'
  | 'multi-choice'
  | 'info'
  | 'image-grid'
  | 'body-areas'
  | 'chart'
  | 'height'
  | 'weight'
  | 'age'
  | 'persona-card'
  | 'results';

export interface QuizOption {
  id: string;
  label: string;
  emoji?: string;
  image?: string;
  imageAlt?: string;
  nextStep?: number;
  category?: string;
}

export interface BodyAreaTag {
  id: string;
  label: string;
  top: string;
  left: string;
  side: 'left' | 'right';
}

export interface QuizStep {
  id: string;
  type: StepType;
  // choice / image-grid
  question?: string;
  subtitle?: string;
  options?: QuizOption[];
  autoAdvance?: boolean;
  // info
  image?: string;
  imageAlt?: string;
  title?: string;
  body?: string;
  bullets?: { bold: string; text: string }[];
  showGauge?: boolean;
  // body-areas
  bodyImage?: string;
  bodyImageAlt?: string;
  areas?: BodyAreaTag[];
  // height/weight — no extra fields needed (question/subtitle reused)
}

export const quizSteps: QuizStep[] = [
  // 1 — Gender
  {
    id: 'gender',
    type: 'choice',
    question: "What's your gender?",
    autoAdvance: true,
    options: [
      { id: 'male',   label: 'Male',   emoji: '🤠' },
      { id: 'female', label: 'Female', emoji: '👩' },
    ],
  },

  // 2 — Stress frequency
  {
    id: 'stress',
    type: 'choice',
    question: 'How often do you feel stressed?',
    autoAdvance: true,
    options: [
      { id: 'always',       label: 'Always',      emoji: '😤' },
      { id: 'pretty-often', label: 'Pretty often', emoji: '😟' },
      { id: 'sometimes',    label: 'Sometimes',    emoji: '😐' },
      { id: 'rarely',       label: 'Rarely',       emoji: '🙂' },
      { id: 'never',        label: 'Never',        emoji: '😌' },
    ],
  },

  // 3 — Info: stress hormones
  {
    id: 'info-stress-hormones',
    type: 'info',
    image: '/assets/stressed-man.jpg',
    imageAlt: 'Stressed man sitting at a desk with his hands on his face',
    title: 'The impact of stress hormones on your body:',
    body: "Cortisol plays a big role in your body's response to stress and affects your ability to manage weight. Here are a few ways high cortisol can throw you off balance:",
    bullets: [
      { bold: 'Persistent Belly Fat:', text: " It feels like no matter what you do, that belly fat just won't budge." },
      { bold: 'Aches and Pains:', text: ' You may experience increased tension and chronic discomfort.' },
      { bold: 'Anxiety and Edginess:', text: ' A feeling of being permanently stressed can become the norm.' },
      { bold: 'Constant Exhaustion:', text: " You're always tired, even if you've had a full night's sleep." },
    ],
  },

  // 4 — Stress signs (multi-select)
  {
    id: 'stress-signs',
    type: 'multi-choice',
    question: 'What does stress look like for you?',
    options: [
      { id: 'overeating', label: 'Overeating', emoji: '🍔' },
      { id: 'anxious-thoughts', label: 'Anxious thoughts', emoji: '😿' },
      { id: 'sleep-issues', label: 'Sleep issues', emoji: '💤' },
      { id: 'physical-discomfort', label: 'Physical discomfort', emoji: '🫤' },
      { id: 'bad-mood', label: 'Bad mood', emoji: '😠' },
      { id: 'emotional-shopping', label: 'Emotional shopping', emoji: '🛍️' },
      { id: 'none', label: 'None of the above', emoji: '🚫' },
    ],
  },

  // 5 — Goal
  {
    id: 'goal',
    type: 'choice',
    question: 'What is your goal?',
    autoAdvance: true,
    options: [
      { id: 'lose-weight',       label: 'Lose weight',                    emoji: '⚖️' },
      { id: 'emotional-balance', label: 'Maintain healthy emotional balance', emoji: '🧘' },
      { id: 'get-fit',           label: 'Get fit',                        emoji: '🏃' },
      { id: 'tone-muscles',      label: 'Tone muscles',                   emoji: '💪' },
      { id: 'reduce-stress',     label: 'Reduce stress and anxiety',      emoji: '🌿' },
    ],
  },

  // 6 — Info: relax your body
  {
    id: 'info-relax',
    type: 'info',
    image: '/assets/meditating-man.jpg',
    imageAlt: 'Man meditating in a relaxed seated position',
    title: 'Relax your body and find peace of mind.',
    body: "Stress keeps your body on edge, making it hard to relax and recover. It drains your energy, disrupts your sleep patterns, and makes you less motivated to exercise. It also stimulates overeating and cravings. Cortisol Challenge simplifies stress management, transforming fatigue and irritation into energy, relief, and lasting weight loss.",
  },

  // 7 — Body type (image grid)
  {
    id: 'body-type',
    type: 'image-grid',
    question: 'Choose your body type',
    autoAdvance: true,
    options: [
      { id: 'skinny',  label: 'Skinny',  image: '/assets/body-skinny.jpg',  imageAlt: 'Skinny body type' },
      { id: 'regular', label: 'Regular', image: '/assets/body-regular.jpg', imageAlt: 'Regular body type' },
      { id: 'extra',   label: 'Extra',   image: '/assets/body-extra.jpg',   imageAlt: 'Extra body type' },
    ],
  },

  // 8 — Body areas (multi-select)
  {
    id: 'body-areas',
    type: 'body-areas',
    question: "Any areas you'd like to improve?",
    subtitle: "If you're happy with your appearance, then press Continue",
    bodyImage: '/assets/body-figure.png',
    bodyImageAlt: 'Full body figure',
    areas: [
      { id: 'chest',    label: 'Chest',    top: '32%', left: '18%', side: 'left' },
      { id: 'arms',     label: 'Arms',     top: '28%', left: '62%', side: 'right' },
      { id: 'abs',      label: 'Abs',      top: '46%', left: '62%', side: 'right' },
      { id: 'buttocks', label: 'Buttocks', top: '55%', left: '18%', side: 'left' },
      { id: 'legs',     label: 'Legs',     top: '65%', left: '62%', side: 'right' },
    ],
  },

  // 9 — Last time content with body weight
  {
    id: 'body-weight-content',
    type: 'choice',
    question: 'When was the last time you were content with your body weight?',
    autoAdvance: true,
    options: [
      { id: 'less-than-1y', label: 'Less than a year ago',  emoji: '📅' },
      { id: '1-3y',         label: '1 – 3 years ago',       emoji: '⏳' },
      { id: 'more-than-3y', label: 'More than 3 years ago', emoji: '🕰️' },
      { id: 'never',        label: 'Never',                 emoji: '🏆' },
    ],
  },

  // 10 — Chart: cortisol levels
  {
    id: 'info-chart',
    type: 'chart',
    title: 'Cortisol levels during a day with Cortisol Challenge vs without',
    body: 'Regulate cortisol with Cortisol Challenge for sustained weight loss, enhanced energy, decreased health risks, and improved mental function, ensuring balanced stress levels over time.',
  },

  // 11 — Exercise
  {
    id: 'exercise',
    type: 'choice',
    question: 'Do you enjoy exercising?',
    subtitle: 'A great way to quicken your results is by working out.',
    autoAdvance: true,
    options: [
      { id: 'no',              label: 'No',                       emoji: '🙅' },
      { id: 'no-stay-active',  label: 'No, but I try to stay active', emoji: '🚶' },
      { id: 'yes-occasionally', label: 'Yes, occasionally',       emoji: '😐' },
      { id: 'yes-regularly',   label: 'Yes, regularly',           emoji: '💪' },
    ],
  },

  // 12 — Height
  {
    id: 'height',
    type: 'height',
    question: 'What is your height?',
    subtitle: 'Height helps us calculate your BMI.',
  },

  // 13 — Current weight
  {
    id: 'current-weight',
    type: 'weight',
    question: 'What is your current weight?',
    subtitle: 'Weight helps us calculate your BMI.',
  },

  // 14 — Desired weight
  {
    id: 'desired-weight',
    type: 'weight',
    question: 'What is your desired weight?',
  },

  // 15 — Age
  {
    id: 'age',
    type: 'age',
    question: 'What is your age?',
  },

  // 16 — Personalized card with image
  {
    id: 'age-insight',
    type: 'persona-card',
    title: 'Maintain Peak Performance',
    body: 'Men in your 30s, prioritize: Adapting your fitness and diet to maintain a weight of 92lbs to 108lbs helps build enduring strength and stamina, crucial as professional and personal demands intensify.',
    image: '/assets/avatar-man.jpg',
    imageAlt: 'Male athlete',
    showGauge: false,
  },

  // 17 — Sleep
  {
    id: 'sleep',
    type: 'choice',
    question: 'How much do you usually sleep?',
    autoAdvance: true,
    options: [
      { id: 'lt-5h', label: 'Less than 5 hours', emoji: '😴' },
      { id: '5-6h', label: '5-6 hours', emoji: '🌙' },
      { id: '7-8h', label: '7-8 hours', emoji: '🛏️' },
      { id: 'gt-8h', label: 'More than 8 hours', emoji: '💤' },
    ],
  },

  // 18 — Water
  {
    id: 'water',
    type: 'choice',
    question: 'How much water do you drink daily?',
    subtitle: 'We mean clean water, excluding coffee, tea and other drinks',
    autoAdvance: true,
    options: [
      { id: 'coffee-only', label: 'Only coffee or tea', emoji: '☕' },
      { id: 'lt-16oz', label: 'Less than 16 oz', emoji: '💧' },
      { id: '16-48oz', label: '16 oz - 48 oz', emoji: '🥤' },
      { id: '56-80oz', label: '56 oz - 80 oz', emoji: '🚰' },
      { id: 'depends', label: "Don't count, it depends", emoji: '🧃' },
    ],
  },

  // 19 — Ingredients preferences (grouped)
  {
    id: 'ingredients',
    type: 'multi-choice',
    question: 'What ingredients should we add to your personalized meal plans?',
    options: [
      // Greens
      { id: 'tomato', label: 'Tomato', category: 'Greens' },
      { id: 'cucumber', label: 'Cucumber', category: 'Greens' },
      { id: 'bell-pepper', label: 'Bell pepper', category: 'Greens' },
      { id: 'onion', label: 'Onion', category: 'Greens' },
      { id: 'spinach', label: 'Spinach', category: 'Greens' },
      { id: 'mushrooms', label: 'Mushrooms', category: 'Greens' },
      { id: 'cocktail-tomatoes', label: 'Cocktail tomatoes', category: 'Greens' },
      { id: 'lettuce', label: 'Lettuce', category: 'Greens' },
      { id: 'zucchini', label: 'Zucchini', category: 'Greens' },
      { id: 'carrots', label: 'Carrots', category: 'Greens' },

      // Fiber & Grains
      { id: 'rice', label: 'Rice', category: 'Fiber & Grains' },
      { id: 'spaghetti', label: 'Spaghetti', category: 'Fiber & Grains' },
      { id: 'whole-grain-bread', label: 'Whole grain bread', category: 'Fiber & Grains' },
      { id: 'couscous', label: 'Couscous', category: 'Fiber & Grains' },
      { id: 'quick-cooking-oats', label: 'Quick-cooking oats', category: 'Fiber & Grains' },
      { id: 'quinoa', label: 'Quinoa', category: 'Fiber & Grains' },

      // Protein
      { id: 'eggs', label: 'Eggs', category: 'Protein' },
      { id: 'chicken-breast', label: 'Chicken breast', category: 'Protein' },
      { id: 'turkey-breast', label: 'Turkey breast', category: 'Protein' },
      { id: 'beef', label: 'Beef', category: 'Protein' },
      { id: 'chicken-sausage', label: 'Chicken sausage', category: 'Protein' },
      { id: 'chicken-ham', label: 'Chicken ham', category: 'Protein' },
      { id: 'ground-chicken', label: 'Ground chicken', category: 'Protein' },

      // Seafood
      { id: 'salmon', label: 'Salmon', category: 'Seafood' },
      { id: 'canned-tuna', label: 'Canned tuna', category: 'Seafood' },
      { id: 'sea-bass', label: 'Sea bass', category: 'Seafood' },
      { id: 'seafood-cocktails', label: 'Seafood cocktails', category: 'Seafood' },
      { id: 'shrimps', label: 'Shrimps', category: 'Seafood' },
      { id: 'river-trout-fillet', label: 'River trout fillet', category: 'Seafood' },

      // Dairy
      { id: 'tofu', label: 'Tofu', category: 'Dairy' },
      { id: 'feta-cheese', label: 'Feta cheese', category: 'Dairy' },
      { id: 'cheese', label: 'Cheese', category: 'Dairy' },
      { id: 'grated-parmesan', label: 'Grated parmesan', category: 'Dairy' },
      { id: 'mozzarella', label: 'Mozzarella', category: 'Dairy' },
      { id: 'cream-cheese-philadelphia-light', label: 'Cream cheese Philadelphia light', category: 'Dairy' },
      { id: 'greek-yogurt', label: 'Greek yogurt', category: 'Dairy' },
      { id: 'half-and-half-cream', label: 'Half-and-half cream', category: 'Dairy' },

      // Fresh fruits
      { id: 'avocado', label: 'Avocado', category: 'Fresh fruits' },
      { id: 'apple', label: 'Apple', category: 'Fresh fruits' },
      { id: 'pear', label: 'Pear', category: 'Fresh fruits' },
      { id: 'bananas', label: 'Bananas', category: 'Fresh fruits' },
      { id: 'fresh-berries', label: 'Fresh berries', category: 'Fresh fruits' },
      { id: 'mango', label: 'Mango', category: 'Fresh fruits' },
      { id: 'orange', label: 'Orange', category: 'Fresh fruits' },
    ],
  },

  // 20 — Results/weight projection
  {
    id: 'results',
    type: 'results',
  },

  // 21 — Final gauge
  {
    id: 'age-insight-finish',
    type: 'persona-card',
    title: 'Your Cortisol Levels',
    showGauge: true,
  },
];

/** Total quiz steps count shown in the header counter */
export const TOTAL_STEPS = 21;
