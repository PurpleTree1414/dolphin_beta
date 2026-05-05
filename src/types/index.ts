/**
 * Dolphin · shared types
 *
 * ⚠️ This file is the contract with the backend SE. Every field name used
 * by the frontend MUST match what the SE exposes from Supabase. Do not
 * rename fields unilaterally — propose a change, get sign-off, then edit.
 *
 * Scope for Checkpoint A: enough to type all mocks and lib functions.
 * Research article payload, course lesson body, and goal/reflection detail
 * shapes will evolve when those features are built.
 */

// ═════════════════════════════════════════════════════════════════════
//  Core primitives
// ═════════════════════════════════════════════════════════════════════

export type Pillar = 'body' | 'mind' | 'lifestyle' | 'purpose';

/** 0–100 integers. Must sum to exactly 100. */
export type PillarWeights = {
  body: number;
  mind: number;
  lifestyle: number;
  purpose: number;
};

export type DataSource =
  | 'oura'
  | 'whoop'
  | 'apple_health'
  | 'apple_screen_time'
  | 'strava'
  | 'garmin'
  | 'myfitnesspal'
  | 'headspace'
  | 'calm'
  | 'spotify'
  | 'notion'
  | 'google_fit'
  | 'dropbox'
  | 'slack'
  | 'internal';

// ═════════════════════════════════════════════════════════════════════
//  Flow Score
// ═════════════════════════════════════════════════════════════════════

export type InterpretationBand =
  | 'exceptional'   // 85–100
  | 'strong'        // 70–84
  | 'developing'    // 55–69
  | 'foundational'  // 40–54
  | 'critical';     // 0–39

export type PillarScore = {
  pillar: Pillar;
  /** Weighted composite for this pillar, 0–100. */
  score: number;
  /** Day-over-day delta in whole points. Positive = improving. */
  delta: number;
};

export type TrendPoint = {
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** Overall Flow Score on that day, 0–100. */
  score: number;
};

export type FlowSnapshot = {
  /** ISO timestamp for when this snapshot was computed. */
  timestamp: string;
  /** Overall Flow Score, 0–100. Flow = R·0.65 + B·0.35. */
  score: number;
  /** current − avg(prev 3). One decimal. */
  momentum: number;
  band: InterpretationBand;
  weights: PillarWeights;
  pillars: Record<Pillar, PillarScore>;
  /** Oldest → newest. Last entry is today. */
  trend7d: TrendPoint[];
  streakDays: number;
};

// ═════════════════════════════════════════════════════════════════════
//  User
// ═════════════════════════════════════════════════════════════════════

export type User = {
  id: string;
  firstName: string;
  /** Single-character badge shown in the top-right avatar. */
  avatarInitial: string;
  weights: PillarWeights;
  /** ISO timestamp; absent if user has not finished onboarding. */
  onboardedAt?: string;
};

// ═════════════════════════════════════════════════════════════════════
//  Metrics & habits (Flow dashboard)
// ═════════════════════════════════════════════════════════════════════

export type Metric = {
  key: string;
  label: string;
  /** Pre-formatted value for display. Use `rawValue` for calc if numeric. */
  value: string;
  rawValue?: number;
  unit?: string;
  pillar: Pillar;
  source?: DataSource;
};

export type Habit = {
  id: string;
  label: string;
  pillar: Pillar;
  /** Free-form helper text: "5.2 km · via Strava", "14-day streak". */
  detail?: string;
  source?: DataSource;
  doneToday: boolean;
  streakDays?: number;
  /** If the habit has been missed recently, how many days in a row. */
  missedDays?: number;
};

export type Integration = {
  id: string;
  name: string;
  pillar?: Pillar;
  /** Brand colour used for the ticker dot. */
  dotColor: string;
  status: 'connected' | 'soon';
  description?: string;
};

// ═════════════════════════════════════════════════════════════════════
//  Courses
// ═════════════════════════════════════════════════════════════════════

export type LessonStatus = 'done' | 'active' | 'locked';

export type LessonLevel =
  | 'intro'
  | 'foundations'
  | 'advanced'
  | 'mechanisms'
  | 'mastery';

export type Lesson = {
  id: string;
  /** Display number, e.g. "1.1", "2.3". */
  number: string;
  title: string;
  level: LessonLevel;
  readingMinutes: number;
  status: LessonStatus;
};

export type PhaseKey = 'foundations' | 'applied_practice' | 'mechanisms' | 'mastery';

