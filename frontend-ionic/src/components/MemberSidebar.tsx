import React from 'react';
import type { Member } from '../api';

export type DashboardView = 'articles' | 'profile' | 'assessment';

interface Props {
  member: Member;
  active: DashboardView;
  onNavigate: (view: DashboardView) => void;
  onLogout: () => void;
  busy: boolean;
}

const MemberSidebar: React.FC<Props> = ({ member, active, onNavigate, onLogout, busy }) => {
  const name = [member.firstName, member.lastName].filter(Boolean).join(' ') || 'Your account';
  const initials = [member.firstName, member.lastName].filter((part): part is string => typeof part === 'string' && part.length > 0)
    .map((part) => Array.from(part)[0]).join('').toUpperCase() || 'WL';
  return (
    <aside className="wl-member-sidebar" aria-label="Your account">
      <div className="wl-sidebar-identity">
        <div><p className="wl-eyebrow">Your space</p><h2>{name}</h2></div>
        <span className="wl-avatar" aria-hidden="true">{initials}</span>
      </div>
      <nav className="wl-sidebar-nav" aria-label="Member navigation">
        {([['articles', 'Articles'], ['profile', 'Profile'], ['assessment', 'Health assessment']] as const)
          .map(([view, label]) => (
            <button type="button" key={view} aria-current={active === view ? 'page' : undefined}
              disabled={busy} onClick={() => onNavigate(view)}>{label}<span aria-hidden="true">›</span></button>
          ))}
        <button type="button" disabled>Groups <small>Coming soon</small></button>
        <button type="button" disabled>Options <small>Coming soon</small></button>
      </nav>
      <button type="button" className="wl-sidebar-signout" disabled={busy} onClick={onLogout}>Sign out</button>
      <p className="wl-sidebar-note">Your questionnaire answers are private to your account.</p>
    </aside>
  );
};

export default MemberSidebar;
