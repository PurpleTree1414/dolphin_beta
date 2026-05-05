import type { FlowSnapshot, Metric, TrendPoint } from '@/types';
import { computeMomentum, interpret } from '@/lib/flow';
import { mockUser } from './user';

/**
 * Mock Flow snapshot — values pulled directly from dolphin_prototype_v3.html.
 * TODO: replace with API call — GET /flow/me/snapshot.
 */

const trend7d: TrendPoint[] = [
  { date: '2025-04-02', score: 65 }, // Tue
  { date: '2025-04-03', score: 72 }, // Wed
  { date: '2025-04-04', score: 69 }, // Thu
  { date: '2025-04-05', score: 76 }, // Fri
  { date: '2025-04-06', score: 71 }, // Sat
  { date: '2025-04-07', score: 70 }, // Sun
  { date: '2025-04-08', score: 74 }, // Today (Wed Apr 8)
];

const todayScore = 74;
const previous3 = trend7d.slice(-4, -1).map((d) => d.score); // 3 days before today: [76, 71, 70]

export const mockFlowSnapshot: FlowSnapshot = {
  timestamp: '2025-04-08T09:00:00.000Z',
  score: todayScore,
  momentum: computeMomentum(todayScore, previous3), // +1.7 given current data
  band: interpret(todayScore),                       // 'strong'
  weights: mockUser.weights,
  pillars: {
    body:      { pillar: 'body',      score: 82, delta: 2  },
    mind:      { pillar: 'mind',      score: 68, delta: -1 },
    lifestyle: { pillar: 'lifestyle', score: 79, delta: 4  },
    purpose:   { pillar: 'purpose',   score: 61, delta: -2 },
  },
  trend7d,
  streakDays: 14,
};

/**
 * Mini metrics shown on the Home showcase card and the Flow sidebar "Today's Log".
 */
export const mockMetrics: Metric[] = [
  { key: 'sleep',        label: 'Sleep',         value: '7.2',   rawValue: 7.2,   unit: 'h',  pillar: 'body',      source: 'apple_health' },
  { key: 'steps',        label: 'Steps',         value: '8,240', rawValue: 8240,  unit: '',   pillar: 'body',      source: 'apple_health' },
  { key: 'hrv',          label: 'HRV',           value: '62',    rawValue: 62,    unit: 'ms', pillar: 'mind',      source: 'whoop' },
  { key: 'focus',        label: 'Focus time',    value: '3.5',   rawValue: 3.5,   unit: 'h',  pillar: 'mind',      source: 'internal' },
  { key: 'active_min',   label: 'Active minutes',value: '48',    rawValue: 48,    unit: 'min',pillar: 'body',      source: 'strava' },
  { key: 'resting_hr',   label: 'Resting HR',    value: '58',    rawValue: 58,    unit: 'bpm',pillar: 'body',      source: 'whoop' },
  { key: 'meditation',   label: 'Meditation streak', value: '6', rawValue: 6,     unit: 'days', pillar: 'mind',    source: 'headspace' },
  { key: 'avg_mood',     label: 'Avg mood',      value: '7.1',   rawValue: 7.1,   unit: '/ 10', pillar: 'mind',    source: 'internal' },
];

/**
 * Pillar-detail metrics — match the 2×2 breakdown grid on the Flow dashboard.
 * Pre-formatted for display; swap to structured data when the real API lands.
 */
export const mockPillarMetrics = {
  body: [
    { label: 'Active minutes', value: '48 min' },
    { label: 'Resting HR',     value: '58 bpm' },
    { label: 'Sleep quality',  value: 'Good · 7.2h' },
    { label: 'Weekly runs',    value: '3 of 4' },
  ],
  mind: [
    { label: 'Meditation streak', value: '6 days' },
    { label: 'Focus sessions',    value: '2 today' },
    { label: 'Avg mood',          value: '7.1 / 10' },
    { label: 'Journaling',        value: '3 days missed', tone: 'purpose' as const },
  ],
  lifestyle: [
    { label: 'Sleep consistency',    value: '+34% ↑', tone: 'lifestyle' as const },
    { label: 'Screen-free morning',  value: '14-day run' },
    { label: 'Meal prep done',       value: 'Yes' },
    { label: 'Weekly habits',        value: '5 / 6' },
  ],
  purpose: [
    { label: 'Journal streak',   value: 'Broken', tone: 'purpose' as const },
    { label: 'Goal reviews',     value: 'Last: 5d ago' },
    { label: 'Intentional focus',value: 'Low week' },
    { label: 'Values actions',   value: '2 / 5' },
  ],
};
