import React, { FormEvent, useState } from 'react';
import './AuthPanel.css';

export interface AuthValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  ageConfirmed: boolean;
  termsAccepted: boolean;
}

interface Props {
  registerMode: boolean;
  busy: boolean;
  error: string;
  fieldErrors: Record<string, string>;
  onSwitch: () => void;
  onSubmit: (values: AuthValues) => void | Promise<void>;
}

// Home mounts a new keyed panel on each mode change. Credentials exist only in this mounted form.
const AuthPanel: React.FC<Props> = ({ registerMode, busy, error, fieldErrors, onSwitch, onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const mode = registerMode ? 'signup' : 'signin';
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (busy) return;
    void onSubmit({ firstName, lastName, email, password, ageConfirmed, termsAccepted });
  };

  return (
    <div className="wl-auth-shell">
      <section className={`wl-auth-card ${registerMode ? 'wl-auth-card--signup' : ''}`} aria-labelledby={`${mode}-heading`}>
        <div className="wl-auth-brand"><span className="wl-auth-mark" aria-hidden="true">WL</span>
          <div><p className="wl-auth-wordmark">Well Live</p><p className="wl-auth-kicker">Wellness education</p></div>
        </div>
        <header className="wl-auth-heading">
          <h2 id={`${mode}-heading`}>{registerMode ? 'Create your account' : 'Sign in'}</h2>
          <p>{registerMode
            ? 'Your space to explore wellness, one topic at a time. Start with a few details below.'
            : 'Welcome back. Continue exploring your wellness resources.'}</p>
        </header>
        <form onSubmit={submit} aria-labelledby={`${mode}-heading`}>
          {error && <div className="wl-auth-error" role="alert"><p>{error}</p>
            {Object.keys(fieldErrors).length > 0 && <ul>{Object.entries(fieldErrors).map(([field, message]) => (
              <li key={field}>{message}</li>
            ))}</ul>}
          </div>}
          {registerMode && <div className="wl-auth-name-row">
            <div className="wl-auth-field">
              <label htmlFor="signup-first-name">First name</label>
              <input id="signup-first-name" name="signup-first-name" autoComplete="section-welllive-signup given-name"
                type="text" required maxLength={100} value={firstName} disabled={busy}
                onChange={(event) => setFirstName(event.target.value)} />
            </div>
            <div className="wl-auth-field">
              <label htmlFor="signup-last-name">Last name</label>
              <input id="signup-last-name" name="signup-last-name" autoComplete="section-welllive-signup family-name"
                type="text" required maxLength={100} value={lastName} disabled={busy}
                onChange={(event) => setLastName(event.target.value)} />
            </div>
          </div>}
          <div className="wl-auth-field">
            <label htmlFor={`${mode}-email`}>Email</label>
            <input id={`${mode}-email`} name={`${mode}-email`} type="email" inputMode="email"
              autoComplete={`section-welllive-${mode} ${registerMode ? 'email' : 'username'}`}
              autoCapitalize="none" spellCheck={false} required maxLength={320} placeholder="you@example.com"
              value={email} disabled={busy} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="wl-auth-field">
            <label htmlFor={`${mode}-password`}>Password</label>
            <input id={`${mode}-password`} name={`${mode}-password`} type="password"
              autoComplete={`section-welllive-${mode} ${registerMode ? 'new-password' : 'current-password'}`}
              required maxLength={72} value={password} disabled={busy}
              onChange={(event) => setPassword(event.target.value)} />
          </div>
          {registerMode && <fieldset className="wl-auth-agreements" disabled={busy}>
            <legend>Before you join</legend>
            <label><input type="checkbox" required checked={ageConfirmed}
              onChange={(event) => setAgeConfirmed(event.target.checked)} />
              <span>I confirm that I meet the age eligibility requirement.</span></label>
            <label><input type="checkbox" required checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.target.checked)} />
              <span>I accept the terms and educational disclaimer.</span></label>
          </fieldset>}
          <button className="wl-auth-submit" type="submit" disabled={busy}>
            {busy ? (registerMode ? 'Creating account…' : 'Signing in…') : (registerMode ? 'Create account' : 'Sign in')}
          </button>
        </form>
        <div className="wl-auth-switch">
          <p>{registerMode ? 'Already have an account?' : 'New to Well Live?'}</p>
          <button type="button" disabled={busy} onClick={onSwitch}>
            {registerMode ? 'Sign in instead' : 'Create an account'}
          </button>
        </div>
        <p className="wl-auth-footnote">Learn about wellness, at your pace.<br />Educational content, not medical advice.</p>
      </section>
    </div>
  );
};

export default AuthPanel;
