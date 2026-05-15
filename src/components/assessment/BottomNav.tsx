/**
 * Bottom strip with the Back button (left) and contextual tip text
 * (right). Matches the prototype's `.asx-nav` row. Back is disabled
 * on the Welcome (step 0) and Done (step 11) screens.
 */
export function BottomNav({
  step,
  onBack,
}: {
  step: number;
  onBack: () => void;
}) {
  const backDisabled = step === 0 || step === 11;
  const tip = tipFor(step);

  return (
    <div className="asx-nav">
      <button
        type="button"
        className="asx-back"
        onClick={onBack}
        disabled={backDisabled}
      >
        ← Back
      </button>
      <span className="asx-tip">{tip}</span>
    </div>
  );
}

function tipFor(step: number): string {
  if (step === 0) return 'Ready when you are';
  if (step >= 1 && step <= 4) return 'Forced-choice — pick the one that tempts you more';
  if (step >= 5 && step <= 9) return 'Pick what feels truest';
  if (step === 10) return 'Confirm or adjust';
  return '';
}
