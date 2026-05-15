import type { ContextQuestion } from '@/types';

/**
 * Context screen — handles Q8 (life situation) and Q9 (attention &
 * energy). Single-column list of option cards, each with a bold
 * primary label and optional hint suffix.
 *
 * Both questions are open string-value (not pillar-typed) so the
 * selected value is plumbed through as a string. The page coerces it
 * back into the strongly-typed answer at write time.
 */
export function ContextScreen({
  question,
  selected,
  onSelect,
}: {
  question: ContextQuestion;
  selected: string | undefined;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="asx-step">
      <p className="asx-part">{question.partLabel}</p>
      <h2 className="asx-q">{wrapItalic(question.question)}</h2>
      <p className="asx-ctx">{question.context}</p>
      <div className="asx-opts asx-opts-single">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`asx-opt${selected === opt.value ? ' on' : ''}`}
            onClick={() => onSelect(opt.value)}
          >
            <span className="asx-opt-label">{opt.label}</span>
            {opt.hint && <span className="asx-opt-hint"> — {opt.hint}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Italicise the standout phrasing on Q8 / Q9 question stems. */
function wrapItalic(text: string): React.ReactNode {
  const targets = ['right now', 'attention and energy'];
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
