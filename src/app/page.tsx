import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { Hero } from '@/components/home/Hero';
import { FlowShowcase } from '@/components/home/FlowShowcase';
import { FourPillarsTeaser } from '@/components/home/FourPillarsTeaser';
import { IntegrationsSection } from '@/components/home/IntegrationsSection';
import { FooterCTA } from '@/components/home/FooterCTA';
import { mockFlowSnapshot, mockMetrics } from '@/mocks/flow';
import { mockHabits } from '@/mocks/habits';
import { mockIntegrations } from '@/mocks/integrations';

/**
 * S0 · Home
 *
 * 1:1 port of dolphin_prototype_v3.html. User is intentionally `null` —
 * the Home page is the marketing/guest surface. Once backend auth lands,
 * swap `user={null}` for a real fetch that gates behind /assessment when
 * the user is signed in but not onboarded.
 */
export default function HomePage() {
  // Integrations shown on the hero teaser grid — subset matching the
  // prototype (skip the "Notion/Dropbox/Slack/etc" ticker-only noise here).
  const heroIntegrations = mockIntegrations.filter((i) =>
    ['strava', 'headspace', 'apple_health', 'spotify', 'whoop', 'oura',
     'calm', 'myfitnesspal', 'notion', 'garmin', 'dropbox', 'slack',
     'google_fit', 'reddit', 'linkedin', 'git'].includes(i.id),
  );

  return (
    <>
      <TopNav active="home" user={null} />

      <Hero
        showcase={
          <FlowShowcase
            snapshot={mockFlowSnapshot}
            habits={mockHabits}
            metrics={mockMetrics}
            displayName="Francisco"
            displayDate="Wed, April 8"
          />
        }
      />

      <div className="sec">
        <FourPillarsTeaser />
        <IntegrationsSection integrations={heroIntegrations} />
      </div>

      <FooterCTA />
      <Footer />
    </>
  );
}
