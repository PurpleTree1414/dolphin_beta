import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type {
  KBArticleMeta,
  KBContentType,
  KBDepth,
  KBKnowledgeLens,
  KBPillar,
  KBSection,
} from '@/types';
import { KB_PILLARS, slugify } from '@/data/kb-structure';

/**
 * Knowledge Base data access.
 *
 * Pure structure helpers (getAllPillars / findPillar / …) are safe to
 * call from anywhere. `getArticleContent` touches the filesystem via
 * `node:fs` + gray-matter, so it must only run on the server — every
 * page in /research is a server component that loads data here and
 * passes plain serialisable props down to client leaf components, so
 * no client bundle ever imports this module's fs paths.
 *
 * MDX library choice: gray-matter (frontmatter) + react-markdown
 * (render, in MDXContent). Heading slugs are produced by the shared
 * `slugify` from kb-structure so the ContentsSidebar anchors line up
 * deterministically with the ids MDXContent assigns to h2/h3.
 */

// ── Structure lookups ───────────────────────────────────────────────

export function getAllPillars(): KBPillar[] {
  return KB_PILLARS;
}

export function findPillar(pillarSlug: string): KBPillar | undefined {
  return KB_PILLARS.find((p) => p.key === pillarSlug);
}

export function findSection(
  pillarSlug: string,
  sectionSlug: string,
): KBSection | undefined {
  return findPillar(pillarSlug)?.sections.find((s) => s.slug === sectionSlug);
}

export function findArticle(
  pillarSlug: string,
  sectionSlug: string,
  articleSlug: string,
): KBArticleMeta | undefined {
  return findSection(pillarSlug, sectionSlug)?.articles.find(
    (a) => a.slug === articleSlug,
  );
}

/** Flat list of every article in a pillar (used by the Deep Research filter). */
export function getPillarArticles(
  pillarSlug: string,
): { section: KBSection; article: KBArticleMeta }[] {
  const pillar = findPillar(pillarSlug);
  if (!pillar) return [];
  return pillar.sections.flatMap((section) =>
    section.articles.map((article) => ({ section, article })),
  );
}

// ── Sibling + related navigation ────────────────────────────────────

export type SiblingArticles = {
  prev: KBArticleMeta | undefined;
  next: KBArticleMeta | undefined;
};

/**
 * Prev/next within the SAME section, located by article id. Returns
 * `undefined` at the section's start/end so the page can disable the
 * corresponding control.
 */
export function getSiblingArticles(articleId: string): SiblingArticles {
  for (const pillar of KB_PILLARS) {
    for (const section of pillar.sections) {
      const idx = section.articles.findIndex((a) => a.id === articleId);
      if (idx !== -1) {
        return {
          prev: idx > 0 ? section.articles[idx - 1] : undefined,
          next:
            idx < section.articles.length - 1
              ? section.articles[idx + 1]
              : undefined,
        };
      }
    }
  }
  return { prev: undefined, next: undefined };
}

export type RelatedArticle = {
  pillarSlug: string;
  sectionSlug: string;
  article: KBArticleMeta;
};

/**
 * Up to `limit` articles drawn from OTHER sections in the same pillar,
 * for the article footer's "Related" links.
 */
export function getRelatedArticles(
  pillarSlug: string,
  currentSectionId: string,
  limit = 2,
): RelatedArticle[] {
  const pillar = findPillar(pillarSlug);
  if (!pillar) return [];
  const out: RelatedArticle[] = [];
  for (const section of pillar.sections) {
    if (section.id === currentSectionId) continue;
    const first = section.articles[0];
    if (first) {
      out.push({ pillarSlug, sectionSlug: section.slug, article: first });
    }
    if (out.length >= limit) break;
  }
  return out;
}

// ── Distributions over a section's REAL article count ───────────────

export type Distribution<T extends string> = {
  /** Ordered category → { count, pct } over the section's article total. */
  rows: { key: T; count: number; pct: number }[];
  total: number;
};

export type SectionDistributions = {
  lens: Distribution<KBKnowledgeLens>;
  depth: Distribution<KBDepth>;
  content: Distribution<KBContentType>;
};

const LENS_ORDER: KBKnowledgeLens[] = ['foundation', 'mechanism', 'application'];
const DEPTH_ORDER: KBDepth[] = ['introductory', 'intermediate', 'advanced'];
const CONTENT_ORDER: KBContentType[] = ['conceptual', 'practical', 'data'];

function distribution<T extends string>(
  order: T[],
  values: T[],
): Distribution<T> {
  const total = values.length;
  const rows = order.map((key) => {
    const count = values.filter((v) => v === key).length;
    const pct = total === 0 ? 0 : Math.round((count / total) * 100);
    return { key, count, pct };
  });
  return { rows, total };
}

export function getSectionDistributions(section: KBSection): SectionDistributions {
  return {
    lens: distribution(LENS_ORDER, section.articles.map((a) => a.knowledgeLens)),
    depth: distribution(DEPTH_ORDER, section.articles.map((a) => a.depth)),
    content: distribution(CONTENT_ORDER, section.articles.map((a) => a.contentType)),
  };
}

// ── MDX content loading (SERVER ONLY) ───────────────────────────────

export type KBHeading = { level: 2 | 3; text: string; slug: string };

export type KBArticleContent = {
  frontmatter: Record<string, unknown>;
  /** Raw markdown body (frontmatter stripped). */
  content: string;
  /** h2/h3 headings, in document order, for the Contents sidebar. */
  headings: KBHeading[];
};

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content', 'kb');

/**
 * Load + parse an article's MDX file. Returns `null` when the file
 * does not exist (→ the page renders a "Content coming soon" card).
 *
 * @param pillarKey directory under src/content/kb (e.g. "body")
 * @param articleId dotted id / filename stem (e.g. "1.7.1")
 */
export function getArticleContent(
  pillarKey: string,
  articleId: string,
): KBArticleContent | null {
  const file = path.join(CONTENT_ROOT, pillarKey, `${articleId}.mdx`);
  let raw: string;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch {
    return null; // missing file is an expected, graceful state
  }

  const { data, content } = matter(raw);
  return {
    frontmatter: data,
    content,
    headings: extractHeadings(content),
  };
}

/**
 * Pull h2/h3 headings from raw markdown. Skips fenced code blocks so a
 * commented "## " inside a snippet isn't mistaken for a heading.
 */
function extractHeadings(markdown: string): KBHeading[] {
  const headings: KBHeading[] = [];
  let inFence = false;
  for (const line of markdown.split('\n')) {
    if (line.trimStart().startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.*\S)\s*$/.exec(line);
    if (match) {
      const level = match[1]!.length === 2 ? 2 : 3;
      const text = match[2]!.replace(/#+\s*$/, '').trim();
      headings.push({ level, text, slug: slugify(text) });
    }
  }
  return headings;
}
