import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const NAV_LINKS = [
  { label: 'Library', to: '/library' },
  { label: 'Features', to: '/#features' },
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'About', to: '/#about' },
];

const Brand = ({ onClick }) => (
  <button type="button" className="brand" onClick={onClick}>
    <span className="brand-mark">R</span>
    Reader
  </button>
);

// The marketing homepage gets its own, simpler navbar rather than reusing the
// authenticated app's SiteNav: no search box, no My Books/user menu. A signed-in
// visitor never actually sees this: PublicOnlyRoute redirects them to /library
// before the landing page ever mounts, so this nav only needs a signed-out state.
const LandingNav = () => {
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="site-nav">
        <div className="site-nav-inner">
          <Brand onClick={() => history.push('/')} />

          <nav className="nav-links">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.to}
                className="nav-link"
                onClick={() => history.push(link.to)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <div className="row gap-sm nav-desktop-auth">
              <button type="button" className="nav-link" onClick={() => history.push('/signin')}>Sign In</button>
              <button className="btn btn-primary btn-sm" onClick={() => history.push('/signup')}>
                Get Started
              </button>
            </div>

            <button
              type="button"
              className="mobile-nav-toggle mobile-nav-toggle-visible"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Bars3Icon />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav-panel ${mobileOpen ? 'is-open' : ''}`}>
        <div className="mobile-nav-header">
          <Brand onClick={() => { setMobileOpen(false); history.push('/'); }} />
          <button type="button" className="mobile-nav-toggle" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <XMarkIcon />
          </button>
        </div>
        <div className="mobile-nav-links">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.to}
              className="mobile-nav-link"
              onClick={() => { setMobileOpen(false); history.push(link.to); }}
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="mobile-nav-footer">
          <button className="btn btn-primary btn-block" onClick={() => { setMobileOpen(false); history.push('/signup'); }}>Get Started</button>
          <button className="btn btn-secondary btn-block" onClick={() => { setMobileOpen(false); history.push('/signin'); }}>Sign In</button>
        </div>
      </div>
    </>
  );
};

export default LandingNav;
