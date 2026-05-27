'use client';

import { useEffect, useState } from 'react';

/**
 * SSR-safe media-query hook. Returns `false` on the server and first
 * paint, then the real match after mount. Used to drive responsive
 * layout switches via inline styles, so we avoid adding global CSS for
 * the Research section.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
