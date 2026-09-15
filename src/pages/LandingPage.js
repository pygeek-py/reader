import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  UserGroupIcon,
  BookmarkSquareIcon,
  ArrowRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import LandingNav from '../components/LandingNav';
import SiteFooter from '../components/SiteFooter';
import BookCover from '../components/BookCover';
import { api } from '../api/client';

// Counts up from its previous value to `value` whenever it changes; renders the
// placeholder as-is until a real number arrives (e.g. before the stats API resolves).
const AnimatedNumber = ({ value, placeholder = '…' }) => {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    if (typeof value !== 'number') return;
    const from = typeof fromRef.current === 'number' ? fromRef.current : 0;
    if (from === value) { setDisplay(value); return; }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) { setDisplay(value); fromRef.current = value; return; }

    const duration = 700;
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else fromRef.current = value;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  const shown = typeof display === 'number' ? display : value;
  return <>{typeof value === 'number' ? shown : placeholder}</>;
};

const FEATURES = [
  {
    icon: MagnifyingGlassIcon,
    title: 'Discover with intent',
    text: 'Browse by genre or search titles directly: a catalog organized around how readers actually decide what to read next.',
  },
  {
    icon: UserGroupIcon,
    title: 'Follow the authors, not just the books',
    text: "Every author page is built from what's actually in the library: see their full body of work in one place.",
  },
  {
    icon: BookmarkSquareIcon,
    title: 'One place for what you borrow',
    text: 'Track due dates and imprints for everything you currently have out, without digging through email confirmations.',
  },
];

const STEPS = [
  { title: 'Create an account', text: 'Sign up and confirm your email. It takes under a minute.' },
  { title: 'Explore the catalog', text: 'Browse by genre, search by title, or start from an author you already like.' },
  { title: 'Borrow what you find', text: "Reserve a copy with an imprint and due date, right from the book's page." },
  { title: 'Keep track as you go', text: 'My Books keeps every current loan, and its due date, in one list.' },
];

const VALUES = [
  { icon: ShieldCheckIcon, title: 'Verified accounts', text: 'Every account confirms its email before it can borrow anything. No throwaway signups cluttering the library.' },
  { icon: SparklesIcon, title: 'Built on real data', text: 'No filler content. Every book, author, and count on this page comes straight from the live catalog.' },
  { icon: ClockIcon, title: 'Nothing to install', text: 'Reader runs in the browser. Open a tab and you\'re in your library, on any device.' },
];

const LandingPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [showcaseBooks, setShowcaseBooks] = useState([]);
  const [stats, setStats] = useState({ books: null, authors: null, genres: null });

  useEffect(() => {
    let cancelled = false;

    api.get('/?page=1').then((data) => {
      if (cancelled) return;
      setShowcaseBooks((data.results || []).slice(0, 3));
      setStats((s) => ({ ...s, books: data.count }));
    }).catch(() => {});

    api.get('/author/').then((data) => {
      if (cancelled) return;
      setStats((s) => ({ ...s, authors: data.length }));
    }).catch(() => {});

    return () => { cancelled = true; };
  }, []);

  // history.push('/#id') only changes the URL; it doesn't trigger the browser's
  // native scroll-to-anchor behavior, so the nav's section links need to do it themselves.
  useEffect(() => {
    if (!location.hash) return;
    const target = document.getElementById(location.hash.slice(1));
    if (!target) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  }, [location.hash]);

  // Fade sections in the first time they scroll into view, then leave them alone.
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page">
      <LandingNav />

      <main className="page-content">
        {/* HERO */}
        <section className="hero">
          <div className="container">
            <div className="hero-grid">
              <div>
                <span className="eyebrow">A calmer way to manage your reading</span>
                <h1 className="hero-heading">
                  Your reading life,<br /><em>finally organized.</em>
                </h1>
                <p className="hero-subtext">
                  Reader brings discovery, authors, and everything you've borrowed into one
                  well-organized place, so the next book is never more than a search away.
                </p>
                <div className="hero-cta-row">
                  <button className="btn btn-primary btn-lg" onClick={() => history.push('/signup')}>
                    Get started free <ArrowRightIcon width={18} />
                  </button>
                  <button className="btn btn-secondary btn-lg" onClick={() => history.push('/signin')}>
                    Sign in
                  </button>
                </div>
                <div className="hero-meta-row">
                  <div className="hero-meta-item">
                    <span className="hero-meta-num"><AnimatedNumber value={stats.books} /></span>
                    <span className="hero-meta-label">Books in the catalog</span>
                  </div>
                  <div className="hero-meta-item">
                    <span className="hero-meta-num"><AnimatedNumber value={stats.authors} /></span>
                    <span className="hero-meta-label">Authors represented</span>
                  </div>
                  <div className="hero-meta-item">
                    <span className="hero-meta-num">9</span>
                    <span className="hero-meta-label">Genres to explore</span>
                  </div>
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-showcase-card">
                  <div className="browser-dots"><span /><span /><span /></div>
                  <div className="book-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                    {showcaseBooks.length > 0
                      ? showcaseBooks.map((b) => (
                          <BookCover key={b.id} title={b.title} genre={b.genre} />
                        ))
                      : [0, 1, 2].map((i) => <div key={i} className="book-cover skeleton" />)}
                  </div>
                </div>
                <div className="hero-floating-card hero-floating-card--1">
                  <UserGroupIcon /> Real authors, real books
                </div>
                <div className="hero-floating-card hero-floating-card--2">
                  <BookmarkSquareIcon /> Due dates tracked automatically
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="section" id="features">
          <div className="container">
            <div className="section-head center reveal">
              <span className="eyebrow" style={{ justifyContent: 'center' }}>What Reader does</span>
              <h2>Everything a library catalog should have been</h2>
              <p>Three things, done properly, instead of ten things done halfway.</p>
            </div>
            <div className="feature-grid">
              {FEATURES.map((f, i) => (
                <div className="feature-card reveal" style={{ transitionDelay: `${i * 90}ms` }} key={f.title}>
                  <div className="feature-icon-wrap"><f.icon width={24} /></div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section section--tight" id="how-it-works" style={{ backgroundColor: 'var(--color-surface-sunken)' }}>
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">How it works</span>
              <h2>From sign-up to your next book, in four steps</h2>
            </div>
            <div className="steps-row">
              {STEPS.map((step, i) => (
                <div className="step-item reveal" style={{ transitionDelay: `${i * 90}ms` }} key={step.title}>
                  <div className="step-number">{String(i + 1).padStart(2, '0')}</div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST / VALUES */}
        <section className="section" id="about">
          <div className="container">
            <div className="section-head center reveal">
              <span className="eyebrow" style={{ justifyContent: 'center' }}>Why it holds together</span>
              <h2>Small, deliberate choices instead of empty promises</h2>
            </div>
            <div className="values-grid">
              {VALUES.map((v, i) => (
                <div className="value-card reveal" style={{ transitionDelay: `${i * 90}ms` }} key={v.title}>
                  <v.icon />
                  <h4>{v.title}</h4>
                  <p>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section">
          <div className="container">
            <div className="final-cta reveal">
              <h2>Your next book is already in the catalog.</h2>
              <p>Create an account and find it.</p>
              <div className="hero-cta-row">
                <button className="btn btn-primary btn-lg" onClick={() => history.push('/signup')}>
                  Create your account
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default LandingPage;
