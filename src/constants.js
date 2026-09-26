// Mirrors the library's borrowing rules, which the backend enforces.
export const MAX_ACTIVE_LOANS = 5;
export const MAX_LOAN_DAYS = 14;

// Genres the catalog is shelved under (used by the Add a Book form; the
// browse pages read the genres actually present from the API).
export const GENRES = [
  'Classics',
  'Literary Fiction',
  'Fantasy',
  'Science Fiction',
  'Dystopian',
  'Mystery',
  'Romance',
  'Historical Fiction',
  'Horror',
  'Non-Fiction',
];
