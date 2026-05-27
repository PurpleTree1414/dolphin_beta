/**
 * One-time Knowledge Base migration.
 *
 * Converts the Notion-exported articles into the MDX files the site
 * already renders (src/content/kb/[pillar]/[articleId].mdx).
 *
 * RUN WITH tsx (no build step, resolves the project's @/* tsconfig
 * paths automatically):
 *
 *     npx tsx scripts/migrate-kb.ts
 *
 * Idempotent: it derives every output path from the canonical
 * structure and overwrites in place, so re-running reproduces the same
 * 122 files (including replacing the 4 original placeholder samples).
 *
 * SOURCE NOTES (verified before writing this script):
 *   • Sources live OUTSIDE the repo, on the Desktop (see SOURCE_BASE).
 *     They are not committed, so this is a local, one-time operation.
 *   • Body / Lifestyle / Purpose ship as loose *.md in a per-pillar
 *     "<Pillar> KB" folder.
 *   • Mind's loose PDFs use an OBSOLETE 12-section numbering and are
 *     ignored. The correct Mind markdown (9 sections, 2.1.1–2.9.3) is
 *     inside ExportBlock-*.zip → "Private & Shared/Mind KB/*.md", which
 *     we extract to a temp dir at runtime.
 *   • Purpose has two mis-numbered source files (duplicate Numbers
 *     4.6.3 and 4.7.2, with gaps at 4.6.2 and 4.7.1). When a Number
 *     collides, the file whose H1 exactly matches the structure title
 *     keeps the Number; the other is reassigned to the gap slot whose
 *     canonical title it matches. Every correction is logged.
 *
 * The ONLY content transformations applied (prose is otherwise
 * preserved verbatim):
 *   1. Strip the leading metadata block (# H1, Number/Section/Text).
 *   2. Convert standalone **Bold** lines into "## " subheadings so the
 *      Contents sidebar populates.
 *   3. Separate the trailing references block and re-emit it under a
 *      normalized "## References" heading (what MDXContent splits on),
 *      keeping each reference entry as-is.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { KB_PILLARS } from '../src/data/kb-structure';
import type { KBPillarKey } from '../src/types';

// ── Source locations ────────────────────────────────────────────────
const SOURCE_BASE =
  'C:\\Users\\louca\\Desktop\\cisco\\PURPLE TREE LABS\\Dolphin\\5. THEORY\\1. Research KB';

const PILLAR_DIRS: { key: KBPillarKey; dir: string }[] = [
  { key: 'body', dir: path.join(SOURCE_BASE, '1. BODY', 'Body KB') },
  { key: 'lifestyle', dir: path.join(SOURCE_BASE, '3. LIFESTYLE', 'Lifestyle KB') },
  { key: 'purpose', dir: path.join(SOURCE_BASE, '4. PURPOSE', 'Purpose KB') },
];

const MIND_ZIP = path.join(
  SOURCE_BASE,
  '2. MIND',
  'ExportBlock-e8a2a0e0-d22c-4176-bce5-b17983e92e5c-Part-1.zip',
);

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content', 'kb');

// ── Canonical lookup from the structure ─────────────────────────────
type Placement = {
  id: string;
  pillar: KBPillarKey;
  sectionId: string;
  slug: string;
  title: string;
};

const byNumber = new Map<string, Placement>();
const byTitleNorm = new Map<string, Placement>();

for (const pillar of KB_PILLARS) {
  for (const section of pillar.sections) {
    for (const article of section.articles) {
      const placement: Placement = {
        id: article.id,
        pillar: pillar.key,
        sectionId: section.id,
        slug: article.slug,
        title: article.title,
      };
      byNumber.set(article.id, placement);
      byTitleNorm.set(normTitle(article.title), placement);
    }
  }
}

/** Normalize a title for cross-source matching: lowercase alphanumerics only. */
function normTitle(s: string): string {
  return s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '');
}

// ── Parsed source representation ────────────────────────────────────
type ParsedSource = {
  filePath: string;
  rawNumber: string;
  h1: string;
  body: string; // cleaned main body (no metadata, bold→##, no references)
  references: string | null; // cleaned references entries, or null
};

function readSources(): ParsedSource[] {
  // Every source is mapped to its destination purely by the internal
  // Number field, so we only need the file paths here (the originating
  // folder is irrelevant to placement).
  const files: string[] = [];

  for (const { dir } of PILLAR_DIRS) {
    if (!fs.existsSync(dir)) {
      console.warn(`[warn] source dir missing: ${dir}`);
      continue;
    }
    for (const name of fs.readdirSync(dir)) {
      if (name.toLowerCase().endsWith('.md')) files.push(path.join(dir, name));
    }
  }

  // Mind: extract the zip's markdown to a temp dir (loose PDFs ignored).
  const mindDir = extractMind();
  if (mindDir) {
    for (const name of fs.readdirSync(mindDir)) {
      if (name.toLowerCase().endsWith('.md')) files.push(path.join(mindDir, name));
    }
  }

  return files.map(parseFile);
}

