import type { Config } from 'tailwindcss';

/**
 * Tailwind config — token aliases mirror CSS variables in globals.css.
 * Prototype uses terse var names (--bc/--mc/--lc/--pc) as the source of truth;
 * semantic aliases (body/mind/lifestyle/purpose) are exposed alongside for readability.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Surfaces
        bg: 'var(--bg)',
        surf: 'var(--surf)',
        // Text
        text: 'var(--text)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        // Borders
        bdr: 'var(--bdr)',
        bdr2: 'var(--bdr2)',
        // Pillars — semantic
        body: {
          DEFAULT: 'var(--bc)',
          light: 'var(--bc2)',
          border: 'var(--bc3)',
        },
        mind: {
          DEFAULT: 'var(--mc)',
          light: 'var(--mc2)',
          border: 'var(--mc3)',
        },
        lifestyle: {
          DEFAULT: 'var(--lc)',
          light: 'var(--lc2)',
          border: 'var(--lc3)',
        },
        purpose: {
          DEFAULT: 'var(--pc)',
          light: 'var(--pc2)',
          border: 'var(--pc3)',
        },
      },
      fontFamily: {
        sans: ['var(--ff)'],
        serif: ['var(--fd)'],
      },
      borderRadius: {
        r: 'var(--r)',
        rlg: 'var(--rlg)',
        rxl: 'var(--rxl)',
      },
      boxShadow: {
        sh: 'var(--sh)',
        sh2: 'var(--sh2)',
      },
      maxWidth: {
        content: '1240px',
      },
      backgroundImage: {
        'hero-dark':
          'linear-gradient(135deg, #0D1420 0%, #162038 60%, #1A1836 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
