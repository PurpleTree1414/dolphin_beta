import type { Course } from '@/types';

/**
 * Dark gradient header on /courses with title, overall progress, and the
 * 4-phase path visual. Prototype's "overall" = selected course's progress
 * (one pillar at a time, not cross-pillar).
 */
export function JourneyHeader({ course }: { course: Course }) {
  const percent = Math.round(
    (course.completedLessons / Math.max(1, course.totalLessons)) * 100,
  );

  return (
    <div className="journey-header">
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        {/* Title + overall percentage */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: '#4A6080',
                marginBottom: 8,
              }}
            >
              Your Journey
            </p>
            <h2>
              Build your flow,
              <br />
              <em style={{ color: '#5B9FE8' }}>one pillar at a time.</em>
            </h2>
            <p style={{ marginTop: 10 }}>
              Each course follows the Dolphin framework: four phases, each deeper than the last.
              Applied science you actually use.
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>{percent}%</p>
            <p style={{ fontSize: 12, color: '#4A6080', marginBottom: 8 }}>overall progress</p>
            <div
              style={{
                width: 160,
                height: 5,
                borderRadius: 3,
                background: 'rgba(255,255,255,.1)',
                overflow: 'hidden',
                marginLeft: 'auto',
              }}
            >
              <div
                style={{
                  width: `${percent}%`,
                  height: 5,
                  borderRadius: 3,
                  background: 'var(--bc)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Phase path */}
        <div className="phase-path">
          {course.phases.map((phase, i) => {
            const isLast = i === course.phases.length - 1;
            const label =
              phase.status === 'active'
                ? 'In Progress'
                : phase.status === 'done'
                ? phase.title
                : phase.title;
            const numberColour =
              phase.status === 'done'
                ? '#18916A'
                : phase.status === 'active'
                ? '#5B9FE8'
                : '#2A3850';

            return (
              <PhaseNodeWrapper key={phase.id} last={isLast}>
                <div className={`phase-node ${phase.status}`}>
                  <div className="phase-circle">
                    {phase.status === 'done' ? (
                      <svg width="18" height="18" viewBox="0 0 20 20">
                        <polyline
                          points="4,10 8,14 16,6"
                          fill="none"
                          stroke="#fff"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : phase.status === 'locked' ? (
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                        <rect
                          x={4}
                          y={9}
                          width={12}
                          height={9}
                          rx={2}
                          stroke="currentColor"
                          strokeWidth={1.8}
                        />
                        <path
                          d="M7 9V6a3 3 0 1 1 6 0v3"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        />
                      </svg>
                    ) : (
                      String(phase.number)
                    )}
                  </div>
                  <p style={{ fontSize: 11, color: numberColour, fontWeight: 600 }}>
                    Phase {phase.number}
                  </p>
                  <p>{label}</p>
                </div>
              </PhaseNodeWrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Adds the connecting line after a node (except the last one). */
function PhaseNodeWrapper({
  children,
  last,
}: {
  children: React.ReactNode;
  last: boolean;
}) {
  return (
    <>
      {children}
      {!last && <div className="phase-line" />}
    </>
  );
}