/** Extract the Mind zip's "Private & Shared/Mind KB" markdown to a temp dir. */
function extractMind(): string | null {
  if (!fs.existsSync(MIND_ZIP)) {
    console.warn(`[warn] Mind zip missing: ${MIND_ZIP}`);
    return null;
  }
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'kb-mind-'));
  try {
    // Use the system unzip (available in the Git Bash environment).
    execFileSync('unzip', ['-qo', MIND_ZIP, '-d', out], { stdio: 'ignore' });
  } catch {
    // Fallback to PowerShell Expand-Archive on Windows.
    execFileSync(
      'powershell',
      ['-NoProfile', '-Command', `Expand-Archive -LiteralPath '${MIND_ZIP}' -DestinationPath '${out}' -Force`],
      { stdio: 'ignore' },
    );
  }
  const mindKb = path.join(out, 'Private & Shared', 'Mind KB');
  return fs.existsSync(mindKb) ? mindKb : null;
}

// ── Parsing + cleaning ──────────────────────────────────────────────
function parseFile(filePath: string): ParsedSource {
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^﻿/, '');
  const lines = raw.split(/\r?\n/);

  // H1 = first non-empty line, expected to start with "# ".
  let h1 = '';
  for (const line of lines) {
    if (line.trim() === '') continue;
    h1 = line.replace(/^#+\s*/, '').trim();
    break;
  }

  // Number field.
  const numberLine = lines.find((l) => /^Number:/i.test(l.trim()));
  const rawNumber = numberLine ? numberLine.replace(/^Number:\s*/i, '').trim() : '';

  // Strip the leading metadata block: skip blanks, the H1, and any
  // Number/Section/Text lines until the first real body line.
  let start = 0;
  while (start < lines.length) {
    const t = lines[start]!.trim();
    if (t === '' || /^#\s/.test(t) || /^(Number|Section|Text):/i.test(t)) {
      start++;
    } else {
      break;
    }
  }
  let bodyLines = lines.slice(start);

  // Locate the references heading (LAST line that is a bold/##-style
  // "...References" heading, e.g. **References** or **Appendix: References**).
  let refIdx = -1;
  for (let i = bodyLines.length - 1; i >= 0; i--) {
    if (isReferencesHeading(bodyLines[i]!)) {
      refIdx = i;
      break;
    }
  }

  let references: string | null = null;
  if (refIdx !== -1) {
    const refBlock = bodyLines.slice(refIdx + 1);
    bodyLines = bodyLines.slice(0, refIdx);
    // Drop a trailing divider (--- or ___) and blank lines left behind.
    while (bodyLines.length > 0) {
      const last = bodyLines[bodyLines.length - 1]!.trim();
      if (last === '' || /^-{3,}$/.test(last) || /^_{3,}$/.test(last)) {
        bodyLines.pop();
      } else {
        break;
      }
    }
    const cleanedRefs = refBlock.join('\n').trim();
    references = cleanedRefs.length > 0 ? cleanedRefs : null;
  }

  // Convert standalone **Bold** lines into "## " subheadings.
  const converted = bodyLines.map((line) => {
    const t = line.trim();
    if (
      t.length > 4 &&
      t.startsWith('**') &&
      t.endsWith('**') &&
      t.slice(2, -2).indexOf('**') === -1
    ) {
      return `## ${t.slice(2, -2).trim()}`;
    }
    return line;
  });

  const body = collapseBlanks(converted.join('\n')).trim();

  return { filePath, rawNumber, h1, body, references };
}

/**
 * True for any heading-style line that denotes the references block.
 * Covers the observed variants — "References", "Appendix: References",
 * "Appendix: Academic References", "Academic References" — whether
 * written as bold (**…**) or a markdown heading, and whether or not
 * the source bolded it. Rejects prose sentences that merely contain
 * the word "reference" (singular / mid-sentence) by anchoring on a
 * short heading ending in the plural "references".
 */
