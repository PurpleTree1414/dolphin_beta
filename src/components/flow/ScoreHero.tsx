import type { FlowSnapshot } from '@/types';
import { PILLARS, PILLAR_META, pillarVar } from '@/lib/pillars';
import { FlowRing, type RingSpec } from './FlowRing';
import { TrendChart } from './TrendChart';
import { StreakCalendar } from './StreakCalendar';
import { StreakBadge } from '@/components/ui/StreakBadge';

/**
 * Dark hero on the Flow dashboard — ring + mini pillar rows + 7-day trend +
 * April streak calendar. Pure display, all client data comes from `snapshot`.
 */
export function ScoreHero({
  snapshot,
  displayName,
  displayDate,
}: {
  snapshot: FlowSnapshot;
  /** "Francisco" */
  displayName: string;
  /** "Wednesday · April 8, 2025" */
  displayDate: string;
}) {
  // 4 concentric rings for the Flow dashboard (vs 3 on Home).
  const rings: RingSpec[] = [
    { pillar: 'body',      score: snapshot.score,                     radius: 76, stroke: 13 },
    { pillar: 'mind',      score: snapshot.pillars.mind.score,        radius: 60, stroke: 10 },
    { pillar: 'lifestyle', score: snapshot.pillars.lifestyle.score,   radius: 46, stroke: 9 },
    { pillar: 'purpose',   score: snapshot.pillars.purpose.score,     radius: 33, stroke: 8 },
  ];

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0D1420 0%, #162038 60%, #1A1836 100%)',
        padding: '36px 40px',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        {/* Header row: date + greeting + streak + CTA */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: '#4A6080',
                marginBottom: 4,
              }}
            >
              {displayDate}
            </p>
            <h2 style={{ fontSize: 28, fontWeight: 600, color: '#fff', marginBottom: 4 }}>
              Welcome back, {displayName}
            </h2>
            <p style={{ fontSize: 14, color: '#5A7090' }}>
              Your flow is trending up this week. Keep going.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <StreakBadge days={snapshot.streakDays} variant="dark" />
            <button
              className="btn btn-p"
              style={{ fontSize: 13, padding: '9px 18px' }}
              type="button"
            >
              Log Today
            </button>
          </div>
        </div>

        {/* Score row: ring + trend + streak calendar */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'stretch' }}>
          {/* Ring + mini score rows */}
          <div
            style={{
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 'var(--rlg)',
              padding: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 28,
              flex: '0 0 auto',
            }}
          >
            <FlowRing
              size={160}
              viewBoxSize={180}
              rings={rings}
              centerValue={snapshot.score}
              centerLabel="FLOW SCORE"
              variant="dark"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 160 }}>
              {PILLARS.map((p) => {
                const ps = snapshot.pillars[p];
                const positive = ps.delta >= 0;
                return (
                  <div key={p} className="mini-score-row">
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 3,
                        background: pillarVar(p),
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{ fontSize: 13, color: '#CBD5E1', flex: 1, marginLeft: 4 }}
                    >
                      {PILLAR_META[p].label}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>
                      {ps.score}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: positive ? '#18916A' : '#E87070',
                        fontWeight: 500,
                        marginLeft: 4,
                      }}
                    >
                      {positive ? '+' : ''}
                      {ps.delta}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 7-day trend */}
          <div
            style={{
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 'var(--rlg)',
              padding: 24,
              flex: 1,
              minWidth: 220,
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '.09em',
                textTransform: 'uppercase',
                color: '#4A6080',
                marginBottom: 16,
              }}
            >
              7-Day Trend
            </p>
            <TrendChart trend={snapshot.trend7d} />
          </div>

          {/* Streak calendar */}
          <div
            style={{
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 'var(--rlg)',
              padding: 24,
              flex: '0 0 auto',
              minWidth: 220,
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '.09em',
                textTransform: 'uppercase',
                color: '#4A6080',
                marginBottom: 16,
              }}
            >
              April Streak
            </p>
            <StreakCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}
