import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import BookCard from '../components/BookCard';
import StateBlock from '../components/StateBlock';
import { api } from '../api/client';

const Search = ({ match }) => {
  const query = match.params.query;

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    api.get(`/lists/?search=${encodeURIComponent(query)}`)
      .then((data) => { if (!cancelled) setResults(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [query]);

  return (
    <div className="page">
      <SiteNav />
      <main className="page-content">
        <div className="container">
          <div className="page-header">
            <span className="eyebrow">Search results</span>
            <h1 className="page-title">“{query}”</h1>
            <p className="page-subtitle">{loading ? 'Searching...' : `${results.length} result${results.length === 1 ? '' : 's'}`}</p>
          </div>

          {loading && <StateBlock variant="loading" title="Searching the catalog..." />}
          {!loading && error && <StateBlock variant="error" title="Search failed" text={error} />}
          {!loading && !error && results.length === 0 && (
            <StateBlock
              icon={MagnifyingGlassIcon}
              title="No matches"
              text={`Nothing in the catalog starts with "${query}". Try a different title.`}
            />
          )}
          {!loading && !error && results.length > 0 && (
            <div className="book-grid" style={{ marginBottom: 40 }}>
              {results.map((book) => <BookCard key={book.id} book={book} />)}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Search;
