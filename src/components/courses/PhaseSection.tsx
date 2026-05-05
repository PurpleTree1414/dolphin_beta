import type { Phase, Pillar } from '@/types';
import { LessonCard } from './LessonCard';

/**
 * A collapsible-looking group of lessons for one phase. The header
 * shows a numbered chip, the phase title, and a status label
 * (Complete / In Progress / Locked).
 *
 * When a phase has no lessons (Mind/Lifestyle/Purpose placeholders),
 * we render a single "Coming soon" row so the section still feels
 * structured and the layout doesn't collapse.
 */
export function PhaseSection({
  phase,
  pillar,
}: {
  phase: Phase;
  pillar: Pillar;
}) {
  const statusLabel =
    phase.status === 'done'
      ? 'Complete'
      : phase.status === 'active'
      ? 'In Progress'
      : 'Locked';

  const statusColor =
    phase.status === 'done'
      ? 'var(--lc)'
      : phase.status === 'active'
      ? 'var(--bc)'
      : 'var(--faint)';

  return (
    <section style={{ marginBottom: 28 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: statusColor,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {phase.number}
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 600 }}>
          Phase {phase.number} — {phase.title}
        </h3>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '.1em',
            color: statusColor,
            marginLeft: 'auto',
          }}
        >
          {statusLabel}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {phase.lessons.length === 0 ? (
          <div
            style={{
              padding: '14px 20px',
              border: '1px dashed var(--bdr)',
              borderRadius: 'var(--r)',
              fontSize: 12,
              color: 'var(--muted)',
              textAlign: 'center',
            }}
          >
            Lessons for this phase are coming soon.
          </div>
        ) : (
          phase.lessons.map((l) => (
            <LessonCard key={l.id} lesson={l} pillar={pillar} />
          ))
        )}
      </div>
    </section>
  );
}
