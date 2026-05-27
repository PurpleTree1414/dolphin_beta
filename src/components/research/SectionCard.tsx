'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { KBSection } from '@/types';

/**
 * One section row in the Section Progression list. "SECTION N.M"
 * eyebrow in the pillar colour, section name, live article count, and
 * an arrow that slides right on hover. Whole row links to the section.
 */
export function SectionCard({
  section,
  pillarSlug,
  pillarColor,
}: {
  section: KBSection;
  pillarSlug: string;
  pillarColor: string;
}) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={`/research/${pillarSlug}/${section.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        textDecoration: 'none',
        color: 'inherit',
        background: 'var(--surf)',
        border: '1px solid var(--bdr)',
        borderRadius: 'var(--rlg)',
        padding: '18px 22px',
        transition: 'transform .15s ease, box-shadow .15s ease, border-color .15s ease',
        transform: hover ? 'translateY(-2px)' : 'none',
        boxShadow: hover ? 'var(--sh)' : 'none',
        borderColor: hover ? 'var(--bdr2)' : 'var(--bdr)',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: pillarColor,
            marginBottom: 6,
          }}
        >
          Section {section.number}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: 'var(--text)' }}>
          {section.name}
        </h3>
        <p style={{ fontSize: 12, color: 'var(--muted)' }}>
          {section.articles.length} article{section.articles.length === 1 ? '' : 's'}
        </p>
      </div>
      <span
        aria-hidden
        style={{
          fontSize: 18,
          color: pillarColor,
          transition: 'transform .15s ease',
          transform: hover ? 'translateX(4px)' : 'none',
          flexShrink: 0,
        }}
      >
        →
      </span>
    </Link>
  );
}
