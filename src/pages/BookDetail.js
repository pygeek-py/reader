import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ClockIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import BookCover from '../components/BookCover';
import StateBlock from '../components/StateBlock';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import LinkButton from '../components/LinkButton';

const BookDetail = ({ match }) => {
  const { isAuthenticated } = useAuth();
  const history = useHistory();
  const num = match.params.num;

  const [book, setBook] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    api.get(`/each/${num}/`)
      .then((data) => { if (!cancelled) setBook(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    if (isAuthenticated) {
      api.get(`/eachborrow/${num}/`, { auth: true })
        .then((data) => { if (!cancelled) setLoans(data); })
        .catch(() => {});
    }

    return () => { cancelled = true; };
  }, [num, isAuthenticated]);

  return (
    <div className="page">
      <SiteNav />
      <main className="page-content">
        <div className="container" style={{ paddingTop: 32 }}>
          {loading && <StateBlock variant="loading" title="Loading book..." />}
          {!loading && error && <StateBlock variant="error" title="Couldn't load this book" text={error} />}

          {!loading && !error && book && (
            <>
              <div className="breadcrumbs">
                <LinkButton onClick={() => history.push('/library')}>Library</LinkButton>
                <span>/</span>
                <span className="current">{book.title}</span>
              </div>

              <div className="book-detail-grid">
                <div className="book-detail-cover">
                  <BookCover title={book.title} genre={book.genre} coverUrl={book.cover_url} />
                </div>

                <div>
                  <h1 className="book-detail-title">{book.title}</h1>
                  <div className="book-detail-meta-row">
                    <span className="book-detail-author">
                      by{' '}
                      {book.author_id ? (
                        <LinkButton onClick={() => history.push(`/library/authors/${book.author_id}`)}>{book.name}</LinkButton>
                      ) : book.name}
                    </span>
                    <span className="divider-dot" />
                    <span className="badge">{book.genre}</span>
                  </div>

                  <p className="book-detail-description">{book.description}</p>

                  <div className="book-detail-actions">
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={() => history.push(isAuthenticated ? `/library/books/${num}/borrow` : '/signin')}
                    >
                      {isAuthenticated ? 'Borrow this book' : 'Sign in to borrow'}
                    </button>
                    {book.author_id && (
                      <button className="btn btn-secondary btn-lg" onClick={() => history.push(`/library/authors/${book.author_id}`)}>
                        <UserCircleIcon width={18} /> View author
                      </button>
                    )}
                  </div>

                  <div style={{ marginTop: 48 }}>
                    <h3 style={{ fontSize: '1.05rem', marginBottom: 6 }}>Copies currently on loan</h3>
                    {!isAuthenticated ? (
                      <p className="field-hint">
                        <LinkButton onClick={() => history.push('/signin')}>Sign in</LinkButton> to see availability.
                      </p>
                    ) : loans.length === 0 ? (
                      <p className="field-hint">No copies are currently on loan. This one's available.</p>
                    ) : (
                      <div className="loan-status-list">
                        {loans.map((loan) => (
                          <div className="card loan-status-row" key={loan.id}>
                            <span className="status-icon"><ClockIcon /></span>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Due back {loan.due}</div>
                              <div className="field-hint">Imprint: {loan.imprint}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default BookDetail;
