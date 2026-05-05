import type { Integration } from '@/types';

/**
 * Mock integrations — covers both the Home ticker and the Flow dashboard
 * "Connected Apps" grid. `status` distinguishes the two.
 *
 * TODO: replace with API call — GET /integrations/me.
 */
export const mockIntegrations: Integration[] = [
  // ── Connected (synced) ───────────────────────────────────────────
  { id: 'strava',       name: 'Strava',       pillar: 'body', dotColor: '#FC4C02', status: 'connected', description: 'Activities synced' },
  { id: 'headspace',    name: 'Headspace',    pillar: 'mind', dotColor: '#F47C20', status: 'connected', description: 'Sessions synced' },
  { id: 'apple_health', name: 'Apple Health', pillar: 'body', dotColor: '#000000', status: 'connected', description: 'Steps, sleep, HRV' },
  { id: 'whoop',        name: 'Whoop',        pillar: 'body', dotColor: '#2B7DD4', status: 'connected', description: 'Recovery, strain' },

  // ── Coming soon ──────────────────────────────────────────────────
  { id: 'oura',         name: 'Oura Ring',    pillar: 'body',      dotColor: '#16213E', status: 'soon', description: 'Sleep stages, temp' },
  { id: 'spotify',      name: 'Spotify',      pillar: 'mind',      dotColor: '#1DB954', status: 'soon', description: 'Focus playlists' },
  { id: 'myfitnesspal', name: 'MyFitnessPal', pillar: 'lifestyle', dotColor: '#E8324A', status: 'soon', description: 'Nutrition, macros' },
  { id: 'garmin',       name: 'Garmin',       pillar: 'body',      dotColor: '#18916A', status: 'soon', description: 'GPS, VO2 max' },

  // ── Home ticker extras (display-only for Checkpoint A) ───────────
  { id: 'calm',         name: 'Calm',         pillar: 'mind',      dotColor: '#6B63CC', status: 'soon' },
  { id: 'notion',       name: 'Notion',       pillar: 'purpose',   dotColor: '#F7B731', status: 'soon' },
  { id: 'dropbox',      name: 'Dropbox',      dotColor: '#0061FE', status: 'soon' },
  { id: 'slack',        name: 'Slack',        dotColor: '#4A154B', status: 'soon' },
  { id: 'google_fit',   name: 'Google Fit',   pillar: 'body', dotColor: '#00897B', status: 'soon' },
  { id: 'reddit',       name: 'Reddit',       dotColor: '#FF5700', status: 'soon' },
  { id: 'linkedin',     name: 'LinkedIn',     dotColor: '#0077B5', status: 'soon' },
  { id: 'git',          name: 'Git',          dotColor: '#F05032', status: 'soon' },
];
