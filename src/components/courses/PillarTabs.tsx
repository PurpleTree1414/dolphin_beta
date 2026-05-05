'use client';

import type { Pillar } from '@/types';
import { PILLARS, PILLAR_META, pillarVar, pillarVarBorder } from '@/lib/pillars';

/**
 * Horizontal pillar tabs above the lesson list. Active tab takes the
 * pillar's colour for text + border (matches prototype's setPillar()).
 * Completed courses get a small ✓ badge after the label.
 */
export function PillarTabs({
  active,
  onChange,
  completed,
}: {
  active: Pillar;
  onChange: (p: Pillar) => void;
  /** Pillars whose course is fully complete — renders a ✓ next to the label. */
  completed: readonly Pillar[];
}) {
  return (
    <div className="pil-tabs">
      {PILLARS.map((p) => {
        const isOn = p === active;
        const isDone = completed.includes(p);
        return (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`pil-tab ${isOn ? 'on' : ''}`}
            style={
              isOn
                ? {
                    color: pillarVar(p),
                    borderColor: pillarVarBorder(p),
                    background: 'var(--bg)',
                  }
                : undefined
            }
          >
            {PILLAR_META[p].label}
            {isDone && (
              <span
                style={{
                  marginLeft: 6,
                  fontSize: 10,
                  color: 'var(--lc)',
                }}
              >
                ✓
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
