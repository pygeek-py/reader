import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { MagnifyingGlassIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';
import StateBlock from '../components/StateBlock';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

const slugify = (genre) => genre.toLowerCase().replace(/\s+/g, '-');

const Library = () => {
  const { user, isAuthenticated } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const { page: pageParam } = useParams();
  const page = Number(pageParam) || 1;
  const onlyAvailable = new URLSearchParams(location.search).get('available') === '1';

  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(null);
  const [numPages, setNumPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let cancelled = false;
    api.get('/genres/')
      .then((data) => { if (!cancelled) setGenres(data); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    api.get(`/?page=${page}${onlyAvailable ? '&available=1' : ''}`)
      .then((data) => {
        if (cancelled) return;
        setBooks(data.results);
        setNumPages(data.num_pages);
        setTotal(data.count);
      })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [page, onlyAvailable]);

  const submitSearch = (e) => {
    e.preventDefault();
    if (search.trim()) history.push(`/library/search/${encodeURIComponent(search.trim())}`);
  };

  const filterSuffix = onlyAvailable ? '?available=1' : '';
  const goToPage = (p) => history.push(`${p === 1 ? '/library' : `/library/page/${p}`}${filterSuffix}`);
  const toggleAvailable = () => history.push(onlyAvailable ? '/library' : '/library?available=1');

  return (
    <div className="page">
      <SiteNav />
      <main className="page-content">
        <div className="container">
          <div className="page-header">
            <span className="eyebrow">{isAuthenticated ? `Welcome back, ${user.username}` : 'Browse the catalog'}</span>
            <h1 className="page-title">The catalog</h1>
            <p className="page-subtitle">
              {isAuthenticated
                ? 'Search by title, author, or ISBN, or browse the shelves by genre. Availability is live.'
                : 'Look around freely, with live availability. Create an account when you find something you want to borrow.'}
            </p>
          </div>

          <div className="toolbar">
            <form className="input-with-action" onSubmit={submitSearch}>
              <input
                className="input"
                placeholder="Search by title, author, or ISBN..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="input-action-btn" aria-label="Search">
                <MagnifyingGlassIcon />
              </button>
            </form>
            <div className="filter-pills">
              <button
                type="button"
                className={`tag-pill ${onlyAvailable ? 'is-active' : ''}`}
                aria-pressed={onlyAvailable}
                onClick={toggleAvailable}
              >
                Available now
              </button>
              {genres.map((g) => (
                <button
                  type="button"
                  key={g.genre}
                  className="tag-pill"
                  onClick={() => history.push(`/library/genres/${encodeURIComponent(slugify(g.genre))}`)}
                >
                  {g.genre}
                </button>
              ))}
            </div>
          </div>

          {!loading && !error && total !== null && (
            <p className="results-count">
              {total} title{total === 1 ? '' : 's'}{onlyAvailable ? ' available to borrow now' : ' in the catalog'}
            </p>
          )}

          {loading && <StateBlock variant="loading" title="Loading the catalog..." />}
          {!loading && error && (
            <StateBlock variant="error" title="Couldn't load the catalog" text={error} />
          )}
          {!loading && !error && books.length === 0 && (
            <StateBlock
              icon={BookOpenIcon}
              title={onlyAvailable ? 'Nothing is available right now' : 'No books yet'}
              text={onlyAvailable
                ? 'Every title is currently on loan. Check back soon, or clear the filter to see the whole catalog.'
                : 'The catalog is empty right now. Check back soon.'}
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
