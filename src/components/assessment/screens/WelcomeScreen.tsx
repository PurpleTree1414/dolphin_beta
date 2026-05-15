import { assessmentIntro } from '@/mocks/assessment';

/**
 * Welcome screen (S0). Gradient pill icon, italic Instrument Serif
 * headline, 3 spec stats, "Begin →" CTA.
 *
 * The headline ends in an italicised fragment whose text comes from
 * `assessmentIntro.headlineItalic`. We split the full headline on that
 * substring and wrap the tail in <em>.
 */
export function WelcomeScreen({ onBegin }: { onBegin: () => void }) {
  const { headline, headlineItalic, subhead, specs } = assessmentIntro;
  const lead = headline.endsWith(headlineItalic)
    ? headline.slice(0, headline.length - headlineItalic.length).trimEnd()
    : headline;

  return (
    <div className="asx-step asx-intro">
      <div className="asx-intro-icon">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth={2} />
          <circle cx="12" cy="12" r="3.5" stroke="#fff" strokeWidth={1.8} />
        </svg>
      </div>
      <h1>
        {lead} <em>{headlineItalic}</em>
      </h1>
      <p>{subhead}</p>
      <div className="asx-intro-specs">
        {specs.map((s) => (
          <div key={s.label} className="asx-spec">
            <div className="asx-spec-num">{s.num}</div>
            <div className="asx-spec-label">{s.label}</div>
          </div>
        ))}
      </div>
      <button type="button" className="asx-cta-primary" onClick={onBegin}>
        Begin →
      </button>
    </div>
  );
}
