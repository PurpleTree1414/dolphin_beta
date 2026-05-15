import type { AssessmentAnswers, Pillar, PillarWeights } from '@/types';
import { PILLAR_META, PILLARS } from './pillars';

/**
 * Assessment weight derivation — mirrors the prototype's
 * `asxComputeWeights` function from dolphin_assessment_prototype.html
 * verbatim. Keep this file in sync with that logic; the prototype is
 * the canonical source.
 *
 * Inputs:
 *   - q1–q4: forced-choice picks, each a pillar. Each pillar can
 *     appear in at most 2 of the 4 trade-offs (max count = 2).
 *   - q5: "most dissatisfied" pillar (pillar pick)
 *   - q7: "strongest" pillar (pillar pick, must differ from q5)
 *
 * Note: q6 (1–5 rating) is collected but NOT used in derivation.
 * Same for q8/q9 (life context).
 *
 * Algorithm:
 *   1. Priority count per pillar from q1–q4 (0..2). Normalise / 2.
 *   2. Satisfaction prior: default 0.625 per pillar. q5 → 1.0
 *      (highest weight on the dissatisfied pillar), q7 → 0.25
 *      (lowest weight on the strongest pillar).
 *   3. raw[p] = 0.6 · prio[p] + 0.4 · sat[p]
 *   4. Normalise to sum 100, integer-round.
 *   5. Repair rounding drift by adding the difference to the largest.
 */
export function deriveWeights(
  answers: Partial<AssessmentAnswers>,
): PillarWeights {
  const priority: Record<Pillar, number> = { body: 0, mind: 0, lifestyle: 0, purpose: 0 };
  (['q1', 'q2', 'q3', 'q4'] as const).forEach((q) => {
    const pick = answers[q];
    if (pick) priority[pick]++;
  });

  // Normalise priority counts to 0..1 (max possible is 2 per pillar).
  const prioNorm: Record<Pillar, number> = {
    body:      priority.body      / 2,
    mind:      priority.mind      / 2,
    lifestyle: priority.lifestyle / 2,
    purpose:   priority.purpose   / 2,
  };

  // Satisfaction prior — defaults to a neutral 0.625, then nudged by q5/q7.
  const sat: Record<Pillar, number> = {
    body: 0.625, mind: 0.625, lifestyle: 0.625, purpose: 0.625,
  };
  if (answers.q5) sat[answers.q5] = 1.0;
  if (answers.q7 && answers.q7 !== answers.q5) sat[answers.q7] = 0.25;

  // Combine with the prototype's 60/40 weighting.
  const raw: Record<Pillar, number> = {
    body:      0.6 * prioNorm.body      + 0.4 * sat.body,
    mind:      0.6 * prioNorm.mind      + 0.4 * sat.mind,
    lifestyle: 0.6 * prioNorm.lifestyle + 0.4 * sat.lifestyle,
    purpose:   0.6 * prioNorm.purpose   + 0.4 * sat.purpose,
  };
  const total = raw.body + raw.mind + raw.lifestyle + raw.purpose;

  // Integer-percent normalisation.
  const final: PillarWeights = {
    body:      Math.round((raw.body      / total) * 100),
    mind:      Math.round((raw.mind      / total) * 100),
    lifestyle: Math.round((raw.lifestyle / total) * 100),
    purpose:   Math.round((raw.purpose   / total) * 100),
  };

  // Repair rounding drift on the largest pillar (prototype behaviour).
  let sum = final.body + final.mind + final.lifestyle + final.purpose;
  while (sum !== 100) {
    const diff = 100 - sum;
    const maxKey = (Object.keys(final) as Pillar[]).reduce((a, b) =>
      final[a] >= final[b] ? a : b,
    );
    final[maxKey] += diff;
    sum = final.body + final.mind + final.lifestyle + final.purpose;
  }

  return final;
}

/**
 * Apply a slider adjustment to one pillar. Mirrors the prototype's
 * `asxAdjW(pillar, input)` which does NOT auto-redistribute — the
 * user is shown a "Total: X%" warning when sum ≠ 100 and confirms at
 * their own discretion. Clamps the value to [5, 70].
 */
export function adjustWeight(
  current: PillarWeights,
  pillar: Pillar,
  rawValue: number,
): PillarWeights {
  const value = Math.max(5, Math.min(70, Math.round(rawValue)));
  return { ...current, [pillar]: value };
}

export const weightSum = (w: PillarWeights): number =>
  w.body + w.mind + w.lifestyle + w.purpose;

export const weightsBalanced = (w: PillarWeights): boolean => weightSum(w) === 100;

/**
 * Interpretation copy for the weight-reveal card. Mirrors the
 * prototype's `asxUpdateInterp`: highlight the top-weighted pillar
 * and call out the lowest-weighted one for context.
 */
export function interpretWeights(weights: PillarWeights): {
  top: Pillar;
  low: Pillar;
  topLabel: string;
  lowLabel: string;
} {
  const top = PILLARS.reduce((a, b) => (weights[a] >= weights[b] ? a : b));
  const low = PILLARS.reduce((a, b) => (weights[a] <= weights[b] ? a : b));
  return {
    top,
    low,
    topLabel: PILLAR_META[top].label,
    lowLabel: PILLAR_META[low].label,
  };
}

/**
 * Ring constants from the prototype SVG. r values: 80, 62, 46, 32 →
 * circumferences (2πr ≈ 503, 389, 289, 201). Each pillar fills a
 * proportion of its ring's circumference.
 */
export const RING_CIRCUMFERENCE: Record<Pillar, number> = {
  body: 503,
  mind: 389,
  lifestyle: 289,
  purpose: 201,
};

export const ringDasharray = (pillar: Pillar, weightPercent: number): string => {
  const c = RING_CIRCUMFERENCE[pillar];
  const filled = (weightPercent / 100) * c;
  return `${filled} ${c}`;
};
