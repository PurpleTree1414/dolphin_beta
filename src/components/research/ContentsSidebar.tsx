'use client';

import { useEffect, useState } from 'react';
import type { KBHeading } from '@/lib/kb';

/**
 * Auto-generated "Contents" rail for the article page. Anchors come
 * from the article's h2/h3 headings (slugs match the ids MDXContent
 * assigns). The active heading is tracked with an IntersectionObserver
 * and highlighted in the pillar colour. Parent TwoColumn hides this on
 * mobile (rightOnStack="hide").
 */
export function ContentsSidebar({
  headings,
  pillarColor,
}: {
  headings: KBHeading[];
  pillarColor: string;
}) {
  const [activeSlug, setActiveSlug] = useState<string>(headings[0]?.slug ?? '');

  useEffect(() => {
    if (headings.length === 0) return;
    const elements = headings
      .map((h) => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActiveSlug(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Contents"
      style={{ position: 'sticky', top: 80 }}
    >
      <p className="ey" style={{ marginBottom: 14, fontSize: 10 }}>
        Contents
      </p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
        {headings.map((h) => {
          const active = h.slug === activeSlug;
          return (
            <li key={h.slug} style={{ paddingLeft: h.level === 3 ? 12 : 0 }}>
              <a
                href={`#${h.slug}`}
                style={{
                  fontSize: 12.5,
                  lineHeight: 1.45,
                  textDecoration: 'none',
                  color: active ? pillarColor : 'var(--muted)',
                  fontWeight: active ? 600 : 400,
                  transition: 'color .15s ease',
                }}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
