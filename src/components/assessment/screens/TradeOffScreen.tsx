import type { Pillar, TradeOffQuestion } from '@/types';

/**
 * Generic trade-off screen used for Q1–Q4 (S1–S4). Two-option forced
 * binary choice with a 2-column card grid. The italicised part of the
 * question (the bit between the period and the question mark in the
 * prototype copy) is rendered in <em>.
 *
 * Selecting a card auto-advances after 260 ms — the same delay the
 * prototype uses for the satisfying "click → next" tap rhythm.
 */
export function TradeOffScreen({
  question,
  selected,
  onSelect,
}: {
  question: TradeOffQuestion;
  selected: Pillar | undefined;
  onSelect: (pillar: Pillar) => void;
}) {
  return (
    <div className="asx-step">
      <p className="asx-part">{question.partLabel}</p>
      <h2 className="asx-q">{renderQuestion(question.question)}</h2>
      <p className="asx-ctx">{question.context}</p>
      <div className="asx-opts asx-opts-pair">
        <OptionCard
          option={question.optionA}
          isSelected={selected === question.optionA.pillar}
          onClick={() => onSelect(question.optionA.pillar)}
        />
        <OptionCard
          option={question.optionB}
          isSelected={selected === question.optionB.pillar}
          onClick={() => onSelect(question.optionB.pillar)}
        />
      </div>
    </div>
  );
}

function OptionCard({
  option,
  isSelected,
  onClick,
}: {
  option: TradeOffQuestion['optionA'];
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`asx-opt${isSelected ? ' on' : ''}`}
      onClick={onClick}
    >
      <div className="asx-opt-strong">{option.strong}</div>
      <div className="asx-opt-sub">{option.sub}</div>
    </button>
  );
}

/**
 * Split the question text on its last sentence boundary and italicise
 * the trailing question fragment — matches the prototype where the
 * second sentence is rendered with <em>.
 */
function renderQuestion(text: string): React.ReactNode {
  const lastSentenceStart = text.lastIndexOf('. ');
  if (lastSentenceStart === -1) return text;
  const lead = text.slice(0, lastSentenceStart + 1);
  const tail = text.slice(lastSentenceStart + 2);
  return (
    <>
      {lead} <em>{tail}</em>
    </>
  );
}
