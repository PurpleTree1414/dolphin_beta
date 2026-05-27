import { notFound } from 'next/navigation';
import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Breadcrumb } from '@/components/research/Breadcrumb';
import { ArticleMap } from '@/components/research/ArticleMap';
import { DeepResearchSidebar } from '@/components/research/DeepResearchSidebar';
import { TwoColumn } from '@/components/research/TwoColumn';
import { mockUser } from '@/mocks/user';
import {
  findPillar,
  findSection,
  getAllPillars,
  getSectionDistributions,
} from '@/lib/kb';

/** One static page per section across all pillars. */
export function generateStaticParams() {
  return getAllPillars().flatMap((p) =>
    p.sections.map((s) => ({ pillarSlug: p.key, sectionSlug: s.slug })),
  );
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ pillarSlug: string; sectionSlug: string }>;
}) {
  const { pillarSlug, sectionSlug } = await params;
  const pillar = findPillar(pillarSlug);
  const section = findSection(pillarSlug, sectionSlug);
  if (!pillar || !section) notFound();

  const distributions = getSectionDistributions(section);

  return (
    <>
      <TopNav active="research" user={mockUser} />

      <div className="sec">
        <Breadcrumb
          items={[
            { label: 'Research Library', href: '/research' },
            { label: pillar.name, href: `/research/${pillar.key}` },
            { label: section.name },
          ]}
        />

        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: pillar.color,
            marginBottom: 8,
          }}
        >
          Section {section.number}
        </p>
        <h1 style={{ fontSize: 40, fontWeight: 600, lineHeight: 1.1, letterSpacing: '-.01em', marginBottom: 28 }}>
          {section.name}
        </h1>

        <TwoColumn
          rightOnStack="stack"
          main={
            <ArticleMap
              section={section}
              pillarSlug={pillar.key}
              pillarColor={pillar.color}
            />
          }
          right={
            <DeepResearchSidebar
              section={section}
              distributions={distributions}
              pillarColor={pillar.color}
            />
          }
        />
      </div>

      <Footer />
    </>
  );
}
