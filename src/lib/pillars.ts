import type { Pillar } from '@/types';

export const PILLARS: readonly Pillar[] = ['body', 'mind', 'lifestyle', 'purpose'] as const;

export type PillarMeta = {
  label: string;
  /** Primary colour, matches --bc/--mc/--lc/--pc. */
  color: string;
  /** Light background tint, matches --bc2/--mc2/--lc2/--pc2. */
  colorLight: string;
  /** Border colour, matches --bc3/--mc3/--lc3/--pc3. */
  colorBorder: string;
  tag: string;
};

export const PILLAR_META: Record<Pillar, PillarMeta> = {
  body: {
    label: 'Body',
    color: '#2B7DD4',
    colorLight: '#E8F2FD',
    colorBorder: '#C2DCF7',
    tag: 'Movement, recovery & energy',
  },
  mind: {
    label: 'Mind',
    color: '#6B63CC',
    colorLight: '#EEEDFB',
    colorBorder: '#C5C1F0',
    tag: 'Focus, clarity & resilience',
  },
  lifestyle: {
    label: 'Lifestyle',
    color: '#18916A',
    colorLight: '#E3F5EE',
    colorBorder: '#A8DECE',
    tag: 'Routines, habits & environment',
  },
  purpose: {
    label: 'Purpose',
    color: '#B8780A',
    colorLight: '#FDF0DA',
    colorBorder: '#F0CA7A',
    tag: 'Values, identity & direction',
  },
};

/** CSS variable name for the main pillar colour. */
export const pillarVar = (p: Pillar): string =>
  ({ body: 'var(--bc)', mind: 'var(--mc)', lifestyle: 'var(--lc)', purpose: 'var(--pc)' }[p]);

/** CSS variable name for the light tint. */
export const pillarVarLight = (p: Pillar): string =>
  ({ body: 'var(--bc2)', mind: 'var(--mc2)', lifestyle: 'var(--lc2)', purpose: 'var(--pc2)' }[p]);

/** CSS variable name for the border shade. */
export const pillarVarBorder = (p: Pillar): string =>
  ({ body: 'var(--bc3)', mind: 'var(--mc3)', lifestyle: 'var(--lc3)', purpose: 'var(--pc3)' }[p]);
