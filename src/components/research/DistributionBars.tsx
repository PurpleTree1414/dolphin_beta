/**
 * Labelled percentage bars for one distribution (lens / depth /
 * content). Decoupled from the data layer — receives pre-computed rows
 * so it stays a pure presentational component. Bars are tinted in the
 * pillar colour over a neutral track.
 */
export function DistributionBars({
  title,
  rows,
  pillarColor,
}: {
  title: string;
  rows: { label: string; count: number; pct: number }[];
  pillarColor: string;
}) {
  return (
    <div style={{ marginBottom: 22 }}>
      <p className="ey" style={{ marginBottom: 12, fontSize: 10 }}>
        {title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {rows.map((row) => (
          <div key={row.label}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 11.5,
                marginBottom: 4,
              }}
            >
              <span style={{ color: 'var(--muted)' }}>{row.label}</span>
              <span style={{ color: 'var(--text)', fontWeight: 500 }}>{row.pct}%</span>
            </div>
            <div className="bar-track" style={{ height: 5 }}>
              <div
                className="bar-fill"
                style={{ width: `${row.pct}%`, background: pillarColor }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
