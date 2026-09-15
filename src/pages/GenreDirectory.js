import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RectangleGroupIcon } from '@heroicons/react/24/outline';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import StateBlock from '../components/StateBlock';
import { api } from '../api/client';

const slugify = (genre) => genre.toLowerCase().replace(/\s+/g, '-');

const GenreDirectory = () => {
  const history = useHistory();
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    api.get('/genres/')
      .then((data) => { if (!cancelled) setGenres(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="page">
      <SiteNav />
      <main className="page-content">
        <div className="container">
          <div className="page-header">
            <span className="eyebrow">Browse by category</span>
            <h1 className="page-title">Genres</h1>
            <p className="page-subtitle">Every genre currently represented in the catalog.</p>
          </div>

          {loading && <StateBlock variant="loading" title="Loading genres..." />}
          {!loading && error && <StateBlock variant="error" title="Couldn't load genres" text={error} />}
          {!loading && !error && genres.length === 0 && (
            <StateBlock icon={RectangleGroupIcon} title="No genres yet" text="Genres will appear once books are added to the library." />
          )}

          {!loading && !error && genres.length > 0 && (
            <div className="feature-grid" style={{ marginBottom: 40 }}>
              {genres.map((g) => {
                const open = () => history.push(`/library/genres/${slugify(g.genre)}`);
                return (
                  <div
                    key={g.genre}
                    className="feature-card"
                    style={{ cursor: 'pointer' }}
                    role="button"
                    tabIndex={0}
                    onClick={open}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } }}
                    aria-label={`Browse ${g.genre}`}
                  >
                    <div className="feature-icon-wrap"><RectangleGroupIcon width={22} /></div>
                    <h3>{g.genre}</h3>
                    <p>{g.book_count} book{g.book_count === 1 ? '' : 's'}</p>
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

export default GenreDirectory;
