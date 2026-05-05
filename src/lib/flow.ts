import type {
  AssessmentAnswers,
  InterpretationBand,
  Pillar,
  PillarWeights,
} from '@/types';
import { PILLARS } from './pillars';

// ═════════════════════════════════════════════════════════════════════
//  Weight derivation — lifted 1:1 from asxComputeWeights() in
//  dolphin_assessment_prototype.html. If the algorithm changes in the
//  prototype, mirror the change here.
// ═════════════════════════════════════════════════════════════════════

const DEFAULT_SATISFACTION = 0.625;

/**
 * Derive pillar weights from the four trade-off picks (q1–q4),
 * the most-dissatisfied pick (q5), and the strongest pick (q7).
 *
 * q6 (1–5 rating) and q8/q9 (life context) are collected but NOT used
 * in this calculation — they'll feed the baseline (B) layer of the Flow
 * formula once backend scoring is wired.
 *
 * @returns integer weights (0–100) summing to exactly 100
 */
export function deriveWeights(answers: Partial<AssessmentAnswers>): PillarWeights {
  // Priority count across q1..q4 (each pillar appears at most twice).
  const priority: Record<Pillar, number> = { body: 0, mind: 0, lifestyle: 0, purpose: 0 };
  (['q1', 'q2', 'q3', 'q4'] as const).forEach((q) => {
    const v = answers[q];
    if (v) priority[v]++;
  });
  const prioNorm: Record<Pillar, number> = { body: 0, mind: 0, lifestyle: 0, purpose: 0 };
  for (const k of PILLARS) prioNorm[k] = priority[k] / 2;

  // Satisfaction: default 0.625 for all, bump the most dissatisfied to 1.0,
  // drop the strongest (if different) to 0.25.
  const sat: Record<Pillar, number> = {
    body: DEFAULT_SATISFACTION,
    mind: DEFAULT_SATISFACTION,
    lifestyle: DEFAULT_SATISFACTION,
    purpose: DEFAULT_SATISFACTION,
  };
  if (answers.q5) sat[answers.q5] = 1.0;
  if (answers.q7 && answers.q7 !== answers.q5) sat[answers.q7] = 0.25;

  // Combine, normalise, round.
  const raw: Record<Pillar, number> = { body: 0, mind: 0, lifestyle: 0, purpose: 0 };
  let total = 0;
  for (const k of PILLARS) {
    raw[k] = 0.6 * prioNorm[k] + 0.4 * sat[k];
    total += raw[k];
  }

  const final: Record<Pillar, number> = { body: 0, mind: 0, lifestyle: 0, purpose: 0 };
  for (const k of PILLARS) {
    final[k] = total > 0 ? Math.round((raw[k] / total) * 100) : 25;
  }

  // Drift fix: rounding may push the sum off 100. Add the diff to whichever
  // pillar currently has the max weight. Guarded against infinite loops.
  const sumWeights = () => PILLARS.reduce((a, k) => a + final[k], 0);
  let sum = sumWeights();
  let safety = 32;
  while (sum !== 100 && safety-- > 0) {
    const diff = 100 - sum;
    const maxKey = PILLARS.reduce((a, b) => (final[a] > final[b] ? a : b));
    final[maxKey] += diff;
    sum = sumWeights();
  }

  return final;
}

// ═════════════════════════════════════════════════════════════════════
//  Flow Score — realtime/baseline combine, momentum, interpretation
// ═════════════════════════════════════════════════════════════════════

/** Flow = R·0.65 + B·0.35. Returns whole number, clamped 0–100. */
export function computeFlow(realtime: number, baseline: number): number {
  const v = realtime * 0.65 + baseline * 0.35;
  return clamp(Math.round(v), 0, 100);
}

/**
 * Flow Momentum = current − avg(previous 3).
 * @param previous3 most recent 3 days, oldest first or last — order doesn't matter
 * @returns one-decimal number (e.g. +2.3, -1.0, 0.0)
 */
export function computeMomentum(current: number, previous3: number[]): number {
  if (previous3.length === 0) return 0;
  const avg = previous3.reduce((a, b) => a + b, 0) / previous3.length;
  return Math.round((current - avg) * 10) / 10;
}

/** Bucket a 0–100 score into an interpretation band. */
export function interpret(score: number): InterpretationBand {
  if (score >= 85) return 'exceptional';
  if (score >= 70) return 'strong';
  if (score >= 55) return 'developing';
  if (score >= 40) return 'foundational';
  return 'critical';
}

export const BAND_LABELS: Record<InterpretationBand, string> = {
  exceptional: 'Exceptional',
  strong: 'Strong',
  developing: 'Developing',
  foundational: 'Foundational',
  critical: 'Critical',
};

// ═════════════════════════════════════════════════════════════════════
//  Internals
// ═════════════════════════════════════════════════════════════════════

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}
