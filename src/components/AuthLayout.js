import React from 'react';
import { useHistory } from 'react-router-dom';

// Fixed, varied timings/positions so the motes drift without looking mechanically synced.
const PARTICLES = [
  { left: '12%', duration: 9, delay: 0 },
  { left: '28%', duration: 12, delay: 2.5 },
  { left: '48%', duration: 10, delay: 5 },
  { left: '65%', duration: 14, delay: 1 },
  { left: '80%', duration: 11, delay: 4 },
  { left: '92%', duration: 13, delay: 6.5 },
];

const AuthLayout = ({ quote, attribution, children }) => {
  const history = useHistory();

  return (
    <div className="auth-shell">
      <div className="auth-visual">
        <div className="auth-visual-glow auth-visual-glow--1" aria-hidden="true" />
        <div className="auth-visual-glow auth-visual-glow--2" aria-hidden="true" />
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="auth-visual-particle"
            aria-hidden="true"
            style={{ left: p.left, bottom: 0, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }}
          />
        ))}
        <button type="button" className="auth-visual-brand" onClick={() => history.push('/')}>
          <span className="brand-mark">R</span> Reader
        </button>
        <div className="auth-visual-content">
          <p className="auth-visual-quote">{quote}</p>
          <p className="auth-visual-attribution">{attribution}</p>
        </div>
        <div />
      </div>
      <div className="auth-form-side">
        <div className="auth-form-wrap">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
