import type { TrendPoint } from '@/types';

/**
 * 7-day sparkline rendered in the Flow hero. Matches the prototype's
 * 300×100 viewBox layout — fixed x-positions, y derived from score.
 *
 * Score mapping: 100 → y=32, 0 → y=88 (roughly). We clamp to [30, 84]
 * so outliers don't escape the card. Labels below, values above points.
 */
export function TrendChart({ trend }: { trend: TrendPoint[] }) {
  // Prototype uses 7 fixed x stops for 7 days.
  const xs = [12, 55, 98, 141, 184, 227, 270];
  const dayLabels = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Today'];

  // Drop to 7 if longer, pad with empty if shorter (shouldn't happen).
  const pts = trend.slice(-7);

  // Map score [0..100] to y [88..32]. Higher score = higher on chart.
  const yFor = (score: number) => {
    const clamped = Math.max(0, Math.min(100, score));
    return 88 - (clamped / 100) * 56;
  };

  // Build path segments. Skip if we somehow get an empty trend.
  if (pts.length === 0) return null;

  const coords = pts.map((p, i) => ({
    x: xs[i] ?? 0,
    y: yFor(p.score),
    score: p.score,
    label: dayLabels[i] ?? '',
  }));

  const linePath = coords
    .map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x},${c.y}`)
    .join(' ');
  const last = coords[coords.length - 1]!;
  const first = coords[0]!;
  const areaPath = `${linePath} L${last.x},100 L${first.x},100Z`;

  return (
    <svg viewBox="0 0 300 100" width="100%" height={96} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#2B7DD4" stopOpacity=".3" />
          <stop offset="100%" stopColor="#2B7DD4" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d={linePath}
        fill="none"
        stroke="#2B7DD4"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d={areaPath} fill="url(#tg)" />

      {/* Pulse ring on today's point */}
      <circle cx={last.x} cy={last.y} r={4.5} fill="#2B7DD4" />
      <circle cx={last.x} cy={last.y} r={8} fill="#2B7DD4" opacity={0.2} className="pulse" />

      {/* Day labels */}
      {coords.map((c, i) => {
        const isToday = i === coords.length - 1;
        return (
          <text
            key={`label-${i}`}
            x={c.x}
            y={92}
            fontSize={9}
            fill={isToday ? '#2B7DD4' : '#4A6080'}
            fontFamily="DM Sans, sans-serif"
            textAnchor="middle"
            fontWeight={isToday ? 600 : 400}
          >
            {c.label}
          </text>
        );
      })}

      {/* Score values above each point */}
      {coords.map((c, i) => {
        const isToday = i === coords.length - 1;
        return (
          <text
            key={`score-${i}`}
            x={c.x}
            y={c.y - 4}
            fontSize={9}
            fill={isToday ? '#2B7DD4' : '#4A6080'}
            fontFamily="DM Sans, sans-serif"
            textAnchor="middle"
            fontWeight={isToday ? 600 : 400}
          >
            {c.score}
          </text>
        );
      })}
    </svg>
  );
}
