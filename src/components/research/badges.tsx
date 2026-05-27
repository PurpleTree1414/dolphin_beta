import type { KBDepth, KBKnowledgeLens } from '@/types';
import { DEPTH_LABEL, LENS_LABEL } from '@/lib/kb-labels';

/**
 * Small presentational primitives shared by the Article Map and the
 * Deep Research filter rows. Client-safe (no server imports).
 */

/** Neutral outlined pill for the depth level. */
export function DepthBadge({ depth }: { depth: KBDepth }) {
  return (
    <span
      style={{
        fontSize: 10.5,
        fontWeight: 600,
        letterSpacing: '.04em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
        background: 'var(--bg)',
        border: '1px solid var(--bdr)',
        borderRadius: 6,
        padding: '2px 8px',
      }}
    >
      {DEPTH_LABEL[depth]}
    </span>
  );
}

/** Pillar-tinted pill for the knowledge lens. */
export function LensBadge({
  lens,
  pillarColor,
  pillarColorLight,
}: {
  lens: KBKnowledgeLens;
  pillarColor: string;
  pillarColorLight: string;
}) {
  return (
    <span
      style={{
        fontSize: 10.5,
        fontWeight: 600,
        letterSpacing: '.04em',
        textTransform: 'uppercase',
        color: pillarColor,
        background: pillarColorLight,
        borderRadius: 6,
        padding: '2px 8px',
      }}
    >
      {LENS_LABEL[lens]}
    </span>
  );
}

/** Small dot indicating an article has been viewed. */
export function ViewedDot({
  viewed,
  color,
}: {
  viewed: boolean;
  color: string;
}) {
  return (
    <span
      aria-label={viewed ? 'Viewed' : 'Not viewed'}
      title={viewed ? 'Viewed' : 'Not viewed'}
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        flexShrink: 0,
        background: viewed ? color : 'transparent',
        border: viewed ? `1px solid ${color}` : '1px solid var(--bdr2)',
        display: 'inline-block',
      }}
    />
  );
}

/** Minimal geometric glyph per knowledge lens. */
export function LensIcon({
  lens,
  size = 14,
  color,
}: {
  lens: KBKnowledgeLens;
  size?: number;
  color: string;
}) {
  if (lens === 'foundation') {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="2" y="9" width="12" height="4" rx="1" stroke={color} strokeWidth="1.6" />
        <rect x="4" y="4" width="8" height="4" rx="1" stroke={color} strokeWidth="1.6" />
      </svg>
    );
  }
  if (lens === 'mechanism') {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="2.4" stroke={color} strokeWidth="1.6" />
        <path
          d="M8 1.6v2M8 12.4v2M1.6 8h2M12.4 8h2M3.5 3.5l1.4 1.4M11.1 11.1l1.4 1.4M12.5 3.5l-1.4 1.4M4.9 11.1l-1.4 1.4"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  // application
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h8M8 4l4 4-4 4"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
