'use client';

import { useState } from 'react';
import type { KBSection } from '@/types';
import { ViewModeToggle, type ViewMode } from './ViewModeToggle';
import { SectionList } from './SectionList';
import { DeepResearchFilter, type FilterItem } from './DeepResearchFilter';

/**
 * Stateful container for the Pillar page body. Owns the view-mode
 * toggle and swaps between Section Progression and the Deep Research
 * Filter. The server page passes all data as plain props so it can
 * stay a server component with generateStaticParams.
 */
export function PillarView({
  pillarSlug,
  sections,
  filterItems,
  pillarColor,
  pillarColorLight,
}: {
  pillarSlug: string;
  sections: KBSection[];
  filterItems: FilterItem[];
  pillarColor: string;
  pillarColorLight: string;
}) {
  const [mode, setMode] = useState<ViewMode>('progression');

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <ViewModeToggle mode={mode} onChange={setMode} pillarColor={pillarColor} />
      </div>

      {mode === 'progression' ? (
        <SectionList
          sections={sections}
          pillarSlug={pillarSlug}
          pillarColor={pillarColor}
        />
      ) : (
        <DeepResearchFilter
          pillarSlug={pillarSlug}
          items={filterItems}
          pillarColor={pillarColor}
          pillarColorLight={pillarColorLight}
        />
      )}
    </div>
  );
}
