import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import BookCover from '../components/BookCover';
import StateBlock from '../components/StateBlock';
import { api } from '../api/client';
import LinkButton from '../components/LinkButton';

const Borrow = ({ match }) => {
  const history = useHistory();
  const num = match.params.num;

  const [book, setBook] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [imprint, setImprint] = useState('');
  const [due, setDue] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api.get(`/each/${num}/`)
      .then((data) => { if (!cancelled) setBook(data); })
      .catch((err) => { if (!cancelled) setLoadError(err.message); });
    return () => { cancelled = true; };
  }, [num]);

  const submit = async (e) => {
    e.preventDefault();
    if (!imprint || !due) {
      setError('Imprint and due date are both required.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await api.post('/borrow/', {
        title: book.title, name: book.name, description: book.description,
        genre: book.genre, num: book.num, imprint, due, cover_url: book.cover_url,
      }, { auth: true });
      history.push('/library/mine');
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loadError) {
    return (
      <div className="page">
        <SiteNav />
        <main className="page-content container">
          <StateBlock variant="error" title="Couldn't load this book" text={loadError} />
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="page">
      <SiteNav />
      <main className="page-content">
        <div className="container form-page" style={{ paddingTop: 32 }}>
          <div className="breadcrumbs">
            <LinkButton onClick={() => history.push('/library')}>Library</LinkButton>
            <span>/</span>
            <span className="current">Borrow</span>
          </div>

          <div className="page-header" style={{ padding: 0, marginBottom: 28 }}>
            <h1 className="page-title" style={{ fontSize: '1.9rem' }}>
              {book ? `Borrow “${book.title}”` : 'Borrow this book'}
            </h1>
          </div>

          {book && (
            <div className="card card-padded row gap-md" style={{ marginBottom: 28 }}>
              <BookCover title={book.title} genre={book.genre} coverUrl={book.cover_url} style={{ width: 70, aspectRatio: 'auto', height: 92, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>{book.title}</div>
                <div className="field-hint">{book.name} · {book.genre}</div>
              </div>
            </div>
          )}

          {error && (
            <div className="form-error-banner" style={{ marginBottom: 20 }}>
              <ExclamationTriangleIcon />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={submit}>
            <div className="field">
              <label className="field-label" htmlFor="imprint">Imprint / edition</label>
              <input
                id="imprint"
                className="input"
                placeholder="e.g. First Edition, Penguin Classics"
                value={imprint}
                onChange={(e) => setImprint(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="due">Due back</label>
              <input
                id="due"
                type="date"
                className="input"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: 24 }} disabled={submitting || !book}>
              {submitting ? 'Submitting…' : 'Confirm borrow'}
            </button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Borrow;
