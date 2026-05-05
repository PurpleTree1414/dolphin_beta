import Link from 'next/link';
import type { ResearchPillarEntry } from '@/types';
import { pillarVar, pillarVarLight } from '@/lib/pillars';
import { PillarIcon } from '@/components/ui/PillarIcon';

/**
 * Pillar entry card on the /research hub page.
 * Card top-border is the pillar colour; icon glyph uses the same colour.
 */
export function PillarEntryCard({ entry }: { entry: ResearchPillarEntry }) {
  return (
    <div
      style={{
        background: 'var(--surf)',
        border: '1px solid var(--bdr)',
        borderTop: `3px solid ${pillarVar(entry.pillar)}`,
        borderRadius: 'var(--rlg)',
        padding: 22,
        boxShadow: 'var(--sh)',
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 9,
          background: pillarVarLight(entry.pillar),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 12,
        }}
      >
        <PillarIcon pillar={entry.pillar} size={18} color={pillarVar(entry.pillar)} />
      </div>

      <p
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: pillarVar(entry.pillar),
          marginBottom: 6,
        }}
      >
        {entry.title}
      </p>
      <p
        style={{
          fontSize: 12,
          color: 'var(--muted)',
          lineHeight: 1.55,
          marginBottom: 12,
        }}
      >
        {entry.description}
      </p>
      <p style={{ fontSize: 11, color: 'var(--faint)', marginBottom: 16 }}>
        {entry.phaseCount} phases · {entry.subtopicCount} subtopics · {entry.articleCount} articles
      </p>

      <Link
        href="/research"
        style={{
          fontSize: 13,
          color: pillarVar(entry.pillar),
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Explore depth →
      </Link>
    </div>
  );
}
