import type { Pillar } from '@/types';
import { PILLAR_META, pillarVar } from '@/lib/pillars';

export type PillarMetricRow = {
  label: string;
  value: string;
  /** When set, value is tinted to this pillar's colour (e.g. highlighting journal misses). */
  tone?: Pillar;
};

/**
 * One of the 4 pillar detail cards on the Flow dashboard.
 * Header: colour dot + "PILLAR · SCORE" + progress bar.
 * Body: 4 metric rows (label + value).
 */
export function PillarDetailCard({
  pillar,
  score,
  rows,
}: {
  pillar: Pillar;
  score: number;
  rows: PillarMetricRow[];
}) {
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 3,
            background: pillarVar(pillar),
          }}
        />
        <p className="ey">{PILLAR_META[pillar].label} · {score}</p>
        <div className="bar-track" style={{ flex: 1, height: 5 }}>
          <div
            className="bar-fill"
            style={{
              width: `${Math.max(0, Math.min(100, score))}%`,
              background: pillarVar(pillar),
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.map((r) => (
          <div
            key={r.label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 12,
            }}
          >
            <span style={{ color: 'var(--muted)' }}>{r.label}</span>
            <span
              style={{
                fontWeight: 600,
                color: r.tone ? pillarVar(r.tone) : 'var(--text)',
              }}
            >
              {r.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
