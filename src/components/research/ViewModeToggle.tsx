'use client';

export type ViewMode = 'progression' | 'filter';

/**
 * Segmented toggle between the Pillar page's two views:
 * "Section Progression" (default) and "Deep Research Filter".
 * Controlled — parent owns the active mode.
 */
export function ViewModeToggle({
  mode,
  onChange,
  pillarColor,
}: {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
  pillarColor: string;
}) {
  const options: { key: ViewMode; label: string }[] = [
    { key: 'progression', label: 'Section Progression' },
    { key: 'filter', label: 'Deep Research Filter' },
  ];

  return (
    <div
      role="tablist"
      aria-label="View mode"
      style={{
        display: 'inline-flex',
        gap: 4,
        background: 'var(--bg)',
        border: '1px solid var(--bdr)',
        borderRadius: 'var(--r)',
        padding: 4,
      }}
    >
      {options.map((opt) => {
        const active = mode === opt.key;
        return (
          <button
            key={opt.key}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(opt.key)}
            style={{
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--ff)',
              fontSize: 13,
              fontWeight: 500,
              padding: '8px 16px',
              borderRadius: 7,
              background: active ? 'var(--surf)' : 'transparent',
              color: active ? pillarColor : 'var(--muted)',
              boxShadow: active ? 'var(--sh)' : 'none',
              transition: 'all .15s ease',
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
