import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import AuthLayout from '../components/AuthLayout';
import { confirmPasswordReset } from '../api/auth';

const ResetPassword = ({ match }) => {
  const history = useHistory();
  const { uid, token } = match.params;

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [invalidLink, setInvalidLink] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setSubmitting(true);
    try {
      await confirmPasswordReset({ uid, token, password });
      history.push('/signin?reset=1');
    } catch (err) {
      if (err.data?.code === 'invalid') {
        setInvalidLink(true);
      } else {
        setError(err.message || 'Something went wrong. Please try again.');
      }
      setSubmitting(false);
    }
  };

  if (invalidLink) {
    return (
      <AuthLayout quote="“Books are a uniquely portable magic.”" attribution="Stephen King">
        <div className="auth-status-icon-wrap error"><XCircleIcon /></div>
        <div className="auth-form-header" style={{ textAlign: 'center' }}>
          <h1>Link invalid or expired</h1>
          <p>Password reset links expire after an hour. Request a new one to continue.</p>
        </div>
        <button className="btn btn-primary btn-block" onClick={() => history.push('/forgot-password')}>
          Request a new link
        </button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout quote="“Books are a uniquely portable magic.”" attribution="Stephen King">
      <div className="auth-form-header">
        <h1>Choose a new password</h1>
        <p>Make it something you haven't used here before.</p>
      </div>

      {error && (
        <div className="form-error-banner" style={{ marginBottom: 20 }}>
          <ExclamationTriangleIcon />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={submit} noValidate>
        <div className="field">
          <label className="field-label" htmlFor="password">New password</label>
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
          <label className="field-label" htmlFor="confirm">Confirm new password</label>
          <input
            id="confirm"
            className="input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Re-enter your new password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: 28 }} disabled={submitting}>
          {submitting ? 'Saving…' : 'Save new password'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
