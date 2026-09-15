import React from 'react';
import { useHistory } from 'react-router-dom';
import BookCover from './BookCover';

const BookCard = ({ book }) => {
  const history = useHistory();
  const open = () => history.push(`/library/books/${book.num}`);

  return (
    <article
      className="book-card"
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      }}
      aria-label={`View ${book.title}`}
    >
      <div className="book-card-cover-wrap">
        <BookCover title={book.title} genre={book.genre} coverUrl={book.cover_url} />
      </div>
      <div>
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">{book.name}</p>
      </div>
      <div className="book-card-footer">
        <span className="badge badge-neutral">{book.genre}</span>
      </div>
    </article>
  );
};

export default BookCard;
