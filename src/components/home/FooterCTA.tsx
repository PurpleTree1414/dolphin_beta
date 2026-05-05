import Link from 'next/link';

/**
 * "Ready to Start Your Flow?" card — sits directly above the Footer on Home.
 * Gradient accent bar mirrors the prototype (Body → Mind).
 */
export function FooterCTA() {
  return (
    <div
      style={{
        background: 'var(--surf)',
        border: '1px solid var(--bdr)',
        borderRadius: 'var(--rxl)',
        margin: '0 40px 40px',
        padding: '52px 40px',
        textAlign: 'center',
        boxShadow: 'var(--sh)',
      }}
    >
      <div
        style={{
          width: 48,
          height: 4,
          borderRadius: 2,
          background: 'linear-gradient(90deg, var(--bc), var(--mc))',
          margin: '0 auto 22px',
        }}
      />
      <h2
        className="serif"
        style={{ fontSize: 32, fontWeight: 500, marginBottom: 12 }}
      >
        Ready to Start Your Flow?
      </h2>
      <p
        style={{
          fontSize: 14,
          color: 'var(--muted)',
          maxWidth: 460,
          margin: '0 auto 28px',
          lineHeight: 1.7,
        }}
      >
        Take the Flow Assessment to discover your balance across Body, Mind, Lifestyle, and
        Purpose. Get personalized insights and recommendations.
      </p>
      <Link
        href="/assessment"
        className="btn btn-p"
        style={{ fontSize: 14, padding: '13px 30px', textDecoration: 'none' }}
      >
        Begin Your Assessment →
      </Link>
    </div>
  );
}
