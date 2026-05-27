/**
 * Article page title block — number eyebrow in the pillar colour above
 * the H1 (DM Sans 700, capped at a comfortable measure).
 */
export function ArticleHeader({
  number,
  title,
  pillarColor,
}: {
  number: string;
  title: string;
  pillarColor: string;
}) {
  return (
    <header style={{ marginBottom: 20, maxWidth: 800 }}>
      <p
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '.08em',
          color: pillarColor,
          marginBottom: 10,
        }}
      >
        {number}
      </p>
      <h1
        style={{
          fontSize: 'clamp(30px, 5vw, 56px)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-.01em',
          color: 'var(--text)',
        }}
      >
        {title}
      </h1>
    </header>
  );
}
