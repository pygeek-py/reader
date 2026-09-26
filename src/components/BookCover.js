import React, { useState } from 'react';

// When a book has a real cover_url, use it. Otherwise (or if it fails to load)
// fall back to a deterministic "spine" cover: a genre-tinted gradient plus its
// title, always the same for the same book, so nothing shows up broken.
const GENRE_GRADIENTS = {
  Classics: ['#3A4A6B', '#242E45'],
  'Literary Fiction': ['#1F5E4D', '#173F34'],
  Fantasy: ['#3F5C3A', '#28401F'],
  'Science Fiction': ['#2F5B7A', '#1B3549'],
  Dystopian: ['#5A5A5A', '#333333'],
  Mystery: ['#4A4458', '#2E293A'],
  Romance: ['#8B3A4A', '#5E2733'],
  'Historical Fiction': ['#8A6524', '#5C4419'],
  Horror: ['#2B2B33', '#151519'],
  'Non-Fiction': ['#6B4A2B', '#43301C'],
};
const FALLBACK_GRADIENT = ['#1F5E4D', '#17493C'];

function gradientFor(genre) {
  return GENRE_GRADIENTS[genre] || FALLBACK_GRADIENT;
}

// Open Library serves each cover in several sizes; the large one is heavy, so
// cards and lists ask for the medium size and only the book page asks for large.
function sizedCoverUrl(url, size) {
  return url.includes('covers.openlibrary.org') ? url.replace(/-[SML]\.jpg/, `-${size}.jpg`) : url;
}

const BookCover = ({ title, genre, coverUrl, size = 'M', className = '', style }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [from, to] = gradientFor(genre);
  const hasImage = coverUrl && !imageFailed;

  // The tinted spine cover is always underneath; the real cover fades in over
  // it once it arrives, so a slow image host never leaves an empty box.
  return (
    <div
      className={`book-cover ${hasImage ? 'book-cover-image' : ''} ${className}`}
      style={{ background: `linear-gradient(155deg, ${from}, ${to})`, ...style }}
    >
      {!(hasImage && imageLoaded) && <span className="book-cover-title">{title}</span>}
      {hasImage && (
        <img
          src={sizedCoverUrl(coverUrl, size)}
          alt={`Cover of ${title}`}
          loading="lazy"
          className={imageLoaded ? 'is-loaded' : ''}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  );
};

export default BookCover;
