import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { EnvelopeOpenIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import AuthLayout from '../components/AuthLayout';
import { resendVerification } from '../api/auth';

const CheckEmail = () => {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get('email') || '';
  const username = params.get('username') || '';

  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [error, setError] = useState('');

  const resend = async () => {
    setStatus('sending');
    setError('');
    try {
      await resendVerification({ email, username });
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
          {email
            ? <>We sent a verification link to <strong>{email}</strong>.</>
            : 'We sent a verification link to the email on this account.'}
          {' '}Click it to activate your account, then sign in.
        </p>
      </div>

      {status === 'sent' && (
        <div className="form-notice-banner" style={{ marginBottom: 16 }}>
          <CheckCircleIcon />
          <span>A new verification email is on its way.</span>
        </div>
      )}
      {error && <div className="form-error-banner" style={{ marginBottom: 16 }}>{error}</div>}

      <button className="btn btn-secondary btn-block" onClick={resend} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : "Didn't get it? Resend the email"}
      </button>

      <p className="auth-switch">
        Already verified? <button type="button" className="btn-ghost" style={{ fontWeight: 700 }} onClick={() => history.push('/signin')}>Sign in</button>
      </p>
    </AuthLayout>
  );
};

export default CheckEmail;
