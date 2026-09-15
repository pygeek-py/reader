import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

const Signup = () => {
  const { register } = useAuth();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [mismatch, setMismatch] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setMismatch(false);

    if (password !== confirm) {
      setMismatch(true);
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setSubmitting(true);
    try {
      await register({ username, email, password });
      history.push('/library');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      quote="“So many books, so little time.”"
      attribution="Frank Zappa"
    >
      <div className="auth-form-header">
        <h1>Create your account</h1>
        <p>Join Reader to start discovering and borrowing.</p>
      </div>

      {error && (
        <div className="form-error-banner" style={{ marginBottom: 20 }}>
          <ExclamationTriangleIcon />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={submit} noValidate>
        <div className="field">
          <label className="field-label" htmlFor="username">Username</label>
          <input
            id="username"
            className="input"
            placeholder="Choose a username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="input"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="password">Password</label>
          <div className="input-with-action">
            <input
              id="password"
              className="input"
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="input-action-btn"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="confirm">Confirm password</label>
          <input
            id="confirm"
            className={`input ${mismatch ? 'has-error' : ''}`}
            type={showPassword ? 'text' : 'password'}
            placeholder="Re-enter your password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          {mismatch && <span className="field-error">Passwords don't match.</span>}
        </div>

        <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: 28 }} disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="auth-legal-note">
        By creating an account, you agree to our{' '}
        <button type="button" className="btn-ghost" onClick={() => history.push('/terms')}>Terms</button>
        {' '}and{' '}
        <button type="button" className="btn-ghost" onClick={() => history.push('/privacy')}>Privacy Policy</button>.
      </p>

      <p className="auth-switch">
        Already have an account? <button type="button" className="btn-ghost" style={{ fontWeight: 700 }} onClick={() => history.push('/signin')}>Sign in</button>
      </p>
    </AuthLayout>
  );
};

export default Signup;
