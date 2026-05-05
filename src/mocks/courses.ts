import type { Course } from '@/types';

/**
 * Mock courses — one per pillar. Body is seeded with real content from
 * the prototype (S4); Mind / Lifestyle / Purpose are placeholders with
 * matching structure, filled out more when those tabs are built.
 *
 * TODO: replace with API call — GET /courses?pillar=<p>&user=me.
 */

export const mockCourseBody: Course = {
  pillar: 'body',
  title: 'Body',
  description:
    'Build foundations of energy, physical resilience, and the physiological systems that power your day.',
  totalLessons: 9,
  completedLessons: 3,
  estimatedHoursRemaining: 4.5,
  flowImpact: 'High',
  phases: [
    {
      id: 'foundations',
      number: 1,
      title: 'Foundations',
      status: 'done',
      lessons: [
        { id: 'b_1_1', number: '1.1', title: 'Body Awareness Basics',   level: 'intro',       readingMinutes: 12, status: 'done' },
        { id: 'b_1_2', number: '1.2', title: 'Movement Fundamentals',   level: 'foundations', readingMinutes: 18, status: 'done' },
        { id: 'b_1_3', number: '1.3', title: 'Posture & Safety',        level: 'advanced',    readingMinutes: 9,  status: 'done' },
      ],
    },
    {
      id: 'applied_practice',
      number: 2,
      title: 'Applied Practice',
      subtitle: 'In progress',
      status: 'active',
      lessons: [
        { id: 'b_2_1', number: '2.1', title: 'Progressive Overload',     level: 'mechanisms', readingMinutes: 22, status: 'active' },
        { id: 'b_2_2', number: '2.2', title: 'Recovery Science',         level: 'mechanisms', readingMinutes: 20, status: 'locked' },
        { id: 'b_2_3', number: '2.3', title: 'Fueling for Performance',  level: 'mechanisms', readingMinutes: 16, status: 'locked' },
      ],
    },
    {
      id: 'mechanisms',
      number: 3,
      title: 'Mechanisms',
      status: 'locked',
      lessons: [],
    },
    {
      id: 'mastery',
      number: 4,
      title: 'Mastery',
      status: 'locked',
      lessons: [],
    },
  ],
};

export const mockCourseMind: Course = {
  pillar: 'mind',
  title: 'Mind',
  description: 'Cognition, emotion, and the systems that shape mental performance.',
  totalLessons: 9,
  completedLessons: 0,
  estimatedHoursRemaining: 6,
  flowImpact: 'Medium',
  phases: [
    { id: 'foundations',      number: 1, title: 'Foundations',      status: 'active', lessons: [] },
    { id: 'applied_practice', number: 2, title: 'Applied Practice', status: 'locked', lessons: [] },
    { id: 'mechanisms',       number: 3, title: 'Mechanisms',       status: 'locked', lessons: [] },
    { id: 'mastery',          number: 4, title: 'Mastery',          status: 'locked', lessons: [] },
  ],
};

export const mockCourseLifestyle: Course = {
  pillar: 'lifestyle',
  title: 'Lifestyle',
  description: 'Behaviour, environment, and routines that stabilise daily health and energy.',
  totalLessons: 9,
  completedLessons: 9,
  estimatedHoursRemaining: 0,
  flowImpact: 'High',
  phases: [
    { id: 'foundations',      number: 1, title: 'Foundations',      status: 'done', lessons: [] },
    { id: 'applied_practice', number: 2, title: 'Applied Practice', status: 'done', lessons: [] },
    { id: 'mechanisms',       number: 3, title: 'Mechanisms',       status: 'done', lessons: [] },
    { id: 'mastery',          number: 4, title: 'Mastery',          status: 'done', lessons: [] },
  ],
};

export const mockCoursePurpose: Course = {
  pillar: 'purpose',
  title: 'Purpose',
  description: 'Meaning, motivation, identity, and long-term direction as pillars of fulfillment.',
  totalLessons: 9,
  completedLessons: 6,
  estimatedHoursRemaining: 2.5,
  flowImpact: 'High',
  phases: [
    { id: 'foundations',      number: 1, title: 'Foundations',      status: 'done',   lessons: [] },
    { id: 'applied_practice', number: 2, title: 'Applied Practice', status: 'done',   lessons: [] },
    { id: 'mechanisms',       number: 3, title: 'Mechanisms',       status: 'active', lessons: [] },
    { id: 'mastery',          number: 4, title: 'Mastery',          status: 'locked', lessons: [] },
  ],
};

export const mockCourses: Record<'body' | 'mind' | 'lifestyle' | 'purpose', Course> = {
  body: mockCourseBody,
  mind: mockCourseMind,
  lifestyle: mockCourseLifestyle,
  purpose: mockCoursePurpose,
};

/** Overall progress across all pillars, as shown in the journey header. */
export const mockOverallCourseProgress = {
  completedLessons: 3 + 0 + 9 + 6,   // 18
  totalLessons: 9 * 4,                // 36
  percent: Math.round(((3 + 0 + 9 + 6) / (9 * 4)) * 100), // 50
};
