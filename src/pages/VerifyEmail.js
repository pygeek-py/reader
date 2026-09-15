import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import AuthLayout from '../components/AuthLayout';
import { verifyEmail, resendVerification } from '../api/auth';

const VerifyEmail = ({ match }) => {
  const history = useHistory();
  const token = match.params.token;

  const [state, setState] = useState('checking'); // checking | success | expired | invalid
  const [message, setMessage] = useState('');
  const [expiredUsername, setExpiredUsername] = useState('');
  const [resendState, setResendState] = useState('idle');

  useEffect(() => {
    let cancelled = false;
    verifyEmail(token)
      .then((data) => {
        if (cancelled) return;
        setState('success');
        setMessage(data.detail);
      })
      .catch((err) => {
        if (cancelled) return;
        const isExpired = err.data?.code === 'expired';
        setState(isExpired ? 'expired' : 'invalid');
        setMessage(err.message);
        if (isExpired) setExpiredUsername(err.data.username || '');
      });
    return () => { cancelled = true; };
  }, [token]);

  const resend = async () => {
    setResendState('sending');
    try {
      await resendVerification({ username: expiredUsername });
      setResendState('sent');
    } catch {
      setResendState('idle');
    }
  };

  if (state === 'checking') {
    return (
      <AuthLayout quote="“Reading is a discount ticket to everywhere.”" attribution="Mary Schmich">
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <span className="spinner" style={{ margin: '0 auto 16px' }} />
          <p className="field-hint">Verifying your email…</p>
        </div>
      </AuthLayout>
    );
  }

  if (state === 'success') {
    return (
      <AuthLayout quote="“Reading is a discount ticket to everywhere.”" attribution="Mary Schmich">
        <div className="auth-status-icon-wrap success"><CheckCircleIcon /></div>
        <div className="auth-form-header" style={{ textAlign: 'center' }}>
          <h1>Email verified</h1>
          <p>{message}</p>
        </div>
        <button className="btn btn-primary btn-block btn-lg" onClick={() => history.push('/signin?verified=1')}>
          Continue to sign in
        </button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout quote="“Reading is a discount ticket to everywhere.”" attribution="Mary Schmich">
      <div className={`auth-status-icon-wrap ${state === 'expired' ? 'pending' : 'error'}`}>
        {state === 'expired' ? <ClockIcon /> : <XCircleIcon />}
      </div>
      <div className="auth-form-header" style={{ textAlign: 'center' }}>
        <h1>{state === 'expired' ? 'Link expired' : 'Link invalid'}</h1>
        <p>{message}</p>
      </div>

      {resendState === 'sent' ? (
        <div className="form-notice-banner">A fresh verification email is on its way. Check your inbox.</div>
      ) : state === 'expired' && expiredUsername ? (
        <button className="btn btn-primary btn-block" onClick={resend} disabled={resendState === 'sending'}>
          {resendState === 'sending' ? 'Sending…' : 'Request a new link'}
        </button>
      ) : (
        <button className="btn btn-secondary btn-block" onClick={() => history.push('/signup')}>
          Back to sign up
        </button>
      )}
      <p className="auth-switch">
        <button type="button" className="btn-ghost" style={{ fontWeight: 700 }} onClick={() => history.push('/signin')}>Back to sign in</button>
      </p>
    </AuthLayout>
  );
};

export default VerifyEmail;
