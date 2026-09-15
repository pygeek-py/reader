import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MagnifyingGlassIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';
import StateBlock from '../components/StateBlock';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

const GENRES = ['Fiction', 'Romance', 'Classic', 'Modernist Literature', 'Bildungsroman', 'Fantasy', 'Magical Realism', 'Dystopia', 'Gothic'];

const Library = () => {
  const { user, isAuthenticated } = useAuth();
  const history = useHistory();
  const { page: pageParam } = useParams();
  const page = Number(pageParam) || 1;

  const [books, setBooks] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    api.get(`/?page=${page}`)
      .then((data) => {
        if (cancelled) return;
        setBooks(data.results);
        setNumPages(data.num_pages);
      })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [page]);

  const submitSearch = (e) => {
    e.preventDefault();
    if (search.trim()) history.push(`/library/search/${encodeURIComponent(search.trim())}`);
  };

  const goToPage = (p) => history.push(p === 1 ? '/library' : `/library/page/${p}`);

  return (
    <div className="page">
      <SiteNav />
      <main className="page-content">
        <div className="container">
          <div className="page-header">
            <span className="eyebrow">{isAuthenticated ? `Welcome back, ${user.username}` : 'Browse the catalog'}</span>
            <h1 className="page-title">What will you read next?</h1>
            <p className="page-subtitle">
              {isAuthenticated
                ? 'Browse everything currently in the catalog, or search for a title you already have in mind.'
                : 'Look around freely. Create an account when you find something you want to borrow.'}
            </p>
          </div>

          <div className="toolbar">
            <form className="input-with-action" onSubmit={submitSearch}>
              <input
                className="input"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="input-action-btn" aria-label="Search">
                <MagnifyingGlassIcon />
              </button>
            </form>
            <div className="filter-pills">
              {GENRES.slice(0, 5).map((g) => (
                <button
                  type="button"
                  key={g}
                  className="tag-pill"
                  onClick={() => history.push(`/library/genres/${encodeURIComponent(g.toLowerCase().replace(/\s+/g, '-'))}`)}
                >
                  {g}
                </button>
              ))}
              <button type="button" className="tag-pill" onClick={() => history.push('/library/genres')}>More genres</button>
            </div>
          </div>

          {loading && <StateBlock variant="loading" title="Loading the catalog..." />}
          {!loading && error && (
            <StateBlock variant="error" title="Couldn't load the catalog" text={error} />
          )}
          {!loading && !error && books.length === 0 && (
            <StateBlock
              icon={BookOpenIcon}
              title="No books yet"
              text="The catalog is empty right now. Check back soon, or add a book of your own."
            />
          )}

          {!loading && !error && books.length > 0 && (
            <>
              <div className="book-grid">
                {books.map((book) => <BookCard key={book.id} book={book} />)}
              </div>
              <Pagination page={page} numPages={numPages} onChange={goToPage} />
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Library;
