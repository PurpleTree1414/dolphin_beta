import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { ResearchHero } from '@/components/research/ResearchHero';
import { PillarCard } from '@/components/research/PillarCard';
import { mockUser } from '@/mocks/user';
import { getAllPillars } from '@/lib/kb';
import { KB_TOTALS } from '@/data/kb-structure';

/**
 * Research Library (/research) — the Knowledge Base entry point.
 * Hero + a 2×2 grid of pillar cards with live section/article counts.
 */
export default function ResearchLibraryPage() {
  const pillars = getAllPillars();

  return (
    <>
      <TopNav active="research" user={mockUser} />

      <ResearchHero
        pillarCount={KB_TOTALS.pillars}
        sectionCount={KB_TOTALS.sections}
        articleCount={KB_TOTALS.articles}
      />

      <div className="sec">
        <div className="g2">
          {pillars.map((pillar) => (
            <PillarCard key={pillar.key} pillar={pillar} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
