import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  UserGroupIcon,
  BookmarkSquareIcon,
  ArrowRightIcon,
  SparklesIcon,
  BoltIcon,
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
    title: 'Search the whole collection',
    text: 'Find a book by title, author, or ISBN, or browse the shelves by genre. Every record shows its shelf mark, edition details, and how many copies are in.',
  },
  {
    icon: UserGroupIcon,
    title: 'Live availability',
    text: 'See at a glance whether a copy is on the shelf or out on loan, and when the next one is due back, before you make the trip.',
  },
  {
    icon: BookmarkSquareIcon,
    title: 'Loans that manage themselves',
    text: 'Borrow up to five books at a time for up to two weeks. Due dates, overdue notices, and returns all live in one place under My Books.',
  },
];

const STEPS = [
  { title: 'Join the library', text: 'Create a member account and confirm your email. It takes a couple of minutes.' },
  { title: 'Find your book', text: 'Search by title, author, or ISBN, or filter to what is available right now.' },
  { title: 'Borrow it', text: "Pick your due date, up to two weeks out, right from the book's page." },
  { title: 'Return it', text: 'Return from My Books when you are done, and the copy goes back on the shelf for the next reader.' },
];

const VALUES = [
  { icon: BoltIcon, title: 'Fair lending rules', text: 'Five loans at a time, two weeks per loan, one copy of any title per member. Simple limits that keep every shelf moving.' },
  { icon: SparklesIcon, title: 'A real catalog', text: 'Real books by real authors, with cover art, ISBNs, and publication details on every record.' },
  { icon: ClockIcon, title: 'Open around the clock', text: 'Browse, borrow, and return from any device, whenever suits you.' },
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
      const withCovers = (data.results || []).filter((b) => b.cover_url);
      setShowcaseBooks((withCovers.length >= 3 ? withCovers : data.results || []).slice(0, 3));
      setStats((s) => ({ ...s, books: data.count }));
    }).catch(() => {});

    api.get('/genres/').then((data) => {
      if (cancelled) return;
      setStats((s) => ({ ...s, genres: data.length }));
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
                <span className="eyebrow">Your library, online</span>
                <h1 className="hero-heading">
                  Find it on the shelf,<br /><em>borrow it in a minute.</em>
                </h1>
                <p className="hero-subtext">
                  Search the whole collection, see what is available right now, borrow for up to
                  two weeks, and keep track of every due date, all in one place.
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
                    <span className="hero-meta-label">Titles in the catalog</span>
                  </div>
                  <div className="hero-meta-item">
                    <span className="hero-meta-num"><AnimatedNumber value={stats.authors} /></span>
                    <span className="hero-meta-label">Authors on the shelves</span>
                  </div>
                  <div className="hero-meta-item">
                    <span className="hero-meta-num"><AnimatedNumber value={stats.genres} /></span>
                    <span className="hero-meta-label">Genres to browse</span>
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
              <h2>A catalog built for borrowing</h2>
              <p>Everything you need to find a book, take it home, and bring it back.</p>
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
              <h2>From membership to your next read, in four steps</h2>
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
              <span className="eyebrow" style={{ justifyContent: 'center' }}>How lending works</span>
              <h2>Simple rules that keep the shelves moving</h2>
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
              <h2>Your next book is on the shelf.</h2>
              <p>Join the library and borrow it today.</p>
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
