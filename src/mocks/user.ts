import type { User } from '@/types';

/**
 * Mock user — pulled from the prototype's signed-in state.
 * TODO: replace with API call — GET /users/me from Supabase.
 */
export const mockUser: User = {
  id: 'user_francisco',
  firstName: 'Francisco',
  avatarInitial: 'F',
  weights: { body: 25, mind: 20, lifestyle: 20, purpose: 35 },
  onboardedAt: '2025-03-15T09:00:00.000Z',
};
