import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import BookCard from '../components/BookCard';
import StateBlock from '../components/StateBlock';
import { api } from '../api/client';
import LinkButton from '../components/LinkButton';

const initialsOf = (name) => (name || '?').trim().charAt(0).toUpperCase();

const AuthorDetail = ({ match }) => {
  const history = useHistory();
  const authorId = match.params.id;

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    api.get(`/autbook/${authorId}/`)
      .then((data) => { if (!cancelled) setAuthor(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [authorId]);

  return (
    <div className="page">
      <SiteNav />
      <main className="page-content">
        <div className="container" style={{ paddingTop: 32 }}>
          {loading && <StateBlock variant="loading" title="Loading author..." />}
          {!loading && error && <StateBlock variant="error" title="Couldn't load this author" text={error} />}

          {!loading && !error && author && (
            <>
              <div className="breadcrumbs">
                <LinkButton onClick={() => history.push('/library/authors')}>Authors</LinkButton>
                <span>/</span>
                <span className="current">{author.display_name}</span>
              </div>

              <div className="author-hero">
                <div className="author-hero-avatar">{initialsOf(author.display_name)}</div>
                <div>
                  <h1 className="author-hero-name">{author.display_name}</h1>
                  <p className="author-hero-count">
                    {author.book_count} book{author.book_count === 1 ? '' : 's'} in the library
                  </p>
                </div>
              </div>

              <div style={{ marginTop: 48 }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: 24 }}>Books by {author.display_name}</h2>
                {author.books.length === 0 ? (
                  <StateBlock title="No books listed yet" text="This author doesn't have any books in the catalog." />
                ) : (
                  <div className="book-grid">
                    {author.books.map((book) => <BookCard key={book.id} book={book} />)}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default AuthorDetail;
