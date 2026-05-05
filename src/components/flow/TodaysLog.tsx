import type { Metric } from '@/types';
import { pillarVar } from '@/lib/pillars';

/**
 * Left-sidebar "Today's Log" card.
 * Uses the first 4 metrics as "logged", then shows two extra "needs log"
 * placeholder rows to mirror the prototype's 4/6 state.
 */
export function TodaysLog({ metrics }: { metrics: Metric[] }) {
  // Pick the canonical 4 "logged" metrics.
  const loggedKeys = ['sleep', 'steps', 'hrv', 'focus'] as const;
  const logged = loggedKeys
    .map((k) => metrics.find((m) => m.key === k))
    .filter((m): m is Metric => Boolean(m));

  // These two stub rows are intentional — the prototype shows them as
  // unlogged action items. Replace with real "needs log" metrics later.
  const unlogged = [
    { label: 'Journal entry', tone: 'var(--pc)' },
    { label: 'Mood check-in', tone: 'var(--faint)' },
  ];

  const totalSlots = logged.length + unlogged.length;

  return (
    <div className="card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <p className="ey">Today&apos;s Log</p>
        <span style={{ fontSize: 11, color: 'var(--lc)', fontWeight: 600 }}>
          {logged.length} / {totalSlots} logged
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {logged.map((m) => (
          <div
            key={m.key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 0',
              borderBottom: '1px solid var(--bdr)',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: pillarVar(m.pillar),
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 13, flex: 1 }}>{m.label}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
              {m.value}
              {m.unit ? ` ${m.unit}` : ''}
            </span>
            <span
              style={{ fontSize: 11, color: 'var(--lc)', fontWeight: 500, marginLeft: 6 }}
            >
              ✓
            </span>
          </div>
        ))}

        {unlogged.map((u, i) => {
          const isLast = i === unlogged.length - 1;
          return (
            <div
              key={u.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 0',
                borderBottom: isLast ? 'none' : '1px solid var(--bdr)',
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: u.tone,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 13, flex: 1, color: 'var(--muted)' }}>{u.label}</span>
              <span
                style={{
                  fontSize: 12,
                  color: 'var(--bc)',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                + log
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
