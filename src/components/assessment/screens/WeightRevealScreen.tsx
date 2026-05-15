'use client';

import { useState } from 'react';
import type { Pillar, PillarWeights } from '@/types';
import {
  adjustWeight,
  interpretWeights,
  RING_CIRCUMFERENCE,
  ringDasharray,
  weightSum,
} from '@/lib/assessment';
import { PILLAR_META } from '@/lib/pillars';

/**
 * S10 — weight reveal. Concentric donut on the left, weights list on
 * the right. Interpretation card below explains which pillar carries
 * the most weight. Adjuster panel (initially hidden) lets the user
 * fine-tune each pillar via a slider 5..70 — sum is shown live, with
 * an amber warning when it leaves 100%.
 *
 * Matches the prototype's `.asx-result` section exactly, including
 * the toggle "Let me adjust" / "Done adjusting" button label flip.
 */
export function WeightRevealScreen({
  weights,
  onChange,
  onConfirm,
}: {
  weights: PillarWeights;
  onChange: (next: PillarWeights) => void;
  onConfirm: () => void;
}) {
  const [showAdjust, setShowAdjust] = useState(false);
  const interp = interpretWeights(weights);
  const sum = weightSum(weights);
  const sumOk = sum === 100;

  return (
    <div className="asx-step asx-result">
      <p className="asx-part">Your Flow weighting</p>
      <h1>
        Here&apos;s how Dolphin will <em>weight your score.</em>
      </h1>
      <p className="asx-result-sub">
        Based on your answers, these weights shape how much each pillar contributes
        to your Flow Score. The pillars you prioritised and feel most dissatisfied
        with carry more weight — because that&apos;s where progress matters most to
        you right now.
      </p>

      <div className="asx-donut-layout">
        <Donut weights={weights} />
        <div className="asx-weights-list">
          {(['body', 'mind', 'lifestyle', 'purpose'] as const).map((p) => (
            <div key={p} className="asx-wrow">
              <div
                className="asx-wdot"
                style={{ background: PILLAR_META[p].color }}
              />
              <div className="asx-wname">{PILLAR_META[p].label}</div>
              <div className="asx-wpct">{weights[p]}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="asx-interp-card">
        Your answers suggest <strong>{interp.topLabel}</strong> matters most to
        you right now — improvements there will move your Flow Score the most.{' '}
        {interp.lowLabel} carries less weight, but still contributes to your
        overall balance.
      </div>

      {showAdjust && (
        <div className="asx-adjust">
          <p className="asx-adjust-head">Fine-tune your weights</p>
          {(['body', 'mind', 'lifestyle', 'purpose'] as const).map((p) => (
            <div key={p} className="asx-adj-row">
              <div className="asx-adj-label">
                <div
                  className="asx-wdot"
                  style={{ background: PILLAR_META[p].color }}
                />
                {PILLAR_META[p].label}
              </div>
              <input
                type="range"
                min={5}
                max={70}
                step={1}
                value={weights[p]}
                className="asx-adj-range"
                onChange={(e) =>
                  onChange(adjustWeight(weights, p, Number(e.target.value)))
                }
              />
              <div className="asx-adj-val">{weights[p]}</div>
            </div>
          ))}
          <div className={`asx-adj-sum${sumOk ? '' : ' warn'}`}>
            Total: {sum}%{!sumOk && ' — adjust to 100%'}
          </div>
        </div>
      )}

      <div className="asx-cta-row">
        <button
          type="button"
          className="asx-cta-ghost"
          onClick={() => setShowAdjust((v) => !v)}
        >
          {showAdjust ? 'Done adjusting' : 'Let me adjust'}
        </button>
        <button
          type="button"
          className="asx-cta-primary"
          onClick={onConfirm}
          disabled={!sumOk}
        >
          Confirm weights →
        </button>
      </div>
    </div>
  );
}

/**
 * Four concentric SVG ring arcs (body outermost → purpose innermost).
 * Radii and stroke widths match the prototype exactly so the donut
 * is pixel-perfect against it. Each ring's filled arc length is
 * derived from its pillar weight.
 */
function Donut({ weights }: { weights: PillarWeights }) {
  const rings: { pillar: Pillar; r: number; width: number }[] = [
    { pillar: 'body',      r: 80, width: 14 },
    { pillar: 'mind',      r: 62, width: 12 },
    { pillar: 'lifestyle', r: 46, width: 11 },
    { pillar: 'purpose',   r: 32, width: 10 },
  ];

  return (
    <svg width={200} height={200} viewBox="0 0 200 200">
      {rings.map((ring) => (
        <g key={ring.pillar}>
          <circle
            cx={100}
            cy={100}
            r={ring.r}
            fill="none"
            stroke="#E4E8F0"
            strokeWidth={ring.width}
          />
          <circle
            cx={100}
            cy={100}
            r={ring.r}
            fill="none"
            stroke={PILLAR_META[ring.pillar].color}
            strokeWidth={ring.width}
            strokeDasharray={ringDasharray(ring.pillar, weights[ring.pillar])}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            style={{
              transition: 'stroke-dasharray .35s ease',
              // ensure the dasharray total tracks the circumference used in the formula
              ['--c' as string]: `${RING_CIRCUMFERENCE[ring.pillar]}`,
            }}
          />
        </g>
      ))}
    </svg>
  );
}
