import type { CSSProperties } from 'react';
import type { Pillar } from '@/types';
import { PILLAR_META, pillarVar, pillarVarLight } from '@/lib/pillars';

/** Small tinted pill — matches .badge with pillar colour family. */
export function PillarBadge({
  pillar,
  label,
  style,
}: {
  pillar: Pillar;
  /** Defaults to the pillar's label (Body / Mind / Lifestyle / Purpose). */
  label?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className="badge"
      style={{
        background: pillarVarLight(pillar),
        color: pillarVar(pillar),
        ...style,
      }}
    >
      {label ?? PILLAR_META[pillar].label}
    </span>
  );
}
