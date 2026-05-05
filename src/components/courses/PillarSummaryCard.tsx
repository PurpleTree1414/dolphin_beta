import type { Course } from '@/types';
import { PILLAR_META, pillarVar, pillarVarLight } from '@/lib/pillars';

/**
 * Right-rail summary card for the selected pillar's course. Shows
 * pillar icon, progress bar, three stats (lessons done, est.
 * remaining, flow impact), and the course description.
 */
export function PillarSummaryCard({ course }: { course: Course }) {
  const percent = Math.round(
    (course.completedLessons / Math.max(1, course.totalLessons)) * 100,
  );

  return (
    <div className="card" style={{ padding: 20 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 18,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: pillarVarLight(course.pillar),
            color: pillarVar(course.pillar),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          {PILLAR_META[course.pillar].label[0]}
        </div>
        <div>
          <p className="ey" style={{ marginBottom: 2 }}>
            {PILLAR_META[course.pillar].label} course
          </p>
          <p style={{ fontSize: 11, color: 'var(--muted)' }}>
            {PILLAR_META[course.pillar].tag}
          </p>
        </div>
      </div>

      <div className="bar-track" style={{ height: 5, marginBottom: 6 }}>
        <div
          className="bar-fill"
          style={{
            width: `${percent}%`,
            background: pillarVar(course.pillar),
          }}
        />
      </div>
      <p style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 18 }}>
        {course.completedLessons} of {course.totalLessons} lessons · {percent}%
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <StatRow label="Lessons done" value={`${course.completedLessons}`} />
        <StatRow
          label="Est. remaining"
          value={`${course.estimatedHoursRemaining}h`}
        />
        <StatRow
          label="Flow impact"
          value={course.flowImpact}
          valueColor={pillarVar(course.pillar)}
        />
      </div>

      <p
        style={{
          fontSize: 12,
          color: 'var(--muted)',
          lineHeight: 1.65,
          marginTop: 18,
          paddingTop: 16,
          borderTop: '1px solid var(--bdr)',
        }}
      >
        {course.description}
      </p>
    </div>
  );
}

function StatRow({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 12,
      }}
    >
      <span style={{ color: 'var(--muted)' }}>{label}</span>
      <span style={{ fontWeight: 600, color: valueColor ?? 'var(--text)' }}>
        {value}
      </span>
    </div>
  );
}
