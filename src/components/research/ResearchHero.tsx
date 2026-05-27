/**
 * Library hero — the only Research surface that uses the landing hero
 * background image + gradient overlay. Eyebrow + serif H1 (with an
 * italic blue tail) + subtext + live stat line.
 */
export function ResearchHero({
  pillarCount,
  sectionCount,
  articleCount,
}: {
  pillarCount: number;
  sectionCount: number;
  articleCount: number;
}) {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, rgba(235,243,253,0.65), rgba(244,246,250,0.65), rgba(238,237,251,0.65)), url('https://imaginewithrashid.com/wp-content/uploads/2026/02/Gemini_Generated_Image_96ajtm96ajtm96aj.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '72px 40px',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <p className="ey" style={{ marginBottom: 14 }}>
          Knowledge Base
        </p>
        <h1
          className="serif"
          style={{ fontSize: 52, lineHeight: 1.08, marginBottom: 16, maxWidth: 720 }}
        >
          The science of{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--bc)' }}>your Flow.</em>
        </h1>
        <p
          style={{
            fontSize: 16,
            color: 'var(--muted)',
            lineHeight: 1.7,
            maxWidth: 560,
            marginBottom: 18,
          }}
        >
          Evidence-first, applied science — organised across four pillars for
          structured depth and real-world relevance. Read it like a course or
          dive straight to what you need.
        </p>
        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>
          {pillarCount} Pillars · {sectionCount} Sections · {articleCount} Articles
        </p>
      </div>
    </div>
  );
}
