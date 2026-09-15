import React, { useEffect, useMemo, useState } from 'react';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import AuthorCard from '../components/AuthorCard';
import StateBlock from '../components/StateBlock';
import { api } from '../api/client';

const AuthorDirectory = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    api.get('/author/')
      .then((data) => { if (!cancelled) setAuthors(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return authors;
    const q = query.trim().toLowerCase();
    return authors.filter((a) => a.display_name.toLowerCase().includes(q) || a.username.toLowerCase().includes(q));
  }, [authors, query]);

  return (
    <div className="page">
      <SiteNav />
      <main className="page-content">
        <div className="container">
          <div className="page-header">
            <span className="eyebrow">The people behind the catalog</span>
            <h1 className="page-title">Authors</h1>
            <p className="page-subtitle">Every author here has at least one book in the library. This list is built directly from the catalog.</p>
          </div>

          <div className="toolbar">
            <div className="input-with-action">
              <input className="input" placeholder="Find an author..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>

          {loading && <StateBlock variant="loading" title="Loading authors..." />}
          {!loading && error && <StateBlock variant="error" title="Couldn't load authors" text={error} />}
          {!loading && !error && filtered.length === 0 && (
            <StateBlock
              icon={UserGroupIcon}
              title={authors.length === 0 ? 'No authors yet' : 'No matches'}
              text={authors.length === 0
                ? 'Authors appear here once their books are added to the library.'
                : 'Try a different search.'}
            />
          )}
          {!loading && !error && filtered.length > 0 && (
            <div className="author-grid">
              {filtered.map((author) => <AuthorCard key={author.id} author={author} />)}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default AuthorDirectory;
