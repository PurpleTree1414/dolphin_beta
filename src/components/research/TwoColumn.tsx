'use client';

import type { ReactNode } from 'react';
import { useMediaQuery } from './useMediaQuery';

/**
 * Two-column layout (main + right rail) that collapses to a single
 * column below 900px. `rightOnStack` controls the rail's fate when
 * stacked:
 *   - 'stack' → rail flows beneath the main column (Section page)
 *   - 'hide'  → rail is removed entirely (Article contents sidebar)
 *
 * Server-rendered nodes can be passed as `main`/`right`; this client
 * wrapper only decides the layout, so pages stay server components.
 */
export function TwoColumn({
  main,
  right,
  rightWidth = 280,
  gap = 28,
  rightOnStack = 'stack',
}: {
  main: ReactNode;
  right: ReactNode;
  rightWidth?: number;
  gap?: number;
  rightOnStack?: 'stack' | 'hide';
}) {
  const stacked = useMediaQuery('(max-width: 900px)');

  if (stacked) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap }}>
        <div>{main}</div>
        {rightOnStack === 'stack' && <div>{right}</div>}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `minmax(0, 1fr) ${rightWidth}px`,
        gap,
        alignItems: 'start',
      }}
    >
      <div style={{ minWidth: 0 }}>{main}</div>
      <div>{right}</div>
    </div>
  );
}
