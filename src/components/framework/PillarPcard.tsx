import Link from 'next/link';
import type { Pillar } from '@/types';
import { PILLAR_META, pillarVar, pillarVarLight } from '@/lib/pillars';
import { PillarIcon } from '@/components/ui/PillarIcon';

/**
 * Large framework pillar card — one per pillar on /framework.
 * Takes body copy and three "chips" from the caller so we can keep the
 * content copy close to where we edit it.
 */
export function PillarPcard({
  pillar,
  body,
  chips,
}: {
  pillar: Pillar;
  body: string;
  chips: [string, string, string];
}) {
  return (
    <div
      className="pcard"
      style={{
        background: pillarVarLight(pillar),
        borderColor: pillarVar(pillar),
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: pillarVar(pillar),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 18,
        }}
      >
        <PillarIcon pillar={pillar} size={22} color="#fff" />
      </div>

      <h3
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: pillarVar(pillar),
          marginBottom: 8,
        }}
      >
        {PILLAR_META[pillar].label}
      </h3>
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.7,
          color: pillarVar(pillar),
          opacity: 0.85,
          marginBottom: 16,
        }}
      >
        {body}
      </p>

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 20 }}>
        {chips.map((c) => (
          <span key={c} className="chip" style={{ background: pillarVar(pillar) }}>
            {c}
          </span>
        ))}
      </div>

      <Link
        href="/research"
        style={{
          fontSize: 13,
          color: pillarVar(pillar),
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Explore {PILLAR_META[pillar].label} research →
      </Link>
    </div>
  );
}
