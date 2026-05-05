import Link from 'next/link';

/**
 * Dolphin wordmark + logo.
 * SVG lifted verbatim from the prototype nav (.brand).
 */
export function Brand({ href = '/' }: { href?: string }) {
  return (
    <Link href={href} className="brand" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
      <svg width="22" height="16" viewBox="0 0 44 30" fill="none" aria-hidden>
        <path d="M4 20Q16 3 28 11Q34 16 42 7" stroke="#2B7DD4" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M22 20Q27 29 36 22" stroke="#2B7DD4" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
      <span className="brand-txt" style={{ fontSize: 16, fontWeight: 600, color: 'var(--bc)' }}>
        dolphin
      </span>
    </Link>
  );
}
