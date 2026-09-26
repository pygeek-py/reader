import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { EnvelopeOpenIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import AuthLayout from '../components/AuthLayout';
import { resendVerification } from '../api/auth';

const CheckEmail = () => {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const knownEmail = params.get('email') || '';
  const knownUsername = params.get('username') || '';
  const knowsAccount = Boolean(knownEmail || knownUsername);

  // Arriving without an address (e.g. from an expired link) means we have to ask for it.
  const [typedEmail, setTypedEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [error, setError] = useState('');

  const resend = async (e) => {
    if (e) e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await resendVerification(knowsAccount
        ? { email: knownEmail, username: knownUsername }
        : { email: typedEmail.trim() });
      setStatus('sent');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <AuthLayout
      quote="“There is no friend as loyal as a book.”"
      attribution="Ernest Hemingway"
    >
      <div className="auth-status-icon-wrap pending">
        <EnvelopeOpenIcon />
      </div>
      <div className="auth-form-header" style={{ textAlign: 'center' }}>
        <h1>Check your email</h1>
        <p>
          {knownEmail
            ? <>We sent a confirmation link to <strong>{knownEmail}</strong>.</>
            : knownUsername
              ? 'We sent a confirmation link to the email on this account.'
              : 'Enter the email you signed up with and we will send you a new confirmation link.'}
          {knowsAccount && ' Follow it to activate your account, then sign in. It can take a minute to arrive, and it may land in spam.'}
        </p>
      </div>

      {status === 'sent' && (
        <div className="form-notice-banner" style={{ marginBottom: 16 }}>
          <CheckCircleIcon />
          <span>If that account is waiting on confirmation, a new email is on its way.</span>
        </div>
      )}
      {error && <div className="form-error-banner" style={{ marginBottom: 16 }}>{error}</div>}

      {knowsAccount ? (
        <button className="btn btn-secondary btn-block" onClick={resend} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : "Didn't get it? Resend the email"}
        </button>
      ) : (
        <form onSubmit={resend} noValidate>
          <div className="field">
            <label className="field-label" htmlFor="resend-email">Email</label>
            <input
              id="resend-email"
              className="input"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={typedEmail}
              onChange={(e) => setTypedEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={status === 'sending' || !typedEmail.trim()}>
            {status === 'sending' ? 'Sending…' : 'Send a new link'}
          </button>
        </form>
      )}

      <p className="auth-switch">
        Already confirmed? <button type="button" className="btn-ghost" style={{ fontWeight: 700 }} onClick={() => history.push('/signin')}>Sign in</button>
      </p>
    </AuthLayout>
  );
};

export default CheckEmail;
