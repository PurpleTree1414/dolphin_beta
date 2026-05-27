import { notFound } from 'next/navigation';
import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Breadcrumb } from '@/components/research/Breadcrumb';
import { PillarView } from '@/components/research/PillarView';
import type { FilterItem } from '@/components/research/DeepResearchFilter';
import { mockUser } from '@/mocks/user';
import { findPillar, getAllPillars, getPillarArticles } from '@/lib/kb';

/** One static page per pillar. */
export function generateStaticParams() {
  return getAllPillars().map((p) => ({ pillarSlug: p.key }));
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ pillarSlug: string }>;
}) {
  const { pillarSlug } = await params;
  const pillar = findPillar(pillarSlug);
  if (!pillar) notFound();

  const filterItems: FilterItem[] = getPillarArticles(pillarSlug).map(
    ({ section, article }) => ({ sectionSlug: section.slug, article }),
  );

  return (
    <>
      <TopNav active="research" user={mockUser} />

      <div className="sec">
        <Breadcrumb
          items={[
            { label: 'Research Library', href: '/research' },
            { label: pillar.name },
          ]}
        />

        <h1 style={{ fontSize: 60, fontWeight: 600, lineHeight: 1.05, letterSpacing: '-.02em', marginBottom: 14 }}>
          {pillar.name}
        </h1>
        <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 620, marginBottom: 32 }}>
          {pillar.description}
        </p>

        <PillarView
          pillarSlug={pillar.key}
          sections={pillar.sections}
          filterItems={filterItems}
          pillarColor={pillar.color}
          pillarColorLight={pillar.colorLight}
        />
      </div>

      <Footer />
    </>
  );
}
