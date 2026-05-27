import type {
  KBArticleMeta,
  KBContentType,
  KBDepth,
  KBKnowledgeLens,
  KBPillar,
  KBPillarKey,
  KBSection,
} from '@/types';
import { PILLAR_META } from '@/lib/pillars';

/**
 * The canonical Knowledge Base skeleton — Pillar → Section → Article.
 *
 * This is the single source of truth for navigation, counts, slugs and
 * the Deep Research analytics. Article PROSE lives separately as MDX in
 * src/content/kb/[pillar]/[articleId].mdx and is loaded on demand by
 * lib/kb.ts — never inlined here.
 *
 * Counts (asserted at module load below):
 *   Body       11 sections / 33 articles
 *   Mind        9 sections / 27 articles
 *   Lifestyle  10 sections / 29 articles
 *   Purpose    11 sections / 33 articles
 *   ─────────────────────────────────────
 *   Total      41 sections / 122 articles
 *
 * NOTE: the source brief's SUMMARY line states Purpose 32 / 121 total,
 * but its own enumerated Purpose structure lists 33 articles (4.2 has
 * four; all others as shown). The enumeration is authoritative, so the
 * true total is 122. Counts are computed live everywhere — if Purpose
 * is later trimmed to 32, every surface updates automatically.
 *
 * Per-article metadata (lens / depth / contentType) is assigned for the
 * sample articles that ship with real MDX; every other article defaults
 * to foundation / introductory / conceptual and will be corrected during
 * the content migration. See SAMPLE_META below.
 */

// ── kebab-case slug helper ──────────────────────────────────────────
// Deterministic and dependency-free: lowercase, strip punctuation,
// collapse whitespace to single hyphens.
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ── Terse source representation ─────────────────────────────────────
// `[sectionNumber, sectionName, [[articleNumber, articleTitle], ...]]`
type RawArticle = [number: string, title: string];
type RawSection = [number: string, name: string, articles: RawArticle[]];
type RawPillar = {
  key: KBPillarKey;
  name: string;
  description: string;
  sections: RawSection[];
};

/**
 * Metadata overrides for articles that ship with real MDX content this
 * session. Everything else falls back to the defaults below.
 */
const SAMPLE_META: Record<
  string,
  { knowledgeLens: KBKnowledgeLens; depth: KBDepth; contentType: KBContentType }
> = {
  '1.1.1': { knowledgeLens: 'foundation', depth: 'introductory', contentType: 'conceptual' },
  '1.7.1': { knowledgeLens: 'mechanism', depth: 'intermediate', contentType: 'conceptual' },
  '2.1.1': { knowledgeLens: 'foundation', depth: 'introductory', contentType: 'conceptual' },
  '4.1.1': { knowledgeLens: 'foundation', depth: 'intermediate', contentType: 'conceptual' },
};

const DEFAULT_META = {
  knowledgeLens: 'foundation' as KBKnowledgeLens,
  depth: 'introductory' as KBDepth,
  contentType: 'conceptual' as KBContentType,
};

