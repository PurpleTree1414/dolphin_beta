import Link from 'next/link';
import type { ReactNode } from 'react';
import { PillarBadge } from '@/components/ui/PillarBadge';

/**
 * Home hero — the split "Engineer your flow." headline on the left,
 * showcase card on the right. Backdrop uses `--hero-light` token.
 *
 * The showcase card is passed in as `showcase` so this component stays
 * dumb about what's on the right (FlowShowcase in the default wire-up,
 * but we can swap in a mock card later for marketing captures).
 */
export function Hero({ showcase }: { showcase: ReactNode }) {
  return (
    <div className="hero-wrap">
      <div className="hero-left">
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 20 }}>
          <PillarBadge pillar="body" />
          <PillarBadge pillar="mind" />
          <PillarBadge pillar="lifestyle" />
          <PillarBadge pillar="purpose" />
        </div>

        <h1 className="hero">
          Engineer <em>your flow.</em>
        </h1>

        <p className="hero-sub">
          A science-backed system to measure your wellbeing, improve your habits, and strengthen
          your four core pillars — all in one score.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/assessment" className="btn btn-p" style={{ textDecoration: 'none' }}>
            Start Your Flow →
          </Link>
          <Link href="/framework" className="btn btn-o" style={{ textDecoration: 'none' }}>
            Explore Framework
          </Link>
        </div>
      </div>

      {showcase}
    </div>
  );
}
