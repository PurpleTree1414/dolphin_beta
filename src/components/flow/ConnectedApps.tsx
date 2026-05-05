import type { Integration } from '@/types';
import { pillarVarLight } from '@/lib/pillars';

/**
 * Connected Apps grid on the Flow dashboard — 2-col card grid with a
 * tinted square icon + name/description + status dot. Uses the app's
 * `dotColor` for the icon tint (desaturated) and status accent.
 */
export function ConnectedApps({ integrations }: { integrations: Integration[] }) {
  return (
    <div className="card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 18,
        }}
      >
        <div>
          <p className="ey" style={{ marginBottom: 3 }}>Connected Apps</p>
          <p style={{ fontSize: 12, color: 'var(--muted)' }}>
            Sync your data — everything flows into your score automatically.
          </p>
        </div>
        <button
          className="btn btn-o"
          style={{ fontSize: 12, padding: '7px 14px' }}
          type="button"
        >
          Manage
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 9 }}>
        {integrations.map((i) => {
          const connected = i.status === 'connected';
          return (
            <div
              key={i.id}
              className="int-card"
              style={connected ? undefined : { opacity: 0.6 }}
            >
              <div
                className="int-icon"
                style={{
                  background: i.pillar ? pillarVarLight(i.pillar) : tintHex(i.dotColor),
                }}
              >
                {/* Initials fallback — logos land in a follow-up. */}
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: i.dotColor,
                    letterSpacing: '-.02em',
                  }}
                >
                  {initials(i.name)}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 500 }}>{i.name}</p>
                <p style={{ fontSize: 11, color: 'var(--muted)' }}>{i.description ?? ''}</p>
              </div>

              {connected ? (
                <div className="int-status-dot status-connected" />
              ) : (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    background: 'var(--bg)',
                    color: 'var(--faint)',
                    padding: '2px 7px',
                    borderRadius: 5,
                    marginLeft: 'auto',
                  }}
                >
                  Soon
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Derive 1–2 initials from an app name — "Apple Health" → "AH". */
function initials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2 && words[0] && words[1]) {
    return (words[0][0] ?? '').toUpperCase() + (words[1][0] ?? '').toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

/** Add transparency to a hex colour for icon tinting. Cheap, good-enough. */
function tintHex(hex: string): string {
  // Assume #RRGGBB; fall back to a neutral tint if malformed.
  if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return '#F0F0F0';
  return `${hex}22`;
}
