import type { Habit } from '@/types';

/**
 * Mock habits — match the Flow dashboard habit tracker exactly.
 * TODO: replace with API call — GET /habits?user=me.
 */
export const mockHabits: Habit[] = [
  {
    id: 'morning_run',
    label: 'Morning run',
    pillar: 'body',
    detail: '5.2 km · via Strava',
    source: 'strava',
    doneToday: true,
  },
  {
    id: 'meditation',
    label: 'Meditation',
    pillar: 'mind',
    detail: '10 min · via Headspace',
    source: 'headspace',
    doneToday: true,
  },
  {
    id: 'no_phone_morning',
    label: 'No phone 1h after wake',
    pillar: 'lifestyle',
    detail: '14-day streak',
    streakDays: 14,
    doneToday: true,
  },
  {
    id: 'cold_shower',
    label: 'Cold shower',
    pillar: 'body',
    detail: '3-min protocol',
    doneToday: true,
  },
  {
    id: 'evening_journal',
    label: 'Evening journal',
    pillar: 'purpose',
    detail: 'Purpose · 3 days missed',
    missedDays: 3,
    doneToday: false,
  },
  {
    id: 'reading_20min',
    label: 'Reading 20 min',
    pillar: 'mind',
    detail: 'Mind',
    doneToday: false,
  },
];
