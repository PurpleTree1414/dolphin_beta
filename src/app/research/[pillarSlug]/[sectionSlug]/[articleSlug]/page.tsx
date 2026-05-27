import { notFound } from 'next/navigation';
import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Breadcrumb } from '@/components/research/Breadcrumb';
import { ArticleHeader } from '@/components/research/ArticleHeader';
import { MetadataPills } from '@/components/research/MetadataPills';
import { MDXContent } from '@/components/research/MDXContent';
import { ContentsSidebar } from '@/components/research/ContentsSidebar';
import { ArticleNav } from '@/components/research/ArticleNav';
import { ArticleViewTracker } from '@/components/research/ArticleViewTracker';
import { TwoColumn } from '@/components/research/TwoColumn';
import { mockUser } from '@/mocks/user';
import {
  findArticle,
  findPillar,
  findSection,
  getAllPillars,
  getArticleContent,
  getRelatedArticles,
  getSiblingArticles,
} from '@/lib/kb';

/** One static page per article across all pillars/sections. */
export function generateStaticParams() {
  return getAllPillars().flatMap((p) =>
    p.sections.flatMap((s) =>
      s.articles.map((a) => ({
        pillarSlug: p.key,
        sectionSlug: s.slug,
        articleSlug: a.slug,
      })),
    ),
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ pillarSlug: string; sectionSlug: string; articleSlug: string }>;
}) {
  const { pillarSlug, sectionSlug, articleSlug } = await params;
  const pillar = findPillar(pillarSlug);
  const section = findSection(pillarSlug, sectionSlug);
  const article = findArticle(pillarSlug, sectionSlug, articleSlug);
  if (!pillar || !section || !article) notFound();

  const content = getArticleContent(pillar.key, article.id);
  const { prev, next } = getSiblingArticles(article.id);
  const related = getRelatedArticles(pillar.key, section.id, 2);

  const hasContents = content !== null && content.headings.length > 0;

  const body = content ? (
    <MDXContent content={content.content} />
  ) : (
    <ComingSoon />
  );

  return (
    <>
      <TopNav active="research" user={mockUser} />
      {/* Side-effect island: marks this article viewed on mount. */}
      <ArticleViewTracker articleId={article.id} />

      <div className="sec">
        <Breadcrumb
          items={[
            { label: 'Research Library', href: '/research' },
            { label: pillar.name, href: `/research/${pillar.key}` },
            { label: section.name, href: `/research/${pillar.key}/${section.slug}` },
            { label: article.title },
          ]}
        />

        <ArticleHeader number={article.number} title={article.title} pillarColor={pillar.color} />
        <MetadataPills
          pillarName={pillar.name}
          sectionName={section.name}
          lens={article.knowledgeLens}
          depth={article.depth}
        />

        {hasContents ? (
          <TwoColumn
            rightWidth={260}
            rightOnStack="hide"
            main={body}
            right={
              <ContentsSidebar
                headings={content.headings}
                pillarColor={pillar.color}
              />
            }
          />
        ) : (
          body
        )}

        <ArticleNav
          prev={prev}
          next={next}
          related={related}
          pillarSlug={pillar.key}
          sectionSlug={section.slug}
          pillarColor={pillar.color}
        />
      </div>

      <Footer />
    </>
  );
}

/** Graceful placeholder for articles whose MDX hasn't been migrated yet. */
function ComingSoon() {
  return (
    <div
      className="card"
      style={{ maxWidth: 760, padding: '40px 32px', textAlign: 'center' }}
    >
      <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: 'var(--text)' }}>
        Content coming soon
      </p>
      <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.65, maxWidth: 440, margin: '0 auto' }}>
        This article is part of the Knowledge Base structure and is being written.
        Check back shortly — the full text will appear here once it&apos;s published.
      </p>
    </div>
  );
}
