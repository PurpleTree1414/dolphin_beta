'use client';

import { useEffect, useState } from 'react';
import { getSectionEngagement } from '@/lib/storage';

/**
 * Engagement donut for the Deep Research sidebar — "X / Y articles
 * viewed" over a ring that fills proportionally. Reads from the
 * storage seam on mount (SSR-safe: renders 0/total first, then fills).
 * `total` is the section's REAL article count, passed in by the
 * caller, so variable section sizes are handled correctly.
 */
export function EngagementDonut({
  sectionId,
  articleIds,
  pillarColor,
}: {
  sectionId: string;
  articleIds: string[];
  pillarColor: string;
}) {
  const total = articleIds.length;
  const [viewed, setViewed] = useState(0);

  useEffect(() => {
    setViewed(getSectionEngagement(sectionId, articleIds).viewed);
  }, [sectionId, articleIds]);

  const pct = total === 0 ? 0 : viewed / total;
  const r = 34;
  const circumference = 2 * Math.PI * r;
  const dash = pct * circumference;

  return (
    <div>
      <p className="ey" style={{ marginBottom: 12, fontSize: 10 }}>
        Engagement
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <svg width={84} height={84} viewBox="0 0 84 84" style={{ flexShrink: 0 }}>
          <circle cx={42} cy={42} r={r} fill="none" stroke="var(--bdr)" strokeWidth={8} />
          <circle
            cx={42}
            cy={42}
            r={r}
            fill="none"
            stroke={pillarColor}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            transform="rotate(-90 42 42)"
            style={{ transition: 'stroke-dasharray .5s ease' }}
          />
          <text
            x={42}
            y={46}
            textAnchor="middle"
            style={{ fontSize: 16, fontWeight: 700, fill: 'var(--text)' }}
          >
            {viewed}
          </text>
        </svg>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
            {viewed} / {total}
          </p>
          <p style={{ fontSize: 12, color: 'var(--muted)' }}>articles viewed</p>
        </div>
      </div>
    </div>
  );
}
