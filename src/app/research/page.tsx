import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { PillarEntryCard } from '@/components/research/PillarEntryCard';
import { mockUser } from '@/mocks/user';
import { mockResearchEntries } from '@/mocks/research';

/**
 * S3 · Research — hub page with 4 pillar entry cards.
 * Treemap, phases, subtopics, and article detail pages are deferred.
 */
export default function ResearchPage() {
  return (
    <>
      <TopNav active="research" user={mockUser} />

      <div className="sec">
        <p className="ey" style={{ marginBottom: 8 }}>Research Hub</p>
        <h2 className="serif" style={{ fontSize: 34, fontWeight: 500, marginBottom: 8 }}>
          Research Library
        </h2>
        <p
          style={{
            fontSize: 14,
            color: 'var(--muted)',
            maxWidth: 520,
            marginBottom: 8,
            lineHeight: 1.6,
          }}
        >
          Evidence-first, applied science organized for structured depth and real-world relevance.
        </p>
        <p style={{ fontSize: 12, color: 'var(--faint)', marginBottom: 32 }}>
          Library map: Pillars → Phases → Subtopics → Articles
        </p>

        <div className="g4">
          {mockResearchEntries.map((e) => (
            <PillarEntryCard key={e.pillar} entry={e} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
