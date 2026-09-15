import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { api } from '../api/client';

const GENRES = ['Fiction', 'Romance', 'Classic', 'Modernist Literature', 'Bildungsroman', 'Fantasy', 'Magical Realism', 'Dystopia', 'Gothic'];

const AddBook = () => {
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [genre, setGenre] = useState(GENRES[0]);
  const [num, setNum] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await api.post('/bookp/', { title, description, genre, name, num, cover_url: coverUrl }, { auth: true });
      setSuccess(true);
      setTitle(''); setName(''); setNum(''); setDescription(''); setCoverUrl('');
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
            <span className="eyebrow">Contribute to the catalog</span>
            <h1 className="page-title" style={{ fontSize: '1.9rem' }}>Add a book</h1>
            <p className="page-subtitle">Add a title to the library under your name as its author.</p>
          </div>

          {success && (
            <div className="form-notice-banner" style={{ marginBottom: 20 }}>
              <CheckCircleIcon />
              <span>
                Added to the catalog.{' '}
                <button type="button" className="btn-ghost" style={{ fontWeight: 700 }} onClick={() => history.push('/library')}>
                  View the library
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
              <input id="title" className="input" maxLength={30} value={title} onChange={(e) => setTitle(e.target.value)} required />
              <span className="field-hint">Up to 30 characters.</span>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="name">Author name</label>
              <input id="name" className="input" maxLength={30} placeholder="How the author's name should display" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="genre">Genre</label>
              <select id="genre" className="input" value={genre} onChange={(e) => setGenre(e.target.value)}>
                {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="num">Catalog number</label>
              <input id="num" type="number" className="input" value={num} onChange={(e) => setNum(e.target.value)} required />
              <span className="field-hint">A unique identifier for this copy in the catalog.</span>
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
