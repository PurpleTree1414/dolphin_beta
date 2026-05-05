/**
 * "🔥 14 · day streak" pill. Used on Home showcase + Flow dashboard hero.
 * Supports light (Home) and dark (Flow hero) surface variants.
 */
export function StreakBadge({
  days,
  variant = 'light',
}: {
  days: number;
  variant?: 'light' | 'dark';
}) {
  const dark = variant === 'dark';
  return (
    <div
      className="streak-wrap"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: dark ? '10px 16px' : '8px 14px',
        background: dark
          ? 'linear-gradient(90deg,#2A1D0A,#3A2510)'
          : 'linear-gradient(90deg,#FFF3DC,#FDF0DA)',
        border: `1px solid ${dark ? '#6B4B15' : 'var(--pc3)'}`,
        borderRadius: 10,
      }}
    >
      <span style={{ fontSize: dark ? 24 : 18 }}>🔥</span>
      <div>
        <p
          style={{
            fontSize: dark ? 20 : 14,
            fontWeight: 700,
            color: dark ? '#F0A832' : 'var(--pc)',
            lineHeight: 1,
          }}
        >
          {days}
        </p>
        <p
          style={{
            fontSize: dark ? 11 : 10,
            color: dark ? '#B8842A' : 'var(--pc)',
            fontWeight: 500,
          }}
        >
          day streak
        </p>
      </div>
    </div>
  );
}
