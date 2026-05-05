import type { Lesson, Pillar } from '@/types';
import { pillarVar } from '@/lib/pillars';

const LEVEL_LABEL: Record<Lesson['level'], string> = {
  intro: 'Intro',
  foundations: 'Foundations',
  advanced: 'Advanced',
  mechanisms: 'Mechanisms',
  mastery: 'Mastery',
};

/**
 * One lesson tile. Left: numbered circle styled by status
 * (done/active/locked). Centre: title + level/minutes meta.
 * Right: action indicator (Done ✓, Continue button, or padlock).
 */
export function LessonCard({
  lesson,
  pillar,
}: {
  lesson: Lesson;
  pillar: Pillar;
}) {
  const cardClass = [
    'lesson-card',
    lesson.status === 'done' ? 'lesson-done' : '',
    lesson.status === 'active' ? 'lesson-active active-lesson' : '',
    lesson.status === 'locked' ? 'lesson-locked' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClass}>
      <div className="lesson-num">
        {lesson.status === 'done' ? (
          <svg width="14" height="14" viewBox="0 0 20 20">
            <polyline
              points="4,10 8,14 16,6"
              fill="none"
              stroke="#fff"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : lesson.status === 'locked' ? (
          <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
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
          lesson.number
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 13.5,
            fontWeight: 500,
            marginBottom: 3,
            color: lesson.status === 'locked' ? 'var(--faint)' : 'var(--text)',
          }}
        >
          {lesson.title}
        </p>
        <p style={{ fontSize: 11, color: 'var(--muted)' }}>
          {LEVEL_LABEL[lesson.level]} · {lesson.readingMinutes} min read
        </p>
      </div>

      {lesson.status === 'done' && (
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--lc)',
            textTransform: 'uppercase',
            letterSpacing: '.08em',
          }}
        >
          Done
        </span>
      )}
      {lesson.status === 'active' && (
        <button
          className="btn btn-p"
          type="button"
          style={{
            fontSize: 12,
            padding: '7px 14px',
            background: pillarVar(pillar),
          }}
        >
          Continue
        </button>
      )}
      {lesson.status === 'locked' && (
        <span style={{ fontSize: 11, color: 'var(--faint)' }}>Locked</span>
      )}
    </div>
  );
}
