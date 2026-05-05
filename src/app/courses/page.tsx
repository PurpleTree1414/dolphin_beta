'use client';

import { useState } from 'react';
import type { Pillar } from '@/types';
import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { JourneyHeader } from '@/components/courses/JourneyHeader';
import { PillarTabs } from '@/components/courses/PillarTabs';
import { ContinueCard } from '@/components/courses/ContinueCard';
import { PhaseSection } from '@/components/courses/PhaseSection';
import { PillarSummaryCard } from '@/components/courses/PillarSummaryCard';
import { RelatedResearch } from '@/components/courses/RelatedResearch';
import { mockUser } from '@/mocks/user';
import { mockCourses } from '@/mocks/courses';
import { PILLARS } from '@/lib/pillars';

/**
 * S4 · Courses — "Your Journey".
 *
 * Layout (matches dolphin_prototype_v3.html):
 *   • Dark gradient JourneyHeader (title + overall % + 4-phase path)
 *   • Pillar tabs (Body / Mind / Lifestyle / Purpose)
 *   • Main grid:
 *       – Left: ContinueCard + phase sections with lesson cards
 *       – Right: sticky PillarSummaryCard + RelatedResearch
 *
 * Client component because pillar selection is local UI state. When
 * the backend lands, replace `mockCourses[activePillar]` with a
 * fetch keyed on the user + pillar.
 */
export default function CoursesPage() {
  const [activePillar, setActivePillar] = useState<Pillar>('body');
  const course = mockCourses[activePillar];

  // Completed-course badges on the tab row.
  const completedPillars = PILLARS.filter(
    (p) => mockCourses[p].completedLessons >= mockCourses[p].totalLessons,
  );

  return (
    <>
      <TopNav active="courses" user={mockUser} />

      <JourneyHeader course={course} />

      <PillarTabs
        active={activePillar}
        onChange={setActivePillar}
        completed={completedPillars}
      />

      <div className="sec" style={{ paddingTop: 28 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 320px',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {/* MAIN COLUMN */}
          <div>
            <ContinueCard course={course} />

            {course.phases.map((phase) => (
              <PhaseSection
                key={phase.id}
                phase={phase}
                pillar={course.pillar}
              />
            ))}
          </div>

          {/* RIGHT SIDEBAR */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              position: 'sticky',
              top: 24,
            }}
          >
            <PillarSummaryCard course={course} />
            <RelatedResearch pillar={course.pillar} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
