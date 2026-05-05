import type { ResearchPillarEntry } from '@/types';

/**
 * Shallow Research mock — matches the four pillar entry cards in S3 of
 * dolphin_prototype_v3.html. Treemap, phases, subtopics, and article
 * detail are deferred to a later checkpoint per team alignment.
 *
 * TODO: replace with API call — GET /research/pillars.
 */
export const mockResearchEntries: ResearchPillarEntry[] = [
  {
    pillar: 'body',
    title: 'Body',
    description:
      'Physical capacity, movement quality, recovery, and systems that build resilience.',
    phaseCount: 4,
    subtopicCount: 12,
    articleCount: 36,
  },
  {
    pillar: 'mind',
    title: 'Mind',
    description:
      'Cognition, emotion, stress regulation, and how mental performance is shaped.',
    phaseCount: 4,
    subtopicCount: 12,
    articleCount: 36,
  },
  {
    pillar: 'lifestyle',
    title: 'Lifestyle',
    description:
      'Behavior, environment, and routines that stabilize daily health and energy.',
    phaseCount: 4,
    subtopicCount: 12,
    articleCount: 36,
  },
  {
    pillar: 'purpose',
    title: 'Purpose',
    description:
      'Meaning, motivation, identity, and long-term direction as pillars of fulfillment.',
    phaseCount: 4,
    subtopicCount: 12,
    articleCount: 36,
  },
];
