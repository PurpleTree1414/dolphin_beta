import type { Integration } from '@/types';
import { IntegrationBadge } from '@/components/ui/IntegrationBadge';

/**
 * "Unified with your ecosystem" — static flex-wrap grid of integration pills.
 * The animated marquee ticker is intentionally omitted for the first checkpoint.
 */
export function IntegrationsSection({
  integrations,
  footnote = '+ 40 more enterprise & fitness integrations available',
}: {
  integrations: Integration[];
  footnote?: string;
}) {
  return (
    <div style={{ marginTop: 64, textAlign: 'center' }}>
      <h3
        className="serif"
        style={{ fontSize: 28, fontWeight: 500, marginBottom: 12 }}
      >
        Unified with your ecosystem
      </h3>
      <p
        style={{
          fontSize: 14,
          color: 'var(--muted)',
          maxWidth: 600,
          margin: '0 auto 32px',
          lineHeight: 1.6,
        }}
      >
        Dolphin doesn&apos;t live in isolation. We offer a vast library of native integrations to
        automatically capture your physiological data, focus sessions, and movement patterns from
        the tools you already love.
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 10,
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        {integrations.map((i) => (
          <IntegrationBadge key={i.id} integration={i} />
        ))}
      </div>

      <p style={{ fontSize: 12, color: 'var(--faint)', marginTop: 24 }}>{footnote}</p>
    </div>
  );
}
