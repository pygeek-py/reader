import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BookmarkSquareIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import BookCover from '../components/BookCover';
import StateBlock from '../components/StateBlock';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

const MyLibrary = () => {
  const { user } = useAuth();
  const history = useHistory();

  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="page">
      <SiteNav />
      <main className="page-content">
        <div className="container">
          <div className="page-header">
            <span className="eyebrow">Your loans</span>
            <h1 className="page-title">My Books</h1>
            <p className="page-subtitle">Everything you currently have borrowed, with imprint and due date at a glance.</p>
          </div>

          {loading && <StateBlock variant="loading" title="Loading your books..." />}
          {!loading && error && <StateBlock variant="error" title="Couldn't load your books" text={error} />}

          {!loading && !error && loans.length === 0 && (
            <StateBlock
              icon={BookmarkSquareIcon}
              title="You haven't borrowed anything yet"
              text="Browse the library and borrow a book to see it show up here."
            >
              <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => history.push('/library')}>
                Browse the library
              </button>
            </StateBlock>
          )}

          {!loading && !error && loans.length > 0 && (
            <div className="stack gap-md" style={{ marginTop: 8, marginBottom: 40 }}>
              {loans.map((loan) => (
                <div className="card card-padded loan-card" key={loan.id}>
                  <BookCover title={loan.title} genre={loan.genre} coverUrl={loan.cover_url} />
                  <div className="loan-card-body">
                    <span className="badge badge-neutral">{loan.genre}</span>
                    <h3 className="loan-card-title" style={{ marginTop: 8 }}>{loan.title}</h3>
                    <p className="field-hint">{loan.name}</p>
                    <div className="loan-meta-grid">
                      <div>
                        <div className="loan-meta-label">Imprint</div>
                        <div className="loan-meta-value">{loan.imprint}</div>
                      </div>
                      <div>
                        <div className="loan-meta-label">Due back</div>
                        <div className="loan-meta-value row gap-xs">
                          <CalendarDaysIcon width={15} /> {loan.due}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default MyLibrary;
