'use client';

import { useEffect, useState } from 'react';
import { getKBEngagement } from '@/lib/storage';

/**
 * Reads the set of viewed KB article ids from the storage seam once on
 * mount. SSR-safe: returns an empty set during server render and the
 * first client paint, then fills in after mount (so viewed-dots and the
 * engagement donut light up without a hydration mismatch).
 *
 * `ready` lets callers avoid flashing a "0 viewed" state before the
 * real value is known.
 */
export function useKBViewed(): { viewed: Set<string>; ready: boolean } {
  const [viewed, setViewed] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setViewed(new Set(getKBEngagement().articlesViewed));
    setReady(true);
  }, []);

  return { viewed, ready };
}
