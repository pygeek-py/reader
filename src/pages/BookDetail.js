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
import { availabilityLabel, formatDate, shelfMark } from '../utils/catalog';

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

  const myLoan = isAuthenticated ? loans.find((loan) => loan.mine) : null;
  const availability = book ? availabilityLabel(book) : null;
  const soldOut = book && book.available_copies === 0;
  const nextBack = loans.length > 0
    ? loans.map((loan) => loan.due).sort()[0]
    : null;

  const details = book ? [
    ['Author', book.name],
    ['Genre', book.genre],
    book.publish_year && ['First published', book.publish_year],
    book.pages && ['Pages', book.pages],
    book.isbn && ['ISBN', book.isbn],
    ['Shelf mark', shelfMark(book)],
    ['Catalog no.', book.num],
  ].filter(Boolean) : [];

  const borrowButton = () => {
    if (!isAuthenticated) {
      return (
        <button className="btn btn-primary btn-lg" onClick={() => history.push('/signin')}>
          Sign in to borrow
        </button>
      );
    }
    if (myLoan) {
      return (
        <button className="btn btn-secondary btn-lg" onClick={() => history.push('/library/mine')}>
          On your loan, due {formatDate(myLoan.due)}
        </button>
      );
    }
    if (soldOut) {
      return <button className="btn btn-primary btn-lg" disabled>All copies on loan</button>;
    }
    return (
      <button className="btn btn-primary btn-lg" onClick={() => history.push(`/library/books/${num}/borrow`)}>
        Borrow this book
      </button>
    );
  };

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
                  <BookCover title={book.title} genre={book.genre} coverUrl={book.cover_url} size="L" />
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

                  {availability && (
                    <p className={`availability availability--${availability.tone} availability--lg`}>
                      <span className="availability-dot" />
                      {availability.long}
                    </p>
                  )}

                  <p className="book-detail-description">{book.description}</p>

                  <div className="book-detail-actions">
                    {borrowButton()}
                    {book.author_id && (
                      <button className="btn btn-secondary btn-lg" onClick={() => history.push(`/library/authors/${book.author_id}`)}>
                        <UserCircleIcon width={18} /> View author
                      </button>
                    )}
                  </div>

                  <dl className="catalog-details">
                    {details.map(([label, value]) => (
                      <div className="catalog-details-row" key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>

                  {isAuthenticated && loans.length > 0 && (
                    <div style={{ marginTop: 40 }}>
                      <h3 style={{ fontSize: '1.05rem', marginBottom: 6 }}>Currently on loan</h3>
                      {soldOut && nextBack && (
                        <p className="field-hint" style={{ marginBottom: 12 }}>
                          The next copy is due back {formatDate(nextBack)}.
                        </p>
                      )}
                      <div className="loan-status-list">
                        {loans.map((loan) => (
                          <div className="card loan-status-row" key={loan.id}>
                            <span className="status-icon"><ClockIcon /></span>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Due back {formatDate(loan.due)}</div>
                              <div className="field-hint">Edition: {loan.imprint}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
