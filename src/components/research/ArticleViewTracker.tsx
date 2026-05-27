'use client';

import { useEffect } from 'react';
import { markArticleViewed } from '@/lib/storage';

/**
 * Side-effect-only component: marks an article as viewed in the storage
 * seam on mount. Renders nothing. Kept as a tiny client island so the
 * article page itself can remain a server component.
 *
 * TODO: replace with API call — POST /kb/articles/:id/view.
 */
export function ArticleViewTracker({ articleId }: { articleId: string }) {
  useEffect(() => {
    markArticleViewed(articleId);
  }, [articleId]);

  return null;
}
