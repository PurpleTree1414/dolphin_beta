'use client';

import { useState } from 'react';
import Link from 'next/link';
import type {
  KBArticleMeta,
  KBContentType,
  KBDepth,
  KBKnowledgeLens,
} from '@/types';
import {
  CONTENT_LABEL,
  CONTENT_ORDER,
  DEPTH_LABEL,
  DEPTH_ORDER,
  LENS_LABEL,
  LENS_ORDER,
} from '@/lib/kb-labels';
import { useKBViewed } from './useKBViewed';
import { DepthBadge, LensBadge, ViewedDot } from './badges';

export type FilterItem = { sectionSlug: string; article: KBArticleMeta };

/**
 * Deep Research Filter view on the Pillar page. Checkbox filters for
 * lens / depth / content type, and a flat, filtered list of every
 * article in the pillar. Empty selection in a group means "no
 * constraint". Shows an explicit empty state when nothing matches.
 */
export function DeepResearchFilter({
  pillarSlug,
  items,
  pillarColor,
  pillarColorLight,
}: {
  pillarSlug: string;
  items: FilterItem[];
  pillarColor: string;
  pillarColorLight: string;
}) {
  const { viewed } = useKBViewed();
  const [lens, setLens] = useState<Set<KBKnowledgeLens>>(new Set());
  const [depth, setDepth] = useState<Set<KBDepth>>(new Set());
  const [content, setContent] = useState<Set<KBContentType>>(new Set());

  const matches = items.filter(({ article }) => {
    const lensOk = lens.size === 0 || lens.has(article.knowledgeLens);
    const depthOk = depth.size === 0 || depth.has(article.depth);
    const contentOk = content.size === 0 || content.has(article.contentType);
    return lensOk && depthOk && contentOk;
  });

  const anyFilter = lens.size + depth.size + content.size > 0;

  return (
    <div>
      <div className="card" style={{ marginBottom: 18 }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            justifyContent: 'space-between',
          }}
        >
          <FilterGroup
            title="Knowledge Lens"
            options={LENS_ORDER.map((k) => ({ key: k, label: LENS_LABEL[k] }))}
            selected={lens}
            onToggle={(k) => setLens(toggle(lens, k))}
            pillarColor={pillarColor}
          />
          <FilterGroup
            title="Depth"
            options={DEPTH_ORDER.map((k) => ({ key: k, label: DEPTH_LABEL[k] }))}
            selected={depth}
            onToggle={(k) => setDepth(toggle(depth, k))}
            pillarColor={pillarColor}
          />
          <FilterGroup
            title="Content Type"
            options={CONTENT_ORDER.map((k) => ({ key: k, label: CONTENT_LABEL[k] }))}
            selected={content}
            onToggle={(k) => setContent(toggle(content, k))}
            pillarColor={pillarColor}
          />
        </div>
        {anyFilter && (
          <button
            type="button"
            onClick={() => {
              setLens(new Set());
              setDepth(new Set());
              setContent(new Set());
            }}
            style={{
              marginTop: 16,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--ff)',
              fontSize: 12,
              color: pillarColor,
              fontWeight: 600,
              padding: 0,
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>
        {matches.length} article{matches.length === 1 ? '' : 's'}
        {anyFilter ? ' match your filters' : ' in this pillar'}
      </p>

      {matches.length === 0 ? (
        <div
          className="card"
          style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)' }}
        >
          <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 4, color: 'var(--text)' }}>
            No articles match these filters
          </p>
          <p style={{ fontSize: 12.5 }}>Try removing a constraint to widen the results.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {matches.map(({ sectionSlug, article }) => (
            <Link
              key={article.id}
              href={`/research/${pillarSlug}/${sectionSlug}/${article.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                textDecoration: 'none',
                color: 'inherit',
                background: 'var(--surf)',
                border: '1px solid var(--bdr)',
                borderRadius: 'var(--r)',
                padding: '13px 16px',
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: pillarColor,
                  width: 44,
                  flexShrink: 0,
                }}
              >
                {article.number}
              </span>
              <span style={{ flex: 1, minWidth: 0, fontSize: 14, fontWeight: 500 }}>
                {article.title}
              </span>
              <DepthBadge depth={article.depth} />
              <LensBadge
                lens={article.knowledgeLens}
                pillarColor={pillarColor}
                pillarColorLight={pillarColorLight}
              />
              <ViewedDot viewed={viewed.has(article.id)} color={pillarColor} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterGroup<T extends string>({
  title,
  options,
  selected,
  onToggle,
  pillarColor,
}: {
  title: string;
  options: { key: T; label: string }[];
  selected: Set<T>;
  onToggle: (key: T) => void;
  pillarColor: string;
}) {
  return (
    <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
      <legend className="ey" style={{ fontSize: 10, marginBottom: 10 }}>
        {title}
      </legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map((opt) => {
          const checked = selected.has(opt.key);
          return (
            <label
              key={opt.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                cursor: 'pointer',
                color: checked ? 'var(--text)' : 'var(--muted)',
              }}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(opt.key)}
                style={{ accentColor: pillarColor, width: 15, height: 15, cursor: 'pointer' }}
              />
              {opt.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function toggle<T>(set: Set<T>, key: T): Set<T> {
  const next = new Set(set);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  return next;
}
