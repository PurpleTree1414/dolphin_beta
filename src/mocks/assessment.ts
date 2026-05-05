import type {
  ContextQuestion,
  PillarPickQuestion,
  RatingQuestion,
  TradeOffQuestion,
} from '@/types';

/**
 * Assessment question copy — lifted 1:1 from
 * dolphin_assessment_prototype.html. If the prototype copy changes,
 * mirror the change here.
 */

export const assessmentIntro = {
  headline: "Let's find your Flow.",
  /** Everything after the last space of the headline above is rendered in italics/blue in the prototype. */
  headlineItalic: 'your Flow.',
  subhead:
    'Nine questions to understand what matters most to you right now. There are no right answers — just honest ones. Your answers shape how Dolphin weights your Flow Score.',
  specs: [
    { num: '9',  label: 'Questions' },
    { num: '~6', label: 'Minutes' },
    { num: '4',  label: 'Pillars' },
  ],
};

export const assessmentDone = {
  headline: 'Weights confirmed.',
  body: 'Your Flow Score will be calculated from these weights going forward. In the full Dolphin app, this is where you would land on your first Flow dashboard.',
};

/**
 * Part 1 · Trade-offs — forced binary choice per question.
 * Pillar matchups are fixed.
 */
export const tradeOffQuestions: TradeOffQuestion[] = [
  {
    id: 'q1',
    part: 1,
    partLabel: 'Part 1 · Trade-off 1 of 4',
    question:
      'You have a free year. No work obligations, a modest stipend. Just one year. How do you spend it?',
    context:
      'One year, then life resumes. Pick the version that tempts you more — not the one that sounds more virtuous.',
    optionA: {
      pillar: 'body',
      strong: 'Getting into the best physical shape of your life',
      sub: 'Training, recovery, nutrition, the works',
    },
    optionB: {
      pillar: 'purpose',
      strong: 'Figuring out what you actually want to do with your life',
      sub: 'Explore, reflect, try things, find your direction',
    },
  },
  {
    id: 'q2',
    part: 1,
    partLabel: 'Part 1 · Trade-off 2 of 4',
    question:
      "A friend you care about says they've been struggling. Which version would you find harder to hear?",
    context: 'Both would worry you. We want to know which one would hit you harder.',
    optionA: {
      pillar: 'mind',
      strong: '"I feel mentally scattered and emotionally off most days"',
      sub: 'Inner life feels unsteady',
    },
    optionB: {
      pillar: 'lifestyle',
      strong: '"My life has no structure and my habits have fallen apart"',
      sub: 'Daily life feels disordered',
    },
  },
  {
    id: 'q3',
    part: 1,
    partLabel: 'Part 1 · Trade-off 3 of 4',
    question:
      'You get one extra hour every day for the next year. You use it on yourself. Which?',
    context: "The hour disappears at the end of the year. You can't save it, can't split it.",
    optionA: {
      pillar: 'body',
      strong: 'Training your body',
      sub: 'Movement, strength, recovery',
    },
    optionB: {
      pillar: 'mind',
      strong: 'Training your mind',
      sub: 'Reading, reflection, focused work, learning',
    },
  },
  {
    id: 'q4',
    part: 1,
    partLabel: 'Part 1 · Trade-off 4 of 4',
    question:
      'Two people you respect equally offer to trade lives with you. Which swap would tempt you more?',
    context: "You'd live their life for the next five years. Both are successful by their own standards.",
    optionA: {
      pillar: 'lifestyle',
      strong: 'A stable, balanced, well-rounded life',
      sub: 'Calm rhythm, strong relationships, healthy habits, nothing extreme',
    },
    optionB: {
      pillar: 'purpose',
      strong: 'An intense life in pursuit of something they deeply care about',
      sub: 'Demanding, requires sacrifice, but meaningful',
    },
  },
];

