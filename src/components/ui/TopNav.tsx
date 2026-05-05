import Link from 'next/link';
import { Brand } from './Brand';
import type { User } from '@/types';

type Tab = 'home' | 'framework' | 'flow' | 'research' | 'courses';

const TABS: { id: Tab; label: string; href: string }[] = [
  { id: 'home',      label: 'Home',      href: '/' },
  { id: 'framework', label: 'Framework', href: '/framework' },
  { id: 'flow',      label: 'Flow',      href: '/flow' },
  { id: 'research',  label: 'Research',  href: '/research' },
  { id: 'courses',   label: 'Courses',   href: '/courses' },
];

export function TopNav({
  active,
  user,
}: {
  active: Tab;
  /** When null, shows a Sign In button (Home / logged-out state). */
  user: User | null;
}) {
  return (
    <nav
      className="nav"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 40px',
        height: 60,
        background: 'var(--surf)',
        borderBottom: '1px solid var(--bdr)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ marginRight: 48 }}>
        <Brand />
      </div>

      {TABS.map((t) => (
        <Link
          key={t.id}
          href={t.href}
          className={`nl${active === t.id ? ' on' : ''}`}
          style={{
            fontSize: 13.5,
            color: active === t.id ? 'var(--text)' : 'var(--muted)',
            fontWeight: active === t.id ? 500 : 400,
            padding: '0 13px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {t.label}
        </Link>
      ))}

      <div style={{ flex: 1 }} />

      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'var(--bc)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 600,
              color: '#fff',
            }}
          >
            {user.avatarInitial}
          </div>
          <span style={{ fontSize: 13.5, fontWeight: 500 }}>{user.firstName}</span>
        </div>
      ) : (
        <button
          className="btn btn-o"
          style={{ padding: '7px 18px', fontSize: 13 }}
          type="button"
        >
          Sign In
        </button>
      )}
    </nav>
  );
}

export type { Tab };