function isReferencesHeading(line: string): boolean {
  const stripped = line.trim().replace(/^#+\s*/, '').replace(/\*/g, '').trim();
  return /^(appendix\s*:\s*)?(academic\s+)?references$/i.test(stripped);
}

/** Collapse 3+ consecutive blank lines down to a single blank line. */
function collapseBlanks(s: string): string {
  return s.replace(/\n{3,}/g, '\n\n');
}

// ── Resolution (Number → placement, with collision recovery) ────────
type Resolution = {
  placement: Placement;
  source: ParsedSource;
  corrected: boolean;
  correctionNote?: string;
};

function resolve(sources: ParsedSource[]): {
  resolutions: Resolution[];
  unmatched: ParsedSource[];
  duplicates: string[];
} {
  // Group sources by their raw Number.
  const groups = new Map<string, ParsedSource[]>();
  for (const s of sources) {
    const arr = groups.get(s.rawNumber) ?? [];
    arr.push(s);
    groups.set(s.rawNumber, arr);
  }

  const resolutions: Resolution[] = [];
  const unmatched: ParsedSource[] = [];
  const duplicates: string[] = [];
  const claimed = new Set<string>(); // structure numbers already assigned

  // Pass 1: unique numbers.
  for (const [num, arr] of groups) {
    if (arr.length === 1) {
      const src = arr[0]!;
      const placement = byNumber.get(num);
      if (placement && !claimed.has(num)) {
        claimed.add(num);
        resolutions.push({ placement, source: src, corrected: false });
      } else {
        unmatched.push(src);
      }
    }
  }

  // Pass 2: collisions — resolve by exact title match.
  for (const [num, arr] of groups) {
    if (arr.length <= 1) continue;
    duplicates.push(num);

    const target = byNumber.get(num);
    // The file whose title matches this Number's canonical title keeps it.
    let keeper: ParsedSource | undefined;
    if (target) {
      keeper = arr.find((s) => normTitle(s.h1) === normTitle(target.title));
    }
    if (keeper && !claimed.has(num) && target) {
      claimed.add(num);
      resolutions.push({ placement: target, source: keeper, corrected: false });
    }

    // The remaining files are reassigned by their title to the gap slot.
    for (const s of arr) {
      if (s === keeper) continue;
      const byTitle = byTitleNorm.get(normTitle(s.h1));
      if (byTitle && !claimed.has(byTitle.id)) {
        claimed.add(byTitle.id);
        resolutions.push({
          placement: byTitle,
          source: s,
          corrected: true,
          correctionNote: `source Number ${s.rawNumber} ("${s.h1}") reassigned to ${byTitle.id} by exact title match`,
        });
      } else {
        unmatched.push(s);
      }
    }
  }

  return { resolutions, unmatched, duplicates };
}

// ── MDX emission ────────────────────────────────────────────────────
function yamlString(s: string): string {
  return JSON.stringify(s); // valid YAML double-quoted scalar for our values
}

function buildMdx(p: Placement, src: ParsedSource): string {
  const hasReferences = src.references !== null;
  const fm = [
    '---',
    `title: ${yamlString(p.title)}`,
    `id: ${yamlString(p.id)}`,
    `pillar: ${p.pillar}`,
    `section: ${yamlString(p.sectionId)}`,
    `slug: ${yamlString(p.slug)}`,
    'knowledgeLens: foundation',
    'depth: introductory',
    'contentType: conceptual',
    `hasReferences: ${hasReferences}`,
    '---',
  ].join('\n');

  let out = `${fm}\n\n${src.body}\n`;
  if (hasReferences) {
    out += `\n## References\n\n${src.references}\n`;
  }
  return out;
}

// ── Main ────────────────────────────────────────────────────────────
function main(): void {
  const sources = readSources();
  const { resolutions, unmatched, duplicates } = resolve(sources);

  // Write files.
  const writtenByPillar: Record<KBPillarKey, number> = {
    body: 0,
    mind: 0,
    lifestyle: 0,
    purpose: 0,
  };
  for (const r of resolutions) {
    const dir = path.join(CONTENT_ROOT, r.placement.pillar);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${r.placement.id}.mdx`), buildMdx(r.placement, r.source), 'utf8');
    writtenByPillar[r.placement.pillar]++;
  }

  // Gaps: structure articles with no source file.
  const claimed = new Set(resolutions.map((r) => r.placement.id));
  const gaps: string[] = [];
  for (const id of byNumber.keys()) {
    if (!claimed.has(id)) gaps.push(id);
  }
  gaps.sort(sortNumeric);

  const totalWritten = resolutions.length;

  // ── Report ────────────────────────────────────────────────────────
  const line = '─'.repeat(64);
  console.log(`\n${line}\n  DOLPHIN KB MIGRATION REPORT\n${line}`);
  console.log(`  Files scanned:           ${sources.length}`);
  console.log(`  Successfully written:    ${totalWritten}`);
  console.log(`    • Body:                ${writtenByPillar.body}`);
  console.log(`    • Mind:                ${writtenByPillar.mind}`);
  console.log(`    • Lifestyle:           ${writtenByPillar.lifestyle}`);
  console.log(`    • Purpose:             ${writtenByPillar.purpose}`);

  const corrections = resolutions.filter((r) => r.corrected);
  console.log(`\n  Title-match corrections: ${corrections.length}`);
  for (const c of corrections) console.log(`    • ${c.correctionNote}`);

  console.log(`\n  Duplicate Numbers in source: ${duplicates.length}`);
  for (const d of duplicates.sort(sortNumeric)) console.log(`    • ${d}`);

  console.log(`\n  Unmatched source files: ${unmatched.length}`);
  for (const u of unmatched) {
    console.log(`    • Number="${u.rawNumber}" H1="${u.h1}" (${path.basename(u.filePath)})`);
  }

  console.log(`\n  Structure articles with NO source file (gaps): ${gaps.length}`);
  for (const g of gaps) {
    const pl = byNumber.get(g)!;
    console.log(`    • ${g} — ${pl.title} (${pl.pillar})`);
  }

  const ok = totalWritten === 122 && gaps.length === 0 && unmatched.length === 0;
  console.log(`\n${line}`);
  console.log(`  TOTAL WRITTEN = ${totalWritten} / 122  ${ok ? '✓ COMPLETE' : '✗ NEEDS REVIEW'}`);
  console.log(`${line}\n`);
}

function sortNumeric(a: string, b: string): number {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
}

main();
