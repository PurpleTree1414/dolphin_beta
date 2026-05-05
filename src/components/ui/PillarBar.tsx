import type { Pillar } from '@/types';
import { PILLAR_META, pillarVar } from '@/lib/pillars';

/**
 * Label + score + thin progress bar. Used on the Home showcase card
 * and the Flow dashboard pillar detail cards.
 */
export function PillarBar({
  pillar,
  score,
  barHeight = 7,
}: {
  pillar: Pillar;
  score: number;
  barHeight?: number;
}) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 12,
          fontWeight: 600,
          marginBottom: 5,
        }}
      >
        <span style={{ color: pillarVar(pillar) }}>{PILLAR_META[pillar].label}</span>
        <span style={{ color: 'var(--muted)' }}>{score}</span>
      </div>
      <div className="bar-track" style={{ height: barHeight }}>
        <div
          className="bar-fill"
          style={{ width: `${Math.max(0, Math.min(100, score))}%`, background: pillarVar(pillar) }}
        />
      </div>
    </div>
  );
}
