import type { Pillar } from '@/types';
import { PILLAR_META, pillarVar, pillarVarLight } from '@/lib/pillars';

export type Recommendation = {
  id: string;
  pillar: Pillar;
  /** Short tag (e.g. "Low", "Up", "Missed"). Follows the pillar label. */
  tag: string;
  title: string;
  body: string;
  cta: string;
};

/**
 * 3-card "Flow Recommendations" row on the dashboard.
 * Static copy for the first checkpoint — real recommendations will come
 * from a backend endpoint keyed on the user's current pillar deltas.
 */
export function Recommendations({ items }: { items: Recommendation[] }) {
  return (
    <div>
      <p className="ey" style={{ marginBottom: 12 }}>Flow Recommendations</p>
      <div className="g3" style={{ gap: 14 }}>
        {items.map((r) => (
          <div
            key={r.id}
            style={{
              background: 'var(--surf)',
              border: '1px solid var(--bdr)',
              borderLeft: `3px solid ${pillarVar(r.pillar)}`,
              borderRadius: 'var(--rlg)',
              padding: 18,
              boxShadow: 'var(--sh)',
            }}
          >
            <span
              className="badge"
              style={{
                background: pillarVarLight(r.pillar),
                color: pillarVar(r.pillar),
                marginBottom: 10,
                fontSize: 11,
              }}
            >
              {PILLAR_META[r.pillar].label} · {r.tag}
            </span>
            <h3 style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 6 }}>{r.title}</h3>
            <p
              style={{
                fontSize: 12,
                color: 'var(--muted)',
                lineHeight: 1.6,
                marginBottom: 12,
              }}
            >
              {r.body}
            </p>
            <span
              style={{
                fontSize: 12.5,
                color: pillarVar(r.pillar),
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              {r.cta} →
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
