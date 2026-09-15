import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Pagination = ({ page, numPages, onChange }) => {
  if (numPages <= 1) return null;

  const pages = Array.from({ length: numPages }, (_, i) => i + 1);

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="page-btn"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <ChevronLeftIcon />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`page-btn ${p === page ? 'is-active' : ''}`}
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className="page-btn"
        onClick={() => onChange(Math.min(numPages, page + 1))}
        disabled={page >= numPages}
        aria-label="Next page"
      >
        <ChevronRightIcon />
      </button>
    </nav>
  );
};

export default Pagination;
