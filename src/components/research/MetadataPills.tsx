import type { KBDepth, KBKnowledgeLens } from '@/types';
import { DEPTH_LABEL, LENS_LABEL } from '@/lib/kb-labels';

/**
 * Metadata pill row beneath the article title. Each pill pairs a muted
 * label with its value: Pillar, Section, Knowledge Lens, Depth.
 */
export function MetadataPills({
  pillarName,
  sectionName,
  lens,
  depth,
}: {
  pillarName: string;
  sectionName: string;
  lens: KBKnowledgeLens;
  depth: KBDepth;
}) {
  const pills: { label: string; value: string }[] = [
    { label: 'Pillar', value: pillarName },
    { label: 'Section', value: sectionName },
    { label: 'Knowledge Lens', value: LENS_LABEL[lens] },
    { label: 'Depth', value: DEPTH_LABEL[depth] },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32, maxWidth: 800 }}>
      {pills.map((pill) => (
        <span
          key={pill.label}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'var(--surf)',
            border: '1px solid var(--bdr)',
            borderRadius: 'var(--r)',
            padding: '6px 12px',
            fontSize: 12,
          }}
        >
          <span
            style={{
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '.06em',
              fontSize: 10,
              fontWeight: 600,
            }}
          >
            {pill.label}
          </span>
          <span style={{ color: 'var(--text)', fontWeight: 500 }}>{pill.value}</span>
        </span>
      ))}
    </div>
  );
}
