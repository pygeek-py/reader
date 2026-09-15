import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import AuthLayout from '../components/AuthLayout';
import { requestPasswordReset } from '../api/auth';

const ForgotPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await requestPasswordReset(email);
    } finally {
      setSent(true);
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <AuthLayout quote="“A book is a dream that you hold in your hand.”" attribution="Neil Gaiman">
        <div className="auth-status-icon-wrap pending"><CheckCircleIcon /></div>
        <div className="auth-form-header" style={{ textAlign: 'center' }}>
          <h1>Check your email</h1>
          <p>If an account matches <strong>{email}</strong>, we've sent a link to reset the password.</p>
        </div>
        <button className="btn btn-secondary btn-block" onClick={() => history.push('/signin')}>Back to sign in</button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout quote="“A book is a dream that you hold in your hand.”" attribution="Neil Gaiman">
      <div className="auth-form-header">
        <h1>Reset your password</h1>
        <p>Enter the email on your account and we'll send you a reset link.</p>
      </div>
      <form onSubmit={submit}>
        <div className="field">
          <label className="field-label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: 24 }} disabled={submitting}>
          {submitting ? 'Sending…' : 'Send reset link'}
        </button>
      </form>
      <p className="auth-switch">
        <button type="button" className="btn-ghost" style={{ fontWeight: 700 }} onClick={() => history.push('/signin')}>Back to sign in</button>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;
