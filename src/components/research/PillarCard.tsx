'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { KBPillar } from '@/types';
import { PillarIcon } from '@/components/ui/PillarIcon';

/**
 * Library pillar card (2×2 grid). Light-tinted background, coloured
 * border, pillar icon, name, description, live "[N] sections · [N]
 * articles" line, and an "Explore →" affordance. The whole card is a
 * link to /research/[pillarKey]; hover lifts it.
 */
export function PillarCard({ pillar }: { pillar: KBPillar }) {
  const [hover, setHover] = useState(false);
  const sectionCount = pillar.sections.length;
  const articleCount = pillar.sections.reduce(
    (n, s) => n + s.articles.length,
    0,
  );

  return (
    <Link
      href={`/research/${pillar.key}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        background: pillar.colorLight,
        border: `1px solid ${pillar.colorBorder}`,
        borderRadius: 'var(--rlg)',
        padding: 26,
        transition: 'transform .15s ease, box-shadow .15s ease',
        transform: hover ? 'translateY(-3px)' : 'none',
        boxShadow: hover ? 'var(--sh2)' : 'var(--sh)',
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 11,
          background: pillar.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        <PillarIcon pillar={pillar.key} size={22} color="#fff" />
      </div>

      <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8, color: 'var(--text)' }}>
        {pillar.name}
      </h3>
      <p
        style={{
          fontSize: 13.5,
          color: 'var(--muted)',
          lineHeight: 1.6,
          marginBottom: 16,
          minHeight: 44,
        }}
      >
        {pillar.description}
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 12, color: 'var(--faint)', fontWeight: 500 }}>
          {sectionCount} sections · {articleCount} articles
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: pillar.color }}>
          Explore →
        </span>
      </div>
    </Link>
  );
}
