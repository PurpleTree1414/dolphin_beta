import type { Pillar, PillarPickQuestion } from '@/types';

/**
 * Pillar pick screen — handles Q5 ("most dissatisfied") and Q7
 * ("strongest"). Single-column list of pillar options with optional
 * hint text following the bold pillar label.
 *
 * For Q7, pass `excludePillar` set to the user's Q5 answer to hide
 * that option (the prototype suppresses it via display:none).
 */
export function PillarPickScreen({
  question,
  selected,
  onSelect,
  excludePillar,
}: {
  question: PillarPickQuestion;
  selected: Pillar | undefined;
  onSelect: (pillar: Pillar) => void;
  excludePillar?: Pillar;
}) {
  const options = excludePillar
    ? question.options.filter((o) => o.pillar !== excludePillar)
    : question.options;

  return (
    <div className="asx-step">
      <p className="asx-part">{question.partLabel}</p>
      <h2 className="asx-q">
        {wrapItalic(question.question)}
      </h2>
      <p className="asx-ctx">{question.context}</p>
      <div className="asx-opts asx-opts-single">
        {options.map((opt) => (
          <button
            key={opt.pillar}
            type="button"
            className={`asx-opt${selected === opt.pillar ? ' on' : ''}`}
            onClick={() => onSelect(opt.pillar)}
          >
            <span className="asx-opt-label">{opt.label}</span>
            {opt.hint && <span className="asx-opt-hint"> — {opt.hint}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Italicise common phrasing fragments the prototype renders with <em>.
 * For Q5 it's "most dissatisfied" and "right now"; for Q7 it's
 * "strongest". Falls back to plain text if no fragment matches.
 */
function wrapItalic(text: string): React.ReactNode {
  const targets = ['most dissatisfied', 'strongest'];
  for (const t of targets) {
    const idx = text.indexOf(t);
    if (idx !== -1) {
      return (
        <>
          {text.slice(0, idx)}
          <em>{t}</em>
          {text.slice(idx + t.length)}
        </>
      );
    }
  }
  return text;
}
