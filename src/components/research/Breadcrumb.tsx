import Link from 'next/link';

export type Crumb = { label: string; href?: string };

/**
 * Breadcrumb trail used on every Research page below the Library. The
 * final crumb is the current page and renders un-linked in --text.
 */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 8,
        fontSize: 12.5,
        color: 'var(--muted)',
        marginBottom: 20,
      }}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {item.href && !isLast ? (
              <Link
                href={item.href}
                style={{ color: 'var(--muted)', textDecoration: 'none' }}
              >
                {item.label}
              </Link>
            ) : (
              <span style={{ color: isLast ? 'var(--text)' : 'var(--muted)', fontWeight: isLast ? 500 : 400 }}>
                {item.label}
              </span>
            )}
            {!isLast && <span style={{ color: 'var(--faint)' }}>›</span>}
          </span>
        );
      })}
    </nav>
  );
}