const RAW: RawPillar[] = [
  {
    key: 'body',
    name: 'Body',
    description:
      'Movement, recovery, fuel, and the physiological systems that power your day — the science of physical resilience.',
    sections: [
      ['1.1', 'Foundations: Your Body as a System', [
        ['1.1.1', 'Body Awareness and Interoception'],
        ['1.1.2', 'Movement Foundations: Patterns and Quality'],
        ['1.1.3', 'Posture and Joint Alignment'],
      ]],
      ['1.2', 'Nutrition as Fuel', [
        ['1.2.1', 'Energy Availability and Eating for Performance'],
        ['1.2.2', 'Macronutrients and Food Quality'],
        ['1.2.3', 'Hydration and Meal Timing'],
      ]],
      ['1.3', 'Daily Movement', [
        ['1.3.1', 'Daily Movement and NEAT'],
        ['1.3.2', 'Sedentary Behaviour and Ergonomics'],
        ['1.3.3', 'Movement Snacks and Micro-Workouts'],
      ]],
      ['1.4', 'Cardiovascular Health and Aerobic Training', [
        ['1.4.1', 'Heart Health Foundations'],
        ['1.4.2', 'Aerobic Training and Endurance'],
        ['1.4.3', 'High-Intensity Interval Training (HIIT)'],
      ]],
      ['1.5', 'Strength Training', [
        ['1.5.1', 'Starting Strength: Movement Patterns and Exercise Selection'],
        ['1.5.2', 'Progressive Overload and Technique'],
        ['1.5.3', 'Programming: Frequency, Volume and Combining Cardio with Strength'],
      ]],
      ['1.6', 'Recovery', [
        ['1.6.1', 'Rest Days and Deload Planning'],
        ['1.6.2', 'Active vs Passive Recovery and Recovery Modalities'],
        ['1.6.3', 'DOMS, Overtraining, and Burnout'],
      ]],
      ['1.7', 'Sleep', [
        ['1.7.1', 'Sleep Fundamentals and Circadian Rhythm'],
        ['1.7.2', 'Sleep Quality and Hygiene'],
        ['1.7.3', 'Bedtime Routines and Strategic Napping'],
      ]],
      ['1.8', 'Hormones and Metabolism', [
        ['1.8.1', 'The Stress Response: HPA Axis, Cortisol and Recovery'],
        ['1.8.2', 'Metabolism, Energy Balance, and Blood Sugar'],
        ['1.8.3', 'Hormonal Health: Exercise, Sleep, and Signs of Balance'],
      ]],
      ['1.9', 'Breathing', [
        ['1.9.1', 'Breath Control Fundamentals'],
        ['1.9.2', 'CO2 Tolerance and Respiratory Strength'],
        ['1.9.3', 'Breathing for Stress, Performance, and Sleep'],
      ]],
      ['1.10', 'Body Signals and Tracking', [
        ['1.10.1', 'Tracking Progress Beyond the Scale'],
        ['1.10.2', 'Key Health Markers: HRV, RHR, Blood Pressure, and Composition'],
        ['1.10.3', 'Reading Your Signals: Energy, Mood, and When to Adjust'],
      ]],
      ['1.11', 'Injury Prevention and Longevity', [
        ['1.11.1', 'Load Management and Movement Screening'],
        ['1.11.2', 'Prehab and Injury Resilience'],
        ['1.11.3', 'Rehab and Movement Longevity'],
      ]],
    ],
  },
  {
    key: 'mind',
    name: 'Mind',
    description:
      'Cognition, emotion, attention, and resilience — the applied neuroscience and psychology of mental performance.',
    sections: [
      ['2.1', 'Awareness and the Inner Life', [
        ['2.1.1', 'Mental Awareness and Metacognition'],
        ['2.1.2', 'Attention and Perception'],
        ['2.1.3', 'Cognitive Biases and Self-Knowledge'],
      ]],
      ['2.2', 'Emotions and Their Construction', [
        ['2.2.1', 'Understanding Emotions'],
        ['2.2.2', 'Emotional Awareness and Labelling'],
        ['2.2.3', 'Emotional Triggers and Patterns'],
      ]],
      ['2.3', 'Focus and Attention', [
        ['2.3.1', 'Focus and Distraction'],
        ['2.3.2', 'Deep Focus and Flow'],
        ['2.3.3', 'Information Overload and Cognitive Load'],
      ]],
      ['2.4', 'Mental Energy and Recovery', [
        ['2.4.1', 'Mental Fatigue and Recovery'],
        ['2.4.2', 'Circadian Rhythms and Cognition'],
        ['2.4.3', 'Mental Rest vs Avoidance'],
      ]],
      ['2.5', 'Stress and the Mind', [
        ['2.5.1', 'Stress Physiology, Revisited'],
        ['2.5.2', 'The Stress-Performance Curve'],
        ['2.5.3', 'Cognitive Reappraisal and Reframing'],
      ]],
      ['2.6', 'Emotional Regulation and Resilience', [
        ['2.6.1', 'Grounding and Emotional Stabilization'],
        ['2.6.2', 'Coping Mechanisms'],
        ['2.6.3', 'Mental Flexibility and Adaptation'],
      ]],
      ['2.7', 'Burnout and Warning Signs', [
        ['2.7.1', 'Recognising Mental Burnout'],
        ['2.7.2', 'Cognitive Overtraining'],
        ['2.7.3', "What to Do When You're Already Burned Out"],
      ]],
      ['2.8', 'Reflective Practice', [
        ['2.8.1', 'The Case for Reflection'],
        ['2.8.2', 'Mindfulness and Meditation'],
        ['2.8.3', 'Journalling and Structured Self-Reflection'],
      ]],
      ['2.9', 'Sustainable Mental Performance', [
        ['2.9.1', 'Building Psychological Resilience'],
        ['2.9.2', 'Stress Inoculation'],
        ['2.9.3', 'Sustainable Mental Performance'],
      ]],
    ],
  },
  {
    key: 'lifestyle',
    name: 'Lifestyle',
    description:
      'Routines, habits, environment, and connection — designing the daily systems that make health automatic.',
    sections: [
      ['3.1', 'Daily Systems and Routines', [
        ['3.1.1', 'The Logic of Daily Routines'],
        ['3.1.2', 'Morning and Evening Anchor Routines'],
        ['3.1.3', 'Weekly Structure and Planning'],
      ]],
      ['3.2', 'Habit Architecture', [
        ['3.2.1', 'What Habits Actually Are'],
        ['3.2.2', 'Identity and Habits'],
        ['3.2.3', 'Building New Habits'],
        ['3.2.4', 'Maintaining and Breaking Habits'],
      ]],
      ['3.3', 'Environment Design', [
        ['3.3.1', 'The Environment-Behaviour Relationship'],
        ['3.3.2', 'Friction and Ease'],
        ['3.3.3', 'Designing Supportive Spaces'],
      ]],
      ['3.4', 'Sleep Consistency', [
        ['3.4.1', 'Sleep Consistency as Foundation'],
        ['3.4.2', 'Light Exposure and Circadian Anchoring'],
      ]],
      ['3.5', 'Nutrition Consistency', [
        ['3.5.1', 'The Logic of Nutrition Consistency'],
        ['3.5.2', 'Practical Nutrition Tracking'],
        ['3.5.3', 'Sustainable Nutrition Patterns'],
      ]],
      ['3.6', 'Social Connection', [
        ['3.6.1', 'Social Connection as a Health Determinant'],
        ['3.6.2', 'Quality of Connection over Quantity'],
        ['3.6.3', 'Building and Maintaining Connection'],
      ]],
      ['3.7', 'Work-Life Balance', [
        ['3.7.1', 'The Meaning of Work-Life Balance'],
        ['3.7.2', 'Boundaries and Disconnection'],
        ['3.7.3', 'Recovery from Work'],
      ]],
      ['3.8', 'Energy and Pacing', [
        ['3.8.1', 'Daily Energy Patterns'],
        ['3.8.2', 'Sustainable Pacing'],
        ['3.8.3', 'Lifestyle Stressors'],
      ]],
      ['3.9', 'Burnout and Warning Signs', [
        ['3.9.1', 'Recognising Lifestyle Burnout'],
        ['3.9.2', 'Lifestyle Resets'],
      ]],
      ['3.10', 'Long-Term Lifestyle Evolution', [
        ['3.10.1', 'Seasonal Recalibration'],
        ['3.10.2', 'Life Transitions'],
        ['3.10.3', 'Sustainable Lifestyle Evolution'],
      ]],
    ],
  },
  {
    key: 'purpose',
    name: 'Purpose',
    description:
      'Values, identity, motivation, and meaning — the long-game work of direction and fulfilment.',
    sections: [
      ['4.1', 'Self-Knowledge and Identity', [
        ['4.1.1', 'Understanding Oneself'],
        ['4.1.2', 'Identity and Self-Concept'],
        ['4.1.3', 'Internal Alignment'],
      ]],
      ['4.2', 'Values and Direction', [
        ['4.2.1', 'What Values Are'],
        ['4.2.2', 'Identifying Your Core Values'],
        ['4.2.3', 'Direction vs Goals'],
        ['4.2.4', 'Personal Vision'],
      ]],
      ['4.3', 'Motivation', [
        ['4.3.1', 'Intrinsic vs Extrinsic Motivation'],
        ['4.3.2', 'Dopamine and Drive'],
        ['4.3.3', 'Motivation Myths'],
      ]],
      ['4.4', 'Discipline and Commitment', [
        ['4.4.1', 'Commitment over Motivation'],
        ['4.4.2', 'Discipline Frameworks'],
        ['4.4.3', 'Consistency Under Friction'],
      ]],
      ['4.5', 'Goals and Goal-Setting', [
        ['4.5.1', 'Healthy Goal-Setting'],
        ['4.5.2', 'Process vs Outcome'],
        ['4.5.3', 'Avoiding Goal Traps'],
      ]],
      ['4.6', 'Decisions and Trade-Offs', [
        ['4.6.1', 'Value-Based Decisions'],
        ['4.6.2', 'Trade-Offs and Priorities'],
        ['4.6.3', 'Long-Term Thinking'],
      ]],
      ['4.7', 'Growth and Failure', [
        ['4.7.1', 'Growth Through Discomfort'],
        ['4.7.2', 'Learning From Failure'],
        ['4.7.3', 'Adaptive Mindset'],
      ]],
      ['4.8', 'Meaning and Service', [
        ['4.8.1', 'Purpose Beyond Self'],
        ['4.8.2', 'Service and Impact'],
        ['4.8.3', 'Meaningful Contribution'],
      ]],
      ['4.9', 'When Purpose Gets Lost', [
        ['4.9.1', 'Losing Direction'],
        ['4.9.2', 'Value Misalignment'],
      ]],
      ['4.10', 'Reflection and Re-Alignment', [
        ['4.10.1', 'The Practice of Reflection'],
        ['4.10.2', 'Re-Aligning Values'],
        ['4.10.3', 'Periodic Life Review'],
      ]],
      ['4.11', 'Lifelong Purpose', [
        ['4.11.1', 'Meaning Through Life Stages'],
        ['4.11.2', 'Evolving Purpose'],
        ['4.11.3', 'Integration into Daily Life'],
      ]],
    ],
  },
];

