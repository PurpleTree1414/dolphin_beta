import Link from 'next/link';

type Col = { heading: string; links: { label: string; href: string }[] };

const COLUMNS: Col[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Flow',      href: '/flow' },
      { label: 'Framework', href: '/framework' },
      { label: 'Research',  href: '/research' },
      { label: 'Courses',   href: '/courses' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About',   href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms',   href: '#' },
    ],
  },
  {
    heading: 'Social',
    links: [
      { label: 'Instagram', href: '#' },
      { label: 'Discord',   href: '#' },
      { label: 'Email',     href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--bdr)',
        padding: '32px 40px',
        background: 'var(--surf)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          maxWidth: 1240,
          margin: '0 auto 24px',
        }}
      >
        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h4
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '.08em',
                color: 'var(--text)',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              {col.heading}
            </h4>
            {col.links.map((lnk) => (
              <Link
                key={lnk.label}
                href={lnk.href}
                style={{
                  display: 'block',
                  fontSize: 13,
                  color: 'var(--muted)',
                  marginBottom: 7,
                  textDecoration: 'none',
                }}
              >
                {lnk.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--faint)' }}>
        © 2025 Purple Tree Labs · Dolphin
      </p>
    </footer>
  );
}
