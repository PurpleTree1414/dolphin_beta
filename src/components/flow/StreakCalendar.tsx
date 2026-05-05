/**
 * April streak calendar shown in the Flow hero.
 *
 * Static for the first checkpoint — hard-codes the prototype's exact
 * layout (9 consecutive done days ending on "today"). When we wire real
 * data we'll accept a `{ done: Date[], today: Date }` prop and compute
 * the grid from there.
 */
export function StreakCalendar() {
  // 14 cells: first 9 done, 10th is today, 4 more future (empty).
  const cells: Array<'done' | 'today' | 'empty'> = [
    'done', 'done', 'done', 'done', 'done', 'done', 'done',
    'done', 'today', 'empty', 'empty', 'empty', 'empty', 'empty',
  ];

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 5 }}>
        {/* Weekday header row */}
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <div
            key={`wh-${i}`}
            className="cal-day"
            style={{
              background: 'rgba(255,255,255,.06)',
              borderRadius: 4,
              fontSize: 9,
              color: '#4A6080',
            }}
          >
            {d}
          </div>
        ))}

        {/* Day cells */}
        {cells.map((c, i) => (
          <div
            key={`day-${i}`}
            style={{
              height: 26,
              borderRadius: 5,
              background:
                c === 'done'
                  ? '#18916A'
                  : c === 'today'
                  ? '#2B7DD4'
                  : 'rgba(255,255,255,.06)',
              boxShadow: c === 'today' ? '0 0 0 2px rgba(43,125,212,.4)' : undefined,
            }}
          />
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: '#18916A' }} />
          <span style={{ fontSize: 10, color: '#4A6080' }}>Done</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: '#2B7DD4' }} />
          <span style={{ fontSize: 10, color: '#4A6080' }}>Today</span>
        </div>
      </div>
    </>
  );
}