/**
 * Part 2 · Where you're at.
 * Q5: most dissatisfied (pillar pick)
 * Q6: 1–5 rating, question text interpolates the pillar from Q5
 * Q7: strongest (pillar pick, must differ from Q5)
 */
export const q5_mostDissatisfied: PillarPickQuestion = {
  id: 'q5',
  part: 2,
  partLabel: "Part 2 · Where you're at · 1 of 3",
  question: 'Which area do you feel most dissatisfied with right now?',
  context: "Don't overthink it. Pick the one that first comes to mind.",
  options: [
    { pillar: 'body',      label: 'Body',      hint: 'physical health, energy, recovery' },
    { pillar: 'mind',      label: 'Mind',      hint: 'focus, mood, mental resilience' },
    { pillar: 'lifestyle', label: 'Lifestyle', hint: 'habits, routines, relationships, environment' },
    { pillar: 'purpose',   label: 'Purpose',   hint: 'direction, meaning, alignment with values' },
  ],
};

export const q6_satisfactionRating: RatingQuestion = {
  id: 'q6',
  part: 2,
  partLabel: "Part 2 · Where you're at · 2 of 3",
  /** `{pillar}` is replaced with the Q5 pillar label at render time. */
  questionTemplate: 'How would you describe where you are with {pillar}?',
  context: 'Pick the phrase closest to how it actually feels — not how you think you should feel.',
  options: [
    { value: 1, label: 'Really struggling',     hint: 'this is a source of genuine concern' },
    { value: 2, label: 'Not where I want to be', hint: 'and it weighs on me' },
    { value: 3, label: 'Okay',                  hint: "but there's real room for growth" },
    { value: 4, label: 'Pretty solid',          hint: "just a few things I'd refine" },
    { value: 5, label: 'Genuinely strong',      hint: "I'm happy with where I am" },
  ],
};

export const q7_strongest: PillarPickQuestion = {
  id: 'q7',
  part: 2,
  partLabel: "Part 2 · Where you're at · 3 of 3",
  question: 'And which area are you feeling strongest in right now?',
  context: 'The one where you feel most on track.',
  options: [
    { pillar: 'body',      label: 'Body' },
    { pillar: 'mind',      label: 'Mind' },
    { pillar: 'lifestyle', label: 'Lifestyle' },
    { pillar: 'purpose',   label: 'Purpose' },
  ],
};

/** Part 3 · Your context. Not used in weight derivation (yet). */
export const q8_lifeSituation: ContextQuestion = {
  id: 'q8',
  part: 3,
  partLabel: 'Part 3 · Your context · 1 of 2',
  question: 'Which describes your life right now?',
  context: "This helps us calibrate what's realistic to expect from you in the coming weeks.",
  options: [
    { value: 'stable',           label: 'In a stable period' },
    { value: 'transition_pos',   label: 'In a transition that feels mostly positive', hint: 'new job, move, relationship' },
    { value: 'transition_hard',  label: "In a transition that's been difficult" },
    { value: 'unexpected',       label: 'Going through something unexpected or hard' },
  ],
};

export const q9_focusArea: ContextQuestion = {
  id: 'q9',
  part: 3,
  partLabel: 'Part 3 · Your context · 2 of 2',
  question: "What's getting most of your attention and energy these days?",
  context: 'Where your focus is actually going — not where you wish it was.',
  options: [
    { value: 'career',        label: 'Career and work' },
    { value: 'health',        label: 'Health and fitness' },
    { value: 'relationships', label: 'Relationships and family' },
    { value: 'growth',        label: 'Personal growth and direction' },
    { value: 'multiple',      label: 'Trying to hold several of these together' },
  ],
};

/** Full ordered list of the 9 real questions (welcome/result screens excluded). */
export const allAssessmentQuestions = [
  ...tradeOffQuestions,
  q5_mostDissatisfied,
  q6_satisfactionRating,
  q7_strongest,
  q8_lifeSituation,
  q9_focusArea,
] as const;
