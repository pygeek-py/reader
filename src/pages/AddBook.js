import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { api } from '../api/client';
import { GENRES } from '../constants';

const AddBook = () => {
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [genre, setGenre] = useState(GENRES[0]);
  const [num, setNum] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [pages, setPages] = useState('');
  const [copies, setCopies] = useState('1');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSubmitting(true);
    try {
      await api.post('/bookp/', {
        title, description, genre, name, num,
        cover_url: coverUrl,
        isbn,
        publish_year: publishYear || null,
        pages: pages || null,
        copies: copies || 1,
      }, { auth: true });
      setSuccess(true);
      setTitle(''); setName(''); setNum(''); setIsbn(''); setPublishYear(''); setPages('');
      setCopies('1'); setDescription(''); setCoverUrl('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <SiteNav />
      <main className="page-content">
        <div className="container form-page" style={{ paddingTop: 32, paddingBottom: 60 }}>
          <div className="page-header" style={{ padding: 0, marginBottom: 28 }}>
            <span className="eyebrow">Librarian tools</span>
            <h1 className="page-title" style={{ fontSize: '1.9rem' }}>Add a book</h1>
            <p className="page-subtitle">Catalog a new title and set how many copies the library holds.</p>
          </div>

          {success && (
            <div className="form-notice-banner" style={{ marginBottom: 20 }}>
              <CheckCircleIcon />
              <span>
                Added to the catalog.{' '}
                <button type="button" className="btn-ghost" style={{ fontWeight: 700 }} onClick={() => history.push('/library')}>
                  View the catalog
                </button>
              </span>
            </div>
          )}
          {error && (
            <div className="form-error-banner" style={{ marginBottom: 20 }}>
              <ExclamationTriangleIcon />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={submit}>
            <div className="field">
              <label className="field-label" htmlFor="title">Title</label>
              <input id="title" className="input" maxLength={200} value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="name">Author</label>
              <input id="name" className="input" maxLength={100} placeholder="How the author's name should display" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="genre">Genre</label>
              <select id="genre" className="input" value={genre} onChange={(e) => setGenre(e.target.value)}>
                {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="field-row">
              <div className="field">
                <label className="field-label" htmlFor="num">Catalog number</label>
                <input id="num" type="number" className="input" value={num} onChange={(e) => setNum(e.target.value)} required />
                <span className="field-hint">Must be unique.</span>
              </div>
              <div className="field">
                <label className="field-label" htmlFor="copies">Copies held</label>
                <input id="copies" type="number" min="1" max="99" className="input" value={copies} onChange={(e) => setCopies(e.target.value)} required />
              </div>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="isbn">ISBN <span className="field-hint">(optional)</span></label>
              <input id="isbn" className="input" maxLength={20} value={isbn} onChange={(e) => setIsbn(e.target.value)} />
            </div>
            <div className="field-row">
              <div className="field">
                <label className="field-label" htmlFor="publishYear">First published <span className="field-hint">(optional)</span></label>
                <input id="publishYear" type="number" min="1" max="2100" className="input" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} />
              </div>
              <div className="field">
                <label className="field-label" htmlFor="pages">Pages <span className="field-hint">(optional)</span></label>
                <input id="pages" type="number" min="1" className="input" value={pages} onChange={(e) => setPages(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="description">Description</label>
              <textarea id="description" className="textarea" maxLength={1500} value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="coverUrl">Cover image URL <span className="field-hint">(optional)</span></label>
              <input
                id="coverUrl"
                type="url"
                className="input"
                placeholder="https://..."
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
              />
              <span className="field-hint">Leave blank to use a generated cover instead.</span>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: 8 }} disabled={submitting}>
              {submitting ? 'Adding…' : 'Add to catalog'}
            </button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default AddBook;
