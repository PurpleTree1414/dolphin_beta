'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { KBArticleMeta } from '@/types';
import { LENS_LABEL } from '@/lib/kb-labels';
import { DepthBadge, LensIcon, ViewedDot } from './badges';

/**
 * A single article tile in the Article Map. Fixed-width so the row
 * wraps cleanly when a section has more than three articles. Shows the
 * lens icon + eyebrow, article number in pillar colour, title, a depth
 * badge, and a viewed dot. Links to the article page.
 */
export function ArticleMapCard({
  article,
  pillarSlug,
  sectionSlug,
  pillarColor,
  viewed,
}: {
  article: KBArticleMeta;
  pillarSlug: string;
  sectionSlug: string;
  pillarColor: string;
  viewed: boolean;
}) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={`/research/${pillarSlug}/${sectionSlug}/${article.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        width: 200,
        flexShrink: 0,
        textDecoration: 'none',
        color: 'inherit',
        background: 'var(--surf)',
        border: '1px solid var(--bdr)',
        borderRadius: 'var(--r)',
        padding: 16,
        transition: 'transform .15s ease, box-shadow .15s ease, border-color .15s ease',
        transform: hover ? 'translateY(-2px)' : 'none',
        boxShadow: hover ? 'var(--sh)' : 'none',
        borderColor: hover ? 'var(--bdr2)' : 'var(--bdr)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <LensIcon lens={article.knowledgeLens} color={pillarColor} />
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--faint)',
            }}
          >
            {LENS_LABEL[article.knowledgeLens]}
          </span>
        </span>
        <ViewedDot viewed={viewed} color={pillarColor} />
      </div>

      <span style={{ fontSize: 12, fontWeight: 700, color: pillarColor }}>
        {article.number}
      </span>
      <span style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.4, color: 'var(--text)' }}>
        {article.title}
      </span>
      <span style={{ marginTop: 2 }}>
        <DepthBadge depth={article.depth} />
      </span>
    </Link>
  );
}
