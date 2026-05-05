import type { Goal, Reflection } from '@/types';

/**
 * Goal board + reflection prompts for the Flow dashboard.
 * Placement agreed: goals → right column between Recommendations and
 * Connected Apps; reflection → left sidebar between Today's Log and Habits.
 *
 * TODO: replace with API calls — GET /goals, GET /reflections/recent.
 */

export const mockGoals: Goal[] = [
  {
    id: 'goal_marathon',
    pillar: 'body',
    title: 'Run a half-marathon by September',
    progress: 62,
    targetDate: '2025-09-15',
  },
  {
    id: 'goal_30_day_journal',
    pillar: 'purpose',
    title: '30 days of evening journaling',
    progress: 38,
    targetDate: '2025-05-08',
  },
  {
    id: 'goal_focus_block',
    pillar: 'mind',
    title: 'Two 90-min deep-work blocks daily',
    progress: 71,
  },
];

export const mockReflectionPrompts: string[] = [
  'What mattered most today?',
  'Where did you fall out of alignment?',
  'What would you do differently tomorrow?',
  'What energised you today?',
  'What drained you today?',
];

export const mockReflections: Reflection[] = [
  {
    id: 'refl_2025_04_05',
    date: '2025-04-05',
    prompt: 'What mattered most today?',
    answer: 'Had a real conversation with Ana about the studio plan — felt clear for the first time in weeks.',
  },
  {
    id: 'refl_2025_04_04',
    date: '2025-04-04',
    prompt: 'What would you do differently tomorrow?',
    answer: 'Run earlier. Afternoon slot keeps getting eaten by meetings.',
  },
];
