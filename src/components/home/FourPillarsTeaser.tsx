import Link from 'next/link';
import { PILLARS, PILLAR_META, pillarVar, pillarVarLight, pillarVarBorder } from '@/lib/pillars';
import { PillarIcon } from '@/components/ui/PillarIcon';

/**
 * "Four pillars. One score." teaser grid — each card links to /framework.
 * Hover lift is handled with a CSS class so this stays a server component.
 */
export function FourPillarsTeaser() {
  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <p className="ey" style={{ marginBottom: 8 }}>The Framework</p>
        <h2
          className="serif"
          style={{ fontSize: 34, fontWeight: 500, color: 'var(--text)' }}
        >
          Four pillars. One score.
        </h2>
      </div>

      <div className="g4">
        {PILLARS.map((p) => (
          <Link
            key={p}
            href="/framework"
            className="pillar-teaser"
            style={{
              cursor: 'pointer',
              textAlign: 'center',
              padding: '30px 20px',
              borderRadius: 'var(--rlg)',
              background: pillarVarLight(p),
              border: `1px solid ${pillarVarBorder(p)}`,
              textDecoration: 'none',
              transition: 'transform .15s, box-shadow .15s',
              display: 'block',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: pillarVar(p),
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PillarIcon pillar={p} size={22} color="#fff" />
            </div>
            <p
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: pillarVar(p),
                marginBottom: 6,
              }}
            >
              {PILLAR_META[p].label}
            </p>
            <p
              style={{
                fontSize: 12,
                color: pillarVar(p),
                opacity: 0.72,
                lineHeight: 1.55,
              }}
            >
              {PILLAR_META[p].tag}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
