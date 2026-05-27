'use client';

import { Fragment } from 'react';
import type { KBSection } from '@/types';
import { useKBViewed } from './useKBViewed';
import { ArticleMapCard } from './ArticleMapCard';

/**
 * "Article Map" card body — a horizontal, wrapping flow of article
 * tiles with → connectors between consecutive articles. Handles any
 * article count (2, 3, 4, …) and wraps gracefully on narrow widths.
 * Reads viewed state from the storage seam on the client.
 */
export function ArticleMap({
  section,
  pillarSlug,
  pillarColor,
}: {
  section: KBSection;
  pillarSlug: string;
  pillarColor: string;
}) {
  const { viewed } = useKBViewed();

  return (
    <div className="card">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 18,
        }}
      >
        <p className="ey">Article Map</p>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
          {section.articles.length} articles
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'stretch',
          gap: 10,
        }}
      >
        {section.articles.map((article, i) => (
          <Fragment key={article.id}>
            <ArticleMapCard
              article={article}
              pillarSlug={pillarSlug}
              sectionSlug={section.slug}
              pillarColor={pillarColor}
              viewed={viewed.has(article.id)}
            />
            {i < section.articles.length - 1 && (
              <span
                aria-hidden
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--faint)',
                  fontSize: 16,
                }}
              >
                →
              </span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
