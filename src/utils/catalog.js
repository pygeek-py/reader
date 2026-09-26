const stripAccents = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '');

// Shelf mark in the style public libraries use: a section prefix plus the
// first three letters of the author's surname (e.g. "FIC AUS").
export function shelfMark(book) {
  const prefix = book.genre === 'Non-Fiction' ? 'NF' : 'FIC';
  const words = stripAccents(book.name || '').trim().split(/\s+/);
  const surname = (words[words.length - 1] || '').replace(/[^A-Za-z]/g, '');
  return `${prefix} ${surname.slice(0, 3).toUpperCase()}`.trim();
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// due is a "YYYY-MM-DD" string from the API; compare by whole local days.
export function dueStatus(due) {
  const [year, month, day] = due.split('-').map(Number);
  const dueDate = new Date(year, month - 1, day);
  const days = Math.round((dueDate - startOfDay(new Date())) / MS_PER_DAY);

  if (days < 0) {
    const late = Math.abs(days);
    return { tone: 'overdue', label: `Overdue by ${late} day${late === 1 ? '' : 's'}` };
  }
  if (days === 0) return { tone: 'soon', label: 'Due today' };
  if (days === 1) return { tone: 'soon', label: 'Due tomorrow' };
  if (days <= 3) return { tone: 'soon', label: `Due in ${days} days` };
  return { tone: 'ok', label: `Due in ${days} days` };
}

export function formatDate(due) {
  const [year, month, day] = due.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function availabilityLabel(book) {
  const { available_copies: free, copies } = book;
  if (free === undefined || copies === undefined) return null;
  if (free === 0) return { tone: 'out', short: 'On loan', long: `All ${copies} cop${copies === 1 ? 'y is' : 'ies are'} on loan` };
  return {
    tone: 'in',
    short: 'Available',
    long: `${free} of ${copies} cop${copies === 1 ? 'y' : 'ies'} available`,
  };
}
