import { TopNav } from '@/components/ui/TopNav';
import { Footer } from '@/components/ui/Footer';
import { PillarPcard } from '@/components/framework/PillarPcard';
import { mockUser } from '@/mocks/user';

/**
 * S1 · Framework — "Four Pillars of Dolphin".
 * Body copy + chips lifted verbatim from dolphin_prototype_v3.html.
 */
const PILLAR_CONTENT = {
  body: {
    body:
      'Build consistent energy through movement, recovery, and smart fueling for your day-to-day flow.',
    chips: ['Functional movement', 'Rested sleep', 'Adaptive fueling'] as [string, string, string],
  },
  mind: {
    body:
      'Develop clarity, focus, and cognitive resilience through applied neuroscience and evidence-based psychology.',
    chips: ['Focused attention', 'Stress regulation', 'Emotional clarity'] as [string, string, string],
  },
  lifestyle: {
    body:
      'Design your environment, routines, and behaviors to support long-term health, focus, and daily consistency.',
    chips: ['Daily rhythms', 'Environment design', 'Habit stacking'] as [string, string, string],
  },
  purpose: {
    body:
      'Clarify your values, identity, and direction to guide decisions and build long-term fulfillment.',
    chips: ['Values alignment', 'Identity clarity', 'Long-term vision'] as [string, string, string],
  },
} as const;

export default function FrameworkPage() {
  return (
    <>
      <TopNav active="framework" user={mockUser} />

      <div className="sec">
        <p className="ey" style={{ marginBottom: 8 }}>The Framework</p>
        <h2
          className="serif"
          style={{ fontSize: 34, fontWeight: 500, marginBottom: 10 }}
        >
          Four Pillars of Dolphin
        </h2>
        <p
          style={{
            fontSize: 14,
            color: 'var(--muted)',
            maxWidth: 520,
            marginBottom: 36,
            lineHeight: 1.65,
          }}
        >
          Each pillar is practical, research-backed, and built for people who steward both
          performance and wellbeing — integrated into a single score.
        </p>

        <div className="g2">
          <PillarPcard pillar="body"      {...PILLAR_CONTENT.body} />
          <PillarPcard pillar="mind"      {...PILLAR_CONTENT.mind} />
          <PillarPcard pillar="lifestyle" {...PILLAR_CONTENT.lifestyle} />
          <PillarPcard pillar="purpose"   {...PILLAR_CONTENT.purpose} />
        </div>
      </div>

      <Footer />
    </>
  );
}
