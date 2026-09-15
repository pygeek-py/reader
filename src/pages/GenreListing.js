import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RectangleGroupIcon } from '@heroicons/react/24/outline';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';
import StateBlock from '../components/StateBlock';
import { api } from '../api/client';
import LinkButton from '../components/LinkButton';

const slugify = (genre) => genre.toLowerCase().replace(/\s+/g, '-');

const GenreListing = ({ match }) => {
  const history = useHistory();
  const slug = match.params.slug;

  const [genreName, setGenreName] = useState(null);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setPage(1);

    api.get('/genres/')
      .then((genres) => {
        if (cancelled) return null;
        const match = genres.find((g) => slugify(g.genre) === slug);
        if (!match) {
          setError('This genre doesn\'t exist in the catalog.');
          return null;
        }
        setGenreName(match.genre);
        return api.get(`/?genre=${encodeURIComponent(match.genre)}&page=1`);
      })
      .then((data) => {
        if (cancelled || !data) return;
        setBooks(data.results);
        setNumPages(data.num_pages);
      })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [slug]);

  const goToPage = (p) => {
    setLoading(true);
    api.get(`/?genre=${encodeURIComponent(genreName)}&page=${p}`)
      .then((data) => {
        setBooks(data.results);
        setNumPages(data.num_pages);
        setPage(p);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="page">
      <SiteNav />
      <main className="page-content">
        <div className="container">
          <div className="breadcrumbs" style={{ marginTop: 32 }}>
            <LinkButton onClick={() => history.push('/library/genres')}>Genres</LinkButton>
            <span>/</span>
            <span className="current">{genreName || '...'}</span>
          </div>

          <div className="page-header" style={{ paddingTop: 0 }}>
            <h1 className="page-title">{genreName || 'Genre'}</h1>
          </div>

          {loading && <StateBlock variant="loading" title="Loading books..." />}
          {!loading && error && <StateBlock variant="error" title="Couldn't load this genre" text={error} />}
          {!loading && !error && books.length === 0 && (
            <StateBlock icon={RectangleGroupIcon} title="No books in this genre yet" />
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

export default GenreListing;
