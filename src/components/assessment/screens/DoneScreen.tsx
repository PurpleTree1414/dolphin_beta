import { assessmentDone } from '@/mocks/assessment';

/**
 * S11 — confirmation screen. Mint pill icon, "Weights confirmed."
 * headline, brief body explaining what happens next, and a single
 * "Take it again ↻" button that bounces the user back to S0.
 */
export function DoneScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="asx-step asx-done">
      <div className="asx-done-icon">
        <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
          <polyline
            points="7,17 13,23 25,10"
            stroke="#18916A"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2>{assessmentDone.headline}</h2>
      <p>{assessmentDone.body}</p>
      <button type="button" className="asx-cta-primary" onClick={onRestart}>
        Take it again ↻
      </button>
    </div>
  );
}
