import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BookmarkSquareIcon, CalendarDaysIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import BookCover from '../components/BookCover';
import StateBlock from '../components/StateBlock';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { MAX_ACTIVE_LOANS } from '../constants';
import { dueStatus, formatDate } from '../utils/catalog';

const MyLibrary = () => {
  const { user } = useAuth();
  const history = useHistory();

  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [returningId, setReturningId] = useState(null);
  const [notice, setNotice] = useState(null);
  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    api.get(`/userbo/${user.id}/`, { auth: true })
      .then((data) => { if (!cancelled) setLoans(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [user.id]);

  const returnBook = async (loan) => {
    setReturningId(loan.id);
    setNotice(null);
    setActionError(null);
    try {
      await api.post(`/return/${loan.id}/`, undefined, { auth: true });
      setLoans((current) => current.filter((l) => l.id !== loan.id));
      setNotice(`"${loan.title}" has been returned. Thank you!`);
    } catch (err) {
      setActionError(err.message);
    } finally {
      setReturningId(null);
    }
  };

  const sorted = [...loans].sort((a, b) => a.due.localeCompare(b.due));
  const overdueCount = sorted.filter((loan) => dueStatus(loan.due).tone === 'overdue').length;

  return (
    <div className="page">
      <SiteNav />
      <main className="page-content">
        <div className="container">
          <div className="page-header">
            <span className="eyebrow">Your loans</span>
            <h1 className="page-title">My Books</h1>
            <p className="page-subtitle">
              Everything you currently have borrowed, soonest due first.
              {!loading && !error && ` ${loans.length} of ${MAX_ACTIVE_LOANS} loans in use.`}
            </p>
          </div>

          {notice && (
            <div className="form-notice-banner" style={{ marginBottom: 20 }}>
              <CheckCircleIcon />
              <span>{notice}</span>
            </div>
          )}
          {actionError && (
            <div className="form-error-banner" style={{ marginBottom: 20 }}>
              <ExclamationTriangleIcon />
              <span>{actionError}</span>
            </div>
          )}
          {overdueCount > 0 && (
            <div className="form-error-banner" style={{ marginBottom: 20 }}>
              <ExclamationTriangleIcon />
              <span>
                {overdueCount === 1 ? 'One of your loans is' : `${overdueCount} of your loans are`} overdue. Please return
                {overdueCount === 1 ? ' it' : ' them'} as soon as you can.
              </span>
            </div>
          )}

          {loading && <StateBlock variant="loading" title="Loading your books..." />}
          {!loading && error && <StateBlock variant="error" title="Couldn't load your books" text={error} />}

          {!loading && !error && loans.length === 0 && (
            <StateBlock
              icon={BookmarkSquareIcon}
              title="You have nothing on loan"
              text="Browse the library and borrow a book to see it show up here."
            >
              <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => history.push('/library')}>
                Browse the library
              </button>
            </StateBlock>
          )}

          {!loading && !error && sorted.length > 0 && (
            <div className="stack gap-md" style={{ marginTop: 8, marginBottom: 40 }}>
              {sorted.map((loan) => {
                const status = dueStatus(loan.due);
                return (
                  <div className="card card-padded loan-card" key={loan.id}>
                    <BookCover title={loan.title} genre={loan.genre} coverUrl={loan.cover_url} />
                    <div className="loan-card-body">
                      <div className="row gap-sm" style={{ flexWrap: 'wrap' }}>
                        <span className="badge badge-neutral">{loan.genre}</span>
                        <span className={`due-badge due-badge--${status.tone}`}>{status.label}</span>
                      </div>
                      <h3 className="loan-card-title" style={{ marginTop: 8 }}>{loan.title}</h3>
                      <p className="field-hint">{loan.name}</p>
                      <div className="loan-meta-grid">
                        <div>
                          <div className="loan-meta-label">Edition</div>
                          <div className="loan-meta-value">{loan.imprint}</div>
                        </div>
                        <div>
                          <div className="loan-meta-label">Due back</div>
                          <div className="loan-meta-value row gap-xs">
                            <CalendarDaysIcon width={15} /> {formatDate(loan.due)}
                          </div>
                        </div>
                      </div>
                      <div className="loan-actions">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => returnBook(loan)}
                          disabled={returningId === loan.id}
                        >
                          {returningId === loan.id ? 'Returning…' : 'Return this book'}
                        </button>
                        <button className="btn-ghost" onClick={() => history.push(`/library/books/${loan.num}`)}>
                          View book
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default MyLibrary;
