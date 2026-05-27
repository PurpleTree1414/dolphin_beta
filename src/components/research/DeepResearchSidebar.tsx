import type { KBSection } from '@/types';
import type { SectionDistributions } from '@/lib/kb';
import { CONTENT_LABEL, DEPTH_LABEL, LENS_LABEL } from '@/lib/kb-labels';
import { DistributionBars } from './DistributionBars';
import { EngagementDonut } from './EngagementDonut';

/**
 * "Deep Research" right rail on the Section page. Three distribution
 * breakdowns (lens / depth / content) computed over the section's real
 * article count, plus the engagement donut. Sticky on desktop; the
 * parent TwoColumn handles stacking on mobile.
 */
export function DeepResearchSidebar({
  section,
  distributions,
  pillarColor,
}: {
  section: KBSection;
  distributions: SectionDistributions;
  pillarColor: string;
}) {
  const articleIds = section.articles.map((a) => a.id);

  return (
    <div
      className="card"
      style={{ position: 'sticky', top: 80 }}
    >
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--text)',
          marginBottom: 18,
        }}
      >
        Deep Research
      </p>

      <DistributionBars
        title="Article Distribution"
        pillarColor={pillarColor}
        rows={distributions.lens.rows.map((r) => ({
          label: LENS_LABEL[r.key],
          count: r.count,
          pct: r.pct,
        }))}
      />
      <DistributionBars
        title="Depth Distribution"
        pillarColor={pillarColor}
        rows={distributions.depth.rows.map((r) => ({
          label: DEPTH_LABEL[r.key],
          count: r.count,
          pct: r.pct,
        }))}
      />
      <DistributionBars
        title="Content Composition"
        pillarColor={pillarColor}
        rows={distributions.content.rows.map((r) => ({
          label: CONTENT_LABEL[r.key],
          count: r.count,
          pct: r.pct,
        }))}
      />

      <div style={{ borderTop: '1px solid var(--bdr)', paddingTop: 18, marginTop: 4 }}>
        <EngagementDonut
          sectionId={section.id}
          articleIds={articleIds}
          pillarColor={pillarColor}
        />
      </div>
    </div>
  );
}
