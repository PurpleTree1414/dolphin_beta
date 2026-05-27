import type { KBSection } from '@/types';
import { SectionCard } from './SectionCard';

/** Vertical list of section cards — the default Pillar-page view. */
export function SectionList({
  sections,
  pillarSlug,
  pillarColor,
}: {
  sections: KBSection[];
  pillarSlug: string;
  pillarColor: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {sections.map((section) => (
        <SectionCard
          key={section.id}
          section={section}
          pillarSlug={pillarSlug}
          pillarColor={pillarColor}
        />
      ))}
    </div>
  );
}
