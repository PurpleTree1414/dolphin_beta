import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { ScoreHero } from '@/components/flow/ScoreHero';
import { TodaysLog } from '@/components/flow/TodaysLog';
import { HabitTracker } from '@/components/flow/HabitTracker';
import {
  Recommendations,
  type Recommendation,
} from '@/components/flow/Recommendations';
import { ConnectedApps } from '@/components/flow/ConnectedApps';
import {
  PillarDetailCard,
  type PillarMetricRow,
} from '@/components/flow/PillarDetailCard';
import { mockUser } from '@/mocks/user';
import { mockFlowSnapshot, mockMetrics, mockPillarMetrics } from '@/mocks/flow';
import { mockHabits } from '@/mocks/habits';
import { mockIntegrations } from '@/mocks/integrations';
import { PILLARS } from '@/lib/pillars';

// Recommendations are static for now — copy lifted from the prototype.
// When the backend lands, swap this for a fetch keyed on pillar deltas.
const RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'mind_attention',
    pillar: 'mind',
    tag: 'Low',
    title: 'Attention protocol',
    body: 'Mind at 68, your lowest pillar. A daily 10-min breathing session can raise it in 2 weeks.',
    cta: 'Start protocol',
  },
  {
    id: 'lifestyle_sleep',
    pillar: 'lifestyle',
    tag: 'Up',
    title: 'Sleep consistency +34%',
    body: 'Variance in sleep timing dropped this week. Your routine is working — protect it.',
    cta: 'View sleep data',
  },
  {
    id: 'purpose_journal',
    pillar: 'purpose',
    tag: 'Missed',
    title: '3 days no journaling',
    body: 'Purpose drops quickly without reflection. 5 minutes today maintains clarity.',
    cta: 'Open journal',
  },
];

/**
 * S2 · Flow Dashboard.
 *
 * Layout (matches dolphin_prototype_v3.html):
 *   • Dark score hero (ring + mini pillar rows + 7-day trend + April streak)
 *   • flow-grid 320px ┊ 1fr
 *       – Sidebar: Today's Log, Habits
 *       – Main:    Recommendations, Connected Apps, 4 Pillar detail cards
 *
 * Static page for Checkpoint C. Storage/interactive seams come later.
 */
export default function FlowPage() {
  // Filter integrations to the ones shown on the dashboard grid
  // (prototype lists 4 connected + 4 soon; skip ticker-only noise).
  const dashboardIntegrations = mockIntegrations.filter((i) =>
    ['strava', 'headspace', 'apple_health', 'whoop',
     'oura', 'spotify', 'myfitnesspal', 'garmin'].includes(i.id),
  );

  return (
    <>
      <TopNav active="flow" user={mockUser} />

      <ScoreHero
        snapshot={mockFlowSnapshot}
        displayName={mockUser.firstName}
        displayDate="Wednesday · April 8, 2025"
      />

      <div className="sec" style={{ paddingTop: 28 }}>
        <div className="flow-grid">
          {/* LEFT SIDEBAR */}
          <div className="sidebar">
            <TodaysLog metrics={mockMetrics} />
            <HabitTracker habits={mockHabits} />
          </div>

          {/* RIGHT MAIN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Recommendations items={RECOMMENDATIONS} />
            <ConnectedApps integrations={dashboardIntegrations} />

            <div className="g2" style={{ gap: 14 }}>
              {PILLARS.map((p) => (
                <PillarDetailCard
                  key={p}
                  pillar={p}
                  score={mockFlowSnapshot.pillars[p].score}
                  rows={mockPillarMetrics[p] as PillarMetricRow[]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
