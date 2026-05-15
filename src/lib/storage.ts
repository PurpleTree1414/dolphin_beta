/**
 * localStorage persistence seam.
 *
 * Every component that persists state goes through these helpers — the
 * backend SE can swap internals for Supabase queries without touching
 * component code. Each call site that reads/writes should still carry
 * a `// TODO: replace with API call` comment where relevant.
 *
 * SSR-safe: all reads return the provided fallback when `window` is
 * undefined, all writes silently no-op.
 */

import type { AssessmentAnswers, AssessmentState, PillarWeights } from '@/types';

const KEYS = {
  ONBOARDED: 'dolphin.onboarded',
  ASSESSMENT: 'dolphin.assessment',
  SAVED_ARTICLES: 'dolphin.saved_articles',
  COURSE_PROGRESS: 'dolphin.course_progress',
  HABIT_TICKS: 'dolphin.habit_ticks',
  REFLECTIONS: 'dolphin.reflections',
  GOALS: 'dolphin.goals',
} as const;

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / serialisation error — swallow */
  }
}

function safeRemove(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* noop */
  }
}

// ── First-visit gate ────────────────────────────────────────────────
// Backend equivalent: `users.onboarded_at IS NOT NULL`.
// TODO: replace with API call.
export const isOnboarded = (): boolean => safeGet<boolean>(KEYS.ONBOARDED, false);
export const markOnboarded = (): void => safeSet(KEYS.ONBOARDED, true);
export const clearOnboarded = (): void => safeRemove(KEYS.ONBOARDED);

// ── Assessment state ────────────────────────────────────────────────
// TODO: replace with API call — POST /assessments on complete,
// GET /assessments/me on load.
export const getAssessmentState = (): AssessmentState | null =>
  safeGet<AssessmentState | null>(KEYS.ASSESSMENT, null);
export const setAssessmentState = (state: AssessmentState): void =>
  safeSet(KEYS.ASSESSMENT, state);
export const clearAssessmentState = (): void => safeRemove(KEYS.ASSESSMENT);

/**
 * Convenience wrapper called by the assessment flow on completion.
 * Builds the full `AssessmentState` record from raw answers + derived
 * + adjusted weights and persists it. Also flips the onboarded flag.
 *
 * TODO: replace with API call — POST /assessments.
 */
export const saveAssessmentResult = (input: {
  answers: Partial<AssessmentAnswers>;
  derivedWeights: PillarWeights;
  adjustedWeights: PillarWeights;
}): AssessmentState => {
  const state: AssessmentState = {
    answers: input.answers,
    derivedWeights: input.derivedWeights,
    adjustedWeights: input.adjustedWeights,
    completed: true,
    completedAt: new Date().toISOString(),
  };
  setAssessmentState(state);
  markOnboarded();
  return state;
};

// ── Saved articles (Research) ───────────────────────────────────────
// TODO: replace with API call — POST /articles/:id/save, DELETE same.
export const getSavedArticles = (): string[] =>
  safeGet<string[]>(KEYS.SAVED_ARTICLES, []);
export const saveArticle = (id: string): void => {
  const list = getSavedArticles();
  if (!list.includes(id)) safeSet(KEYS.SAVED_ARTICLES, [...list, id]);
};
export const unsaveArticle = (id: string): void => {
  safeSet(
    KEYS.SAVED_ARTICLES,
    getSavedArticles().filter((x) => x !== id),
  );
};
export const isArticleSaved = (id: string): boolean =>
  getSavedArticles().includes(id);

// ── Course progress ─────────────────────────────────────────────────
// Shape: { [courseId]: string[] of completed lesson ids }.
// TODO: replace with API call — POST /courses/:cid/lessons/:lid/complete.
type CourseProgressMap = Record<string, string[]>;

export const getCourseProgress = (): CourseProgressMap =>
  safeGet<CourseProgressMap>(KEYS.COURSE_PROGRESS, {});

export const updateCourseProgress = (courseId: string, lessonId: string): void => {
  const map = getCourseProgress();
  const done = new Set(map[courseId] ?? []);
  done.add(lessonId);
  safeSet(KEYS.COURSE_PROGRESS, { ...map, [courseId]: [...done] });
};

export const isLessonDone = (courseId: string, lessonId: string): boolean =>
  (getCourseProgress()[courseId] ?? []).includes(lessonId);

// ── Habit ticks ─────────────────────────────────────────────────────
// Shape: { [isoDate]: string[] of habit ids ticked that day }.
// TODO: replace with API call — POST /habits/:id/tick { date }.
type HabitTickMap = Record<string, string[]>;

export const getHabitTicks = (): HabitTickMap =>
  safeGet<HabitTickMap>(KEYS.HABIT_TICKS, {});

export const toggleHabitTick = (habitId: string, isoDate: string): boolean => {
  const map = getHabitTicks();
  const ticks = new Set(map[isoDate] ?? []);
  const nowOn = !ticks.has(habitId);
  if (nowOn) ticks.add(habitId);
  else ticks.delete(habitId);
  safeSet(KEYS.HABIT_TICKS, { ...map, [isoDate]: [...ticks] });
  return nowOn;
};

// ── Reflections ─────────────────────────────────────────────────────
// TODO: replace with API call — POST /reflections.
type StoredReflection = { id: string; date: string; prompt: string; answer: string };

export const getReflections = (): StoredReflection[] =>
  safeGet<StoredReflection[]>(KEYS.REFLECTIONS, []);

export const addReflection = (entry: StoredReflection): void => {
  safeSet(KEYS.REFLECTIONS, [entry, ...getReflections()]);
};

// ── Goals ───────────────────────────────────────────────────────────
// TODO: replace with API call — PATCH /goals/:id.
type StoredGoal = { id: string; progress: number };

export const getGoalProgress = (): Record<string, number> => {
  const list = safeGet<StoredGoal[]>(KEYS.GOALS, []);
  return Object.fromEntries(list.map((g) => [g.id, g.progress]));
};

export const setGoalProgress = (id: string, progress: number): void => {
  const list = safeGet<StoredGoal[]>(KEYS.GOALS, []);
  const next = list.filter((g) => g.id !== id);
  next.push({ id, progress });
  safeSet(KEYS.GOALS, next);
};

// ── Convenience: wipe everything (used by onboarding restart in dev) ─
export const clearAll = (): void => {
  Object.values(KEYS).forEach(safeRemove);
};
