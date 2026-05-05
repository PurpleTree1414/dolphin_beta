import type { Course, Lesson } from '@/types';
import { PILLAR_META, pillarVar, pillarVarLight } from '@/lib/pillars';

/**
 * "Continue where you left off" pinned card — shown at the top of the
 * active pillar's lesson list. Points at the first `active` lesson
 * found in the course; falls back to the first locked lesson or null.
 */
export function ContinueCard({ course }: { course: Course }) {
  const current = findResumeLesson(course);
  if (!current) return null;

  const percent = Math.round(
    (course.completedLessons / Math.max(1, course.totalLessons)) * 100,
  );

  const phaseNumber =
    course.phases.find((ph) => ph.lessons.some((l) => l.id === current.id))
      ?.number ?? 1;

  return (
    <div
      style={{
        background: pillarVarLight(course.pillar),
        border: `1px solid ${pillarVar(course.pillar)}33`,
        borderLeft: `3px solid ${pillarVar(course.pillar)}`,
        borderRadius: 'var(--rlg)',
        padding: 20,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          background: pillarVar(course.pillar),
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        {PILLAR_META[course.pillar].label[0]}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '.1em',
            color: pillarVar(course.pillar),
            marginBottom: 4,
          }}
        >
          Continue where you left off
        </p>
        <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>
          {current.title}
        </p>
        <div
          className="bar-track"
          style={{ height: 4, marginBottom: 6, maxWidth: 360 }}
        >
          <div
            className="bar-fill"
            style={{
              width: `${percent}%`,
              background: pillarVar(course.pillar),
            }}
          />
        </div>
        <p style={{ fontSize: 11, color: 'var(--muted)' }}>
          Phase {phaseNumber} · Lesson {current.number} · {percent}% complete
        </p>
      </div>
      <button
        className="btn btn-p"
        type="button"
        style={{
          background: pillarVar(course.pillar),
          fontSize: 13,
          padding: '10px 18px',
          flexShrink: 0,
        }}
      >
        Continue
      </button>
    </div>
  );
}

/** First `active` lesson across phases; if none, first `locked`. */
function findResumeLesson(course: Course): Lesson | null {
  for (const phase of course.phases) {
    const active = phase.lessons.find((l) => l.status === 'active');
    if (active) return active;
  }
  for (const phase of course.phases) {
    const locked = phase.lessons.find((l) => l.status === 'locked');
    if (locked) return locked;
  }
  return null;
}
