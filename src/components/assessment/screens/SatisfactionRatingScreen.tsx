import type { Pillar, RatingQuestion } from '@/types';
import { PILLAR_META } from '@/lib/pillars';

/**
 * Q6 satisfaction rating (S6). Single-column 5-option scale, where
 * the question itself is dynamic — the pillar label from Q5 is
 * interpolated into the `{pillar}` placeholder and rendered italic.
 *
 * If Q5 hasn't been answered yet (shouldn't happen, but guard) we
 * fall back to "this area".
 */
export function SatisfactionRatingScreen({
  question,
  q5Pillar,
  selected,
  onSelect,
}: {
  question: RatingQuestion;
  q5Pillar: Pillar | undefined;
  selected: 1 | 2 | 3 | 4 | 5 | undefined;
  onSelect: (value: 1 | 2 | 3 | 4 | 5) => void;
}) {
  const pillarLabel = q5Pillar ? PILLAR_META[q5Pillar].label : 'this area';
  const rendered = renderTitle(question.questionTemplate, pillarLabel);

  return (
    <div className="asx-step">
      <p className="asx-part">{question.partLabel}</p>
      <h2 className="asx-q">{rendered}</h2>
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
            <span className="asx-opt-hint"> — {opt.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Replace `{pillar}` with the chosen pillar label, italicised. */
function renderTitle(template: string, pillarLabel: string): React.ReactNode {
  const idx = template.indexOf('{pillar}');
  if (idx === -1) return template;
  return (
    <>
      {template.slice(0, idx)}
      <em>{pillarLabel}</em>
      {template.slice(idx + '{pillar}'.length)}
    </>
  );
}
