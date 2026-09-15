import React, { useState } from 'react';

// When a book has a real cover_url, use it. Otherwise (or if it fails to load)
// fall back to a deterministic "spine" cover: a genre-tinted gradient plus its
// title, always the same for the same book, so nothing shows up broken.
const GENRE_GRADIENTS = {
  Fiction: ['#1F5E4D', '#173F34'],
  Romance: ['#8B3A4A', '#5E2733'],
  Classic: ['#3A4A6B', '#242E45'],
  'Modernist Literature': ['#4A4458', '#2E293A'],
  Bildungsroman: ['#8A6524', '#5C4419'],
  Fantasy: ['#3F5C3A', '#28401F'],
  'Magical Realism': ['#6B4A8B', '#432D5C'],
  Dystopia: ['#5A5A5A', '#333333'],
  Gothic: ['#2B2B33', '#151519'],
};
const FALLBACK_GRADIENT = ['#1F5E4D', '#17493C'];

function gradientFor(genre) {
  return GENRE_GRADIENTS[genre] || FALLBACK_GRADIENT;
}

const BookCover = ({ title, genre, coverUrl, className = '', style }) => {
  const [imageFailed, setImageFailed] = useState(false);

  if (coverUrl && !imageFailed) {
    return (
      <div className={`book-cover book-cover-image ${className}`} style={style}>
        <img
          src={coverUrl}
          alt={`Cover of ${title}`}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      </div>
    );
  }

  const [from, to] = gradientFor(genre);
  return (
    <div
      className={`book-cover ${className}`}
      style={{ background: `linear-gradient(155deg, ${from}, ${to})`, ...style }}
    >
      <span className="book-cover-title">{title}</span>
    </div>
  );
};

export default BookCover;
