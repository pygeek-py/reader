import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
  PlusCircleIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const APP_LINKS = [
  { label: 'Library', to: '/library' },
  { label: 'Authors', to: '/library/authors' },
  { label: 'My Books', to: '/library/mine' },
];

const Brand = ({ onClick }) => (
  <button type="button" className="brand" onClick={onClick}>
    <span className="brand-mark">R</span>
    Reader
  </button>
);

const SiteNav = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  const goHome = () => history.push(isAuthenticated ? '/library' : '/');

  const submitSearch = (e) => {
    e.preventDefault();
    if (search.trim()) history.push(`/library/search/${encodeURIComponent(search.trim())}`);
  };

  const handleLogout = async () => {
    await logout();
    history.push('/signin');
  };

  return (
    <>
      <header className="site-nav">
        <div className="site-nav-inner">
          <Brand onClick={goHome} />

          {isAuthenticated ? (
            <nav className="nav-links">
              {APP_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.to}
                  className={`nav-link ${location.pathname === link.to ? 'is-active' : ''}`}
                  onClick={() => history.push(link.to)}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          ) : (
            <nav className="nav-links">
              <button type="button" className="nav-link" onClick={() => history.push('/library')}>Library</button>
              <button type="button" className="nav-link" onClick={() => history.push('/#features')}>Features</button>
              <button type="button" className="nav-link" onClick={() => history.push('/#how-it-works')}>How it works</button>
              <button type="button" className="nav-link" onClick={() => history.push('/#about')}>About</button>
            </nav>
          )}

          <div className="nav-actions">
            {isAuthenticated && (
              <form className="nav-search" onSubmit={submitSearch}>
                <MagnifyingGlassIcon />
                <input
                  className="input"
                  placeholder="Search titles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
            )}

            {isAuthenticated && (
              <div className="user-menu user-menu-desktop" ref={menuRef}>
                <button type="button" className="user-menu-trigger" onClick={() => setMenuOpen((v) => !v)}>
                  <span className="user-avatar">{(user?.username || '?').charAt(0).toUpperCase()}</span>
                  {user?.username}
                </button>
                <div className={`user-menu-panel ${menuOpen ? 'is-open' : ''}`}>
                  <button className="user-menu-item" onClick={() => history.push('/library/mine')}>
                    <BookOpenIcon /> My Books
                  </button>
                  {isAdmin && (
                    <button className="user-menu-item" onClick={() => history.push('/library/add-book')}>
                      <PlusCircleIcon /> Add a Book
                    </button>
                  )}
                  <div className="user-menu-divider" />
                  <button className="user-menu-item" onClick={handleLogout}>
                    <ArrowRightOnRectangleIcon /> Sign Out
                  </button>
                </div>
              </div>
            )}

            {!isAuthenticated && (
              <div className="row gap-sm nav-desktop-auth">
                <button type="button" className="nav-link" onClick={() => history.push('/signin')}>Sign In</button>
                <button className="btn btn-primary btn-sm" onClick={() => history.push('/signup')}>
                  Get Started
                </button>
              </div>
            )}

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
          <Brand onClick={goHome} />
          <button type="button" className="mobile-nav-toggle" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <XMarkIcon />
          </button>
        </div>
        <div className="mobile-nav-links">
          {isAuthenticated ? (
            <>
              {APP_LINKS.map((link) => (
                <button type="button" key={link.to} className="mobile-nav-link" onClick={() => history.push(link.to)}>
                  {link.label}
                </button>
              ))}
              {isAdmin && (
                <button type="button" className="mobile-nav-link" onClick={() => history.push('/library/add-book')}>Add a Book</button>
              )}
            </>
          ) : (
            <>
              <button type="button" className="mobile-nav-link" onClick={() => history.push('/library')}>Library</button>
              <button type="button" className="mobile-nav-link" onClick={() => history.push('/#features')}>Features</button>
              <button type="button" className="mobile-nav-link" onClick={() => history.push('/#how-it-works')}>How it works</button>
              <button type="button" className="mobile-nav-link" onClick={() => history.push('/#about')}>About</button>
            </>
          )}
        </div>
        <div className="mobile-nav-footer">
          {isAuthenticated ? (
            <button className="btn btn-secondary btn-block" onClick={handleLogout}>Sign Out</button>
          ) : (
            <>
              <button className="btn btn-primary btn-block" onClick={() => history.push('/signup')}>Get Started</button>
              <button className="btn btn-secondary btn-block" onClick={() => history.push('/signin')}>Sign In</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SiteNav;
