import type { KBContentType, KBDepth, KBKnowledgeLens } from '@/types';

/**
 * Pure, client-safe display labels for KB metadata enums. Kept separate
 * from lib/kb.ts (which imports node:fs) so client components can import
 * labels without dragging server-only code into the browser bundle.
 */

export const LENS_LABEL: Record<KBKnowledgeLens, string> = {
  foundation: 'Foundation',
  mechanism: 'Mechanism',
  application: 'Application',
};

export const DEPTH_LABEL: Record<KBDepth, string> = {
  introductory: 'Introductory',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export const CONTENT_LABEL: Record<KBContentType, string> = {
  conceptual: 'Conceptual',
  practical: 'Practical',
  data: 'Data',
};

export const LENS_ORDER: KBKnowledgeLens[] = [
  'foundation',
  'mechanism',
  'application',
];
export const DEPTH_ORDER: KBDepth[] = [
  'introductory',
  'intermediate',
  'advanced',
];
export const CONTENT_ORDER: KBContentType[] = [
  'conceptual',
  'practical',
  'data',
];