export type Phase = {
  id: PhaseKey;
  number: 1 | 2 | 3 | 4;
  title: string;
  subtitle?: string;
  status: 'done' | 'active' | 'locked';
  lessons: Lesson[];
};

export type Course = {
  pillar: Pillar;
  title: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  estimatedHoursRemaining: number;
  /** High/Medium/Low — qualitative impact on Flow Score. */
  flowImpact: 'High' | 'Medium' | 'Low';
  phases: Phase[];
};

// ═════════════════════════════════════════════════════════════════════
//  Research
// ═════════════════════════════════════════════════════════════════════

/**
 * Research is stubbed shallow for Checkpoint A — only the pillar entry
 * cards from S3 of the prototype. Treemap, phases, subtopics, and
 * article detail shapes come later.
 */
export type ResearchPillarEntry = {
  pillar: Pillar;
  title: string;
  description: string;
  phaseCount: number;
  subtopicCount: number;
  articleCount: number;
};

export type Article = {
  id: string;
  pillar: Pillar;
  phase?: string;
  subtopic?: string;
  title: string;
  readingMinutes: number;
  saved: boolean;
};

// ═════════════════════════════════════════════════════════════════════
//  Purpose — goals & reflections
// ═════════════════════════════════════════════════════════════════════

export type Goal = {
  id: string;
  pillar: Pillar;
  title: string;
  /** 0–100. */
  progress: number;
  /** ISO date. */
  targetDate?: string;
};

export type Reflection = {
  id: string;
  /** ISO date. */
  date: string;
  prompt: string;
  answer: string;
};

// ═════════════════════════════════════════════════════════════════════
//  Assessment
// ═════════════════════════════════════════════════════════════════════

/** Shape matches dolphin_assessment_prototype.html exactly. */
export type AssessmentAnswers = {
  /** Trade-off: body | purpose. */
  q1: Pillar;
  /** Trade-off: mind | lifestyle. */
  q2: Pillar;
  /** Trade-off: body | mind. */
  q3: Pillar;
  /** Trade-off: lifestyle | purpose. */
  q4: Pillar;
  /** Most dissatisfied pillar. */
  q5: Pillar;
  /** 1–5 satisfaction rating for q5's pillar. Collected but NOT used in weight derivation today. */
  q6: 1 | 2 | 3 | 4 | 5;
  /** Strongest pillar. Must not equal q5. */
  q7: Pillar;
  /** Life situation. Collected but NOT used in weight derivation today. */
  q8: 'stable' | 'transition_pos' | 'transition_hard' | 'unexpected';
  /** Primary focus. Collected but NOT used in weight derivation today. */
  q9: 'career' | 'health' | 'relationships' | 'growth' | 'multiple';
};

export type AssessmentState = {
  answers: Partial<AssessmentAnswers>;
  /** Output of deriveWeights(answers). */
  derivedWeights: PillarWeights;
  /** After user slider edits. Equal to derivedWeights if untouched. */
  adjustedWeights: PillarWeights;
  completed: boolean;
  /** ISO timestamp. */
  completedAt?: string;
};

// ═════════════════════════════════════════════════════════════════════
//  Assessment content (static mock data)
// ═════════════════════════════════════════════════════════════════════

export type AssessmentPart = 1 | 2 | 3;

export type TradeOffQuestion = {
  id: 'q1' | 'q2' | 'q3' | 'q4';
  part: 1;
  partLabel: string; // "Part 1 · Trade-off 1 of 4"
  question: string;
  context: string;
  optionA: { pillar: Pillar; strong: string; sub: string };
  optionB: { pillar: Pillar; strong: string; sub: string };
};

export type PillarPickQuestion = {
  id: 'q5' | 'q7';
  part: 2;
  partLabel: string;
  question: string;
  context: string;
  options: { pillar: Pillar; label: string; hint?: string }[];
};

export type RatingQuestion = {
  id: 'q6';
  part: 2;
  partLabel: string;
  /** Rendered with the pillar name from q5 interpolated. */
  questionTemplate: string;
  context: string;
  options: { value: 1 | 2 | 3 | 4 | 5; label: string; hint: string }[];
};

export type ContextQuestion = {
  id: 'q8' | 'q9';
  part: 3;
  partLabel: string;
  question: string;
  context: string;
  options: { value: string; label: string; hint?: string }[];
};

export type AssessmentQuestion =
  | TradeOffQuestion
  | PillarPickQuestion
  | RatingQuestion
  | ContextQuestion;
