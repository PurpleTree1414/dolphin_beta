import type { Integration } from '@/types';

/** Dotted integration pill used in the Home integrations grid. */
export function IntegrationBadge({ integration }: { integration: Integration }) {
  return (
    <span
      className="int-badge"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '7px 16px',
        background: 'var(--surf)',
        border: '1px solid var(--bdr)',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 500,
        color: 'var(--muted)',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: integration.dotColor,
        }}
      />
      {integration.name}
    </span>
  );
}
