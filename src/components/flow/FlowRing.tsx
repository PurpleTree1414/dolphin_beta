import type { Pillar } from '@/types';
import { pillarVar } from '@/lib/pillars';

export type RingSpec = {
  pillar: Pillar;
  /** Score 0–100 — mapped to stroke-dasharray around the circumference. */
  score: number;
  /** Radius in SVG units. Outer-to-inner ordering recommended. */
  radius: number;
  /** Stroke width in SVG units. */
  stroke: number;
};

/**
 * Concentric ring score visual — the Dolphin signature chart.
 *
 * Used in two contexts:
 *   • Home showcase card ("light" variant, 3 rings)
 *   • Flow dashboard hero ("dark" variant, 4 rings)
 *
 * Rings render at their final value statically. Animation-on-mount is
 * intentionally omitted until we decide whether it fires on page load
 * or only on score change — will revisit with the team.
 */
export function FlowRing({
  size,
  viewBoxSize,
  rings,
  centerValue,
  centerLabel,
  variant = 'light',
  showPulseDot = false,
}: {
  /** Rendered SVG size in px. */
  size: number;
  /** Internal SVG coordinate space (default = size). Defaults let callers
   *  preserve prototype-exact radii without touching SVG px sizing. */
  viewBoxSize?: number;
  rings: RingSpec[];
  /** Large text inside the ring — e.g. "74". */
  centerValue: string | number;
  /** Small caption under the value — e.g. "FLOW SCORE". */
  centerLabel: string;
  variant?: 'light' | 'dark';
  showPulseDot?: boolean;
}) {
  const vb = viewBoxSize ?? size;
  const cx = vb / 2;
  const cy = vb / 2;
  const viewBox = `0 0 ${vb} ${vb}`;

  const trackStroke =
    variant === 'dark' ? 'rgba(255,255,255,.08)' : '#E4E8F0';
  const valueFill = variant === 'dark' ? '#fff' : '#0D1420';
  const labelFill = variant === 'dark' ? '#5A7090' : '#5A6478';

  // Pulse dot sits on top of the outer ring.
  const outer = rings[0];
  const pulseR = outer ? outer.radius : vb / 2 - 6;

  return (
    <svg width={size} height={size} viewBox={viewBox} aria-hidden>
      {rings.map((r) => {
        const c = 2 * Math.PI * r.radius;
        const filled = (Math.max(0, Math.min(100, r.score)) / 100) * c;
        return (
          <g key={r.pillar}>
            <circle
              cx={cx}
              cy={cy}
              r={r.radius}
              fill="none"
              stroke={trackStroke}
              strokeWidth={r.stroke}
            />
            <circle
              cx={cx}
              cy={cy}
              r={r.radius}
              fill="none"
              strokeWidth={r.stroke}
              strokeDasharray={`${filled} ${c}`}
              strokeLinecap="round"
              transform={`rotate(-90 ${cx} ${cy})`}
              // CSS vars aren't valid in the SVG stroke *attribute* — only the style property.
              style={{ stroke: pillarVar(r.pillar) }}
            />
          </g>
        );
      })}

      {/* Centre labels */}
      <text
        x={cx}
        y={cy - vb * 0.038}
        textAnchor="middle"
        fontSize={vb * 0.2}
        fontWeight={variant === 'dark' ? 700 : 600}
        fill={valueFill}
        fontFamily="DM Sans, sans-serif"
      >
        {centerValue}
      </text>
      <text
        x={cx}
        y={cy + vb * 0.075}
        textAnchor="middle"
        fontSize={vb * 0.07}
        fill={labelFill}
        fontFamily="DM Sans, sans-serif"
      >
        {centerLabel}
      </text>

      {showPulseDot && outer && (
        <circle
          cx={cx}
          cy={cy - pulseR}
          r={vb * 0.033}
          fill={pillarVar(outer.pillar)}
          className="pulse"
        />
      )}
    </svg>
  );
}
