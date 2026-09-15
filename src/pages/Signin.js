import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

const Signin = () => {
  const { login } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [unverifiedUsername, setUnverifiedUsername] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const params = new URLSearchParams(location.search);
  const justVerified = params.get('verified') === '1';
  const justReset = params.get('reset') === '1';

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setUnverifiedUsername('');
    setSubmitting(true);
    try {
      await login(username, password);
      history.push('/library');
    } catch (err) {
      if (err.data && err.data.code === 'unverified') {
        setUnverifiedUsername(username);
      } else {
        setError(err.message || 'Something went wrong. Please try again.');
      }
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      quote="“A room without books is like a body without a soul.”"
      attribution="Marcus Tullius Cicero"
    >
      <div className="auth-form-header">
        <h1>Welcome back</h1>
        <p>Sign in to pick up where you left off.</p>
      </div>

      {justVerified && (
        <div className="form-notice-banner" style={{ marginBottom: 20 }}>
          Your email is verified. You can sign in now.
        </div>
      )}
      {justReset && (
        <div className="form-notice-banner" style={{ marginBottom: 20 }}>
          Your password was reset. Sign in with your new password.
        </div>
      )}

      {unverifiedUsername && (
        <div className="form-error-banner" style={{ marginBottom: 20 }}>
          <ExclamationTriangleIcon />
          <span>
            This account hasn't verified its email yet.{' '}
            <button
              type="button"
              className="btn-ghost"
              style={{ fontWeight: 700 }}
              onClick={() => history.push(`/check-email?username=${encodeURIComponent(unverifiedUsername)}`)}
            >
              Resend the verification email
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

      <form onSubmit={submit} noValidate>
        <div className="field">
          <label className="field-label" htmlFor="username">Username</label>
          <input
            id="username"
            className="input"
            placeholder="Your username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <label className="field-label" htmlFor="password">Password</label>
            <button type="button" className="btn-ghost" style={{ fontSize: '0.82rem' }} onClick={() => history.push('/forgot-password')}>
              Forgot password?
            </button>
          </div>
          <div className="input-with-action">
            <input
              id="password"
              className="input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Your password"
              autoComplete="current-password"
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

        <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: 28 }} disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="auth-switch">
        New to Reader? <button type="button" className="btn-ghost" style={{ fontWeight: 700 }} onClick={() => history.push('/signup')}>Create an account</button>
      </p>
    </AuthLayout>
  );
};

export default Signin;
