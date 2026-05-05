import type { FlowSnapshot, Habit, Metric } from '@/types';
import { FlowRing, type RingSpec } from '@/components/flow/FlowRing';
import { PillarBar } from '@/components/ui/PillarBar';
import { StreakBadge } from '@/components/ui/StreakBadge';
import { PILLAR_META, pillarVar } from '@/lib/pillars';

/**
 * Animated Flow card shown on the Home hero (right side).
 * Mirrors `.fsc-card` from dolphin_prototype_v3.html:
 *  header (Today's Flow + streak) → ring + pillar bars → habits snippet → mini metrics.
 *
 * Read-only showcase; no interactivity on Home.
 */
export function FlowShowcase({
  snapshot,
  habits,
  metrics,
  displayName,
  displayDate,
}: {
  snapshot: FlowSnapshot;
  habits: Habit[];
  metrics: Metric[];
  /** e.g. "Francisco" */
  displayName: string;
  /** e.g. "Wed, April 8" */
  displayDate: string;
}) {
  // 3 concentric rings for the Home showcase — outer Flow, middle Body, inner Mind.
  // (Dashboard uses a 4-ring variant; Home sticks with 3 per the prototype.)
  const rings: RingSpec[] = [
    { pillar: 'body',      score: snapshot.score,               radius: 64, stroke: 12 },
    { pillar: 'mind',      score: snapshot.pillars.mind.score,  radius: 50, stroke: 8 },
    { pillar: 'lifestyle', score: snapshot.pillars.lifestyle.score, radius: 38, stroke: 7 },
  ];

  const habitsDone = habits.filter((h) => h.doneToday).length;

  // Show first 3 habits in the snippet — the prototype caps at 3.
  const snippet = habits.slice(0, 3);

  // 4 mini metric tiles — Sleep / Steps / HRV / Focus.
  const miniKeys = ['sleep', 'steps', 'hrv', 'focus'] as const;
  const mini = miniKeys
    .map((k) => metrics.find((m) => m.key === k))
    .filter((m): m is Metric => Boolean(m));

  return (
    <div className="flow-showcase">
      <div className="fsc-card">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 18,
          }}
        >
          <div>
            <p className="ey" style={{ marginBottom: 3 }}>Today&apos;s Flow</p>
            <p style={{ fontSize: 13, color: 'var(--muted)' }}>
              {displayDate} · {displayName}
            </p>
          </div>
          <StreakBadge days={snapshot.streakDays} variant="light" />
        </div>

        {/* Ring + pillar bars */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 22 }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <FlowRing
              size={148}
              viewBoxSize={160}
              rings={rings}
              centerValue={snapshot.score}
              centerLabel="FLOW SCORE"
              variant="light"
              showPulseDot
            />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <PillarBar pillar="body"      score={snapshot.pillars.body.score} />
            <PillarBar pillar="mind"      score={snapshot.pillars.mind.score} />
            <PillarBar pillar="lifestyle" score={snapshot.pillars.lifestyle.score} />
            <PillarBar pillar="purpose"   score={snapshot.pillars.purpose.score} />
          </div>
        </div>

        {/* Today's habits snippet */}
        <div style={{ borderTop: '1px solid var(--bdr)', paddingTop: 16 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <p className="ey">Today&apos;s Habits</p>
            <span style={{ fontSize: 11, color: 'var(--lc)', fontWeight: 600 }}>
              {habitsDone} / {habits.length} done
            </span>
          </div>
          {snippet.map((h) => (
            <div key={h.id} className="habit-row">
              <div className={`tick${h.doneToday ? ' done' : ''}`}>
                {h.doneToday && (
                  <svg width="11" height="11" viewBox="0 0 12 12">
                    <polyline
                      points="2,6 5,9 10,3"
                      fill="none"
                      stroke="#fff"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span
                style={{
                  fontSize: 13,
                  color: h.doneToday ? 'var(--text)' : 'var(--muted)',
                }}
              >
                {h.label}
                {h.doneToday && h.detail ? ` · ${detailHead(h.detail)}` : ''}
              </span>
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: 11,
                  color: h.doneToday ? pillarVar(h.pillar) : 'var(--faint)',
                }}
              >
                {sourceOrPillar(h)}
              </span>
            </div>
          ))}
        </div>

        {/* Mini metrics row */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
          {mini.map((m) => (
            <div
              key={m.key}
              style={{
                flex: 1,
                minWidth: 72,
                background: 'var(--bg)',
                borderRadius: 9,
                padding: '10px 12px',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>
                {m.value}
                {m.unit && m.unit !== '' ? m.unit : ''}
              </p>
              <p style={{ fontSize: 10, color: 'var(--muted)' }}>{miniLabel(m)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** "5.2 km · via Strava" → "5.2 km". Falls back to the whole string. */
function detailHead(detail: string): string {
  const first = detail.split(' · ')[0];
  return first ?? detail;
}

/** Show source name (e.g. "Strava") when done, otherwise the pillar label. */
function sourceOrPillar(h: Habit): string {
  if (h.doneToday && h.source) {
    return SOURCE_LABELS[h.source] ?? PILLAR_META[h.pillar].label;
  }
  return PILLAR_META[h.pillar].label;
}

/** Compact metric label for the showcase tiles. */
function miniLabel(m: Metric): string {
  switch (m.key) {
    case 'sleep': return 'Sleep';
    case 'steps': return 'Steps';
    case 'hrv':   return 'HRV';
    case 'focus': return 'Focus';
    default:      return m.label;
  }
}

const SOURCE_LABELS: Partial<Record<NonNullable<Habit['source']>, string>> = {
  strava: 'Strava',
  headspace: 'Headspace',
  apple_health: 'Apple Health',
  whoop: 'Whoop',
  oura: 'Oura',
  spotify: 'Spotify',
  garmin: 'Garmin',
  myfitnesspal: 'MyFitnessPal',
  internal: 'Dolphin',
};
