import React from 'react';
import { useHistory } from 'react-router-dom';

const initialsOf = (name) => (name || '?').trim().charAt(0).toUpperCase();

const AuthorCard = ({ author }) => {
  const history = useHistory();
  const open = () => history.push(`/library/authors/${author.id}`);

  return (
    <article
      className="card author-card"
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      }}
      aria-label={`View books by ${author.display_name}`}
    >
      <div className="author-avatar-circle">{initialsOf(author.display_name)}</div>
      <h3 className="author-card-name">{author.display_name}</h3>
      <p className="author-card-count">
        {author.book_count} book{author.book_count === 1 ? '' : 's'} in the library
      </p>
      <span className="btn-ghost" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
        View books &rarr;
      </span>
    </article>
  );
};

export default AuthorCard;
