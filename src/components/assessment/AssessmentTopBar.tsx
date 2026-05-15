/**
 * Sticky top bar for the assessment flow. Sits under the main TopNav
 * brand strip and shows:
 *   • Restart button (left)
 *   • 9-segment progress strip (centre) — one segment per question
 *   • Step label + estimated time-left (under the strip)
 *
 * The progress segments use the prototype's `done` / `active` rules:
 *   - segments 1..(step-1) → done
 *   - segment step          → active
 *   - segments >step        → idle
 * On Welcome (step 0) no segment is active. On Weight Reveal (step 10)
 * and Done (step 11), all 9 question segments are done.
 */
export function AssessmentTopBar({
  step,
  onRestart,
}: {
  /** 0 = welcome, 1..9 = questions, 10 = weight reveal, 11 = done. */
  step: number;
  onRestart: () => void;
}) {
  const { label, time } = labelFor(step);

  return (
    <div className="asx-top">
      <div className="asx-top-inner">
        <button className="asx-exit" type="button" onClick={onRestart}>
          ↻ Restart
        </button>
        <div className="asx-prog-wrap">
          <div className="asx-prog-bar">
            {Array.from({ length: 9 }, (_, i) => {
              const qn = i + 1; // segment represents question 1..9
              const isDone = step > qn;
              const isActive = step === qn;
              const cls =
                'asx-prog-seg' +
                (isDone ? ' done' : '') +
                (isActive ? ' active' : '');
              return <div key={qn} className={cls} />;
            })}
          </div>
          <div className="asx-prog-meta">
            <span>{label}</span>
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function labelFor(step: number): { label: string; time: string } {
  if (step === 0) return { label: 'Welcome', time: '~6 min' };
  if (step >= 1 && step <= 9) {
    return {
      label: `Question ${step} of 9`,
      time: `~${Math.max(1, 7 - step)} min left`,
    };
  }
  if (step === 10) return { label: 'Review your weighting', time: 'Done' };
  return { label: 'Complete', time: '' };
}
