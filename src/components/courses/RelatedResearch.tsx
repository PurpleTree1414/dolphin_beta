import Link from 'next/link';
import type { Pillar } from '@/types';
import { PILLAR_META, pillarVar, pillarVarLight } from '@/lib/pillars';

/**
 * Small right-rail card linking from a course's pillar to its
 * Research pillar entry. Static copy for now — when Research is
 * built out, this should link deeper into the relevant subtopic.
 */
export function RelatedResearch({ pillar }: { pillar: Pillar }) {
  return (
    <div className="card" style={{ padding: 18 }}>
      <p className="ey" style={{ marginBottom: 10 }}>
        Related research
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 6,
            background: pillarVarLight(pillar),
            color: pillarVar(pillar),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 12,
            flexShrink: 0,
          }}
        >
          {PILLAR_META[pillar].label[0]}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>
            {PILLAR_META[pillar].label} research library
          </p>
          <p
            style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.55 }}
          >
            Go deeper on the mechanisms behind every lesson.
          </p>
        </div>
      </div>
      <Link
        href="/research"
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: pillarVar(pillar),
          textDecoration: 'none',
        }}
      >
        Browse library →
      </Link>
    </div>
  );
}
