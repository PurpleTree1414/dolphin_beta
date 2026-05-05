import type { Pillar } from '@/types';

/**
 * The 4 pillar glyphs used across Home, Framework, Research, Courses.
 * SVG paths lifted verbatim from the prototype.
 */
export function PillarIcon({
  pillar,
  size = 22,
  color = '#fff',
}: {
  pillar: Pillar;
  size?: number;
  color?: string;
}) {
  switch (pillar) {
    case 'body':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'mind':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="4" stroke={color} strokeWidth={2} />
          <path
            d="M12 2v2M12 20v2M2 12h2M20 12h2"
            stroke={color}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </svg>
      );
    case 'lifestyle':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 2C8 6 4 8 4 13a8 8 0 0 0 16 0c0-5-4-7-8-11z"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
      );
    case 'purpose':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} />
          <circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth={1.8} />
        </svg>
      );
  }
}
