import type { Habit } from '@/types';
import { PILLAR_META, pillarVar, pillarVarLight } from '@/lib/pillars';

/**
 * Habit tracker card on the Flow dashboard sidebar.
 * Shows the first N habits; tick + metadata + pillar pill + "+ Add Habit"
 * CTA. Ticks are display-only — wiring interactive toggling to storage
 * will happen when we add the `'use client'` seam.
 */
export function HabitTracker({ habits }: { habits: Habit[] }) {
  const doneCount = habits.filter((h) => h.doneToday).length;
  const totalSlots = habits.length;

  // 6 dots at top-right: one per habit, green if done, grey if not.
  const dots = Array.from({ length: totalSlots }, (_, i) => i < doneCount);

  return (
    <div className="card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <p className="ey">Habits</p>
        <div style={{ display: 'flex', gap: 4 }}>
          {dots.map((on, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: on ? 'var(--lc)' : 'var(--bdr2)',
              }}
            />
          ))}
        </div>
      </div>

      {habits.map((h, i) => {
        const isLast = i === habits.length - 1;
        const done = h.doneToday;
        return (
          <div
            key={h.id}
            className="habit-row"
            style={isLast ? { borderBottom: 'none' } : undefined}
          >
            <div className={`tick${done ? ' done' : ''}`}>
              {done && (
                <svg width="10" height="10" viewBox="0 0 12 12">
                  <polyline
                    points="2,6 5,9 10,3"
                    fill="none"
                    stroke="#fff"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, color: done ? 'var(--text)' : 'var(--muted)' }}>
                {h.label}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: done ? 'var(--muted)' : 'var(--faint)',
                }}
              >
                {h.detail}
              </p>
            </div>

            <span
              style={{
                fontSize: 11,
                padding: '2px 7px',
                borderRadius: 5,
                background: pillarVarLight(h.pillar),
                color: pillarVar(h.pillar),
              }}
            >
              {PILLAR_META[h.pillar].label}
            </span>
          </div>
        );
      })}

      <button
        className="btn btn-p"
        style={{ width: '100%', marginTop: 14, fontSize: 13, padding: 9 }}
        type="button"
      >
        + Add Habit
      </button>
    </div>
  );
}
