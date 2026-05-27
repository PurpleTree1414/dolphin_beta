import Link from 'next/link';
import type { KBArticleMeta } from '@/types';
import type { RelatedArticle } from '@/lib/kb';

/**
 * Article footer navigation: previous / next within the same section
 * (disabled at the section's ends), plus up to two "Related" links
 * drawn from other sections in the same pillar.
 */
export function ArticleNav({
  prev,
  next,
  related,
  pillarSlug,
  sectionSlug,
  pillarColor,
}: {
  prev: KBArticleMeta | undefined;
  next: KBArticleMeta | undefined;
  related: RelatedArticle[];
  pillarSlug: string;
  sectionSlug: string;
  pillarColor: string;
}) {
  return (
    <footer style={{ marginTop: 48, borderTop: '1px solid var(--bdr)', paddingTop: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <PrevNext
          direction="prev"
          article={prev}
          href={prev ? `/research/${pillarSlug}/${sectionSlug}/${prev.slug}` : undefined}
          pillarColor={pillarColor}
        />
        <PrevNext
          direction="next"
          article={next}
          href={next ? `/research/${pillarSlug}/${sectionSlug}/${next.slug}` : undefined}
          pillarColor={pillarColor}
        />
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <p className="ey" style={{ marginBottom: 12 }}>
            Related
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {related.map((r) => (
              <Link
                key={r.article.id}
                href={`/research/${r.pillarSlug}/${r.sectionSlug}/${r.article.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  textDecoration: 'none',
                  color: 'inherit',
                  background: 'var(--surf)',
                  border: '1px solid var(--bdr)',
                  borderRadius: 'var(--r)',
                  padding: '12px 16px',
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 700, color: pillarColor, flexShrink: 0 }}>
                  {r.article.number}
                </span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{r.article.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </footer>
  );
}

function PrevNext({
  direction,
  article,
  href,
  pillarColor,
}: {
  direction: 'prev' | 'next';
  article: KBArticleMeta | undefined;
  href: string | undefined;
  pillarColor: string;
}) {
  const isPrev = direction === 'prev';
  const align = isPrev ? 'flex-start' : 'flex-end';
  const label = isPrev ? '← Previous' : 'Next →';

  const inner = (
    <span style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: align, textAlign: isPrev ? 'left' : 'right' }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: article ? pillarColor : 'var(--faint)' }}>
        {label}
      </span>
      <span style={{ fontSize: 13.5, fontWeight: 500, color: article ? 'var(--text)' : 'var(--faint)' }}>
        {article ? article.title : isPrev ? 'Start of section' : 'End of section'}
      </span>
    </span>
  );

  const base = {
    flex: '1 1 0',
    minWidth: 0,
    background: 'var(--surf)',
    border: '1px solid var(--bdr)',
    borderRadius: 'var(--r)',
    padding: '14px 18px',
    display: 'flex',
    justifyContent: align,
  } as const;

  if (!article || !href) {
    return <div style={{ ...base, opacity: 0.5 }}>{inner}</div>;
  }
  return (
    <Link href={href} style={{ ...base, textDecoration: 'none', color: 'inherit' }}>
      {inner}
    </Link>
  );
}