// ── Expand the terse source into the fully-typed structure ──────────
function buildArticle([number, title]: RawArticle): KBArticleMeta {
  const meta = SAMPLE_META[number] ?? DEFAULT_META;
  return {
    id: number,
    number,
    slug: slugify(title),
    title,
    knowledgeLens: meta.knowledgeLens,
    depth: meta.depth,
    contentType: meta.contentType,
  };
}

function buildSection([number, name, articles]: RawSection): KBSection {
  return {
    id: number,
    number,
    slug: slugify(name),
    name,
    articles: articles.map(buildArticle),
  };
}

function buildPillar(raw: RawPillar): KBPillar {
  const meta = PILLAR_META[raw.key];
  return {
    key: raw.key,
    name: raw.name,
    description: raw.description,
    color: meta.color,
    colorLight: meta.colorLight,
    colorBorder: meta.colorBorder,
    sections: raw.sections.map(buildSection),
  };
}

export const KB_PILLARS: KBPillar[] = RAW.map(buildPillar);

// ── Aggregate counts (computed once) ────────────────────────────────
export const KB_TOTALS = {
  pillars: KB_PILLARS.length,
  sections: KB_PILLARS.reduce((n, p) => n + p.sections.length, 0),
  articles: KB_PILLARS.reduce(
    (n, p) => n + p.sections.reduce((m, s) => m + s.articles.length, 0),
    0,
  ),
};

// ── Dev-time integrity guard ────────────────────────────────────────
// Catches transcription drift early. Stripped in production by the
// bundler's dead-code elimination when NODE_ENV === 'production'.
if (process.env.NODE_ENV !== 'production') {
  const expected = { pillars: 4, sections: 41, articles: 122 } as const;
  if (
    KB_TOTALS.pillars !== expected.pillars ||
    KB_TOTALS.sections !== expected.sections ||
    KB_TOTALS.articles !== expected.articles
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      `[kb-structure] count mismatch — got ${JSON.stringify(KB_TOTALS)}, expected ${JSON.stringify(expected)}`,
    );
  }
}
