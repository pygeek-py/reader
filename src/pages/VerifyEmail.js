import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import AuthLayout from '../components/AuthLayout';
import { verifyEmail } from '../api/auth';

const QUOTE = { quote: '“Reading is a discount ticket to everywhere.”', attribution: 'Mary Schmich' };

const VerifyEmail = ({ match }) => {
  const history = useHistory();
  const { uid, token } = match.params;

  const [state, setState] = useState('checking'); // checking | success | invalid
  const [message, setMessage] = useState('');

  useEffect(() => {
    let cancelled = false;
    verifyEmail({ uid, token })
      .then((data) => {
        if (cancelled) return;
        setState('success');
        setMessage(data.detail);
      })
      .catch((err) => {
        if (cancelled) return;
        setState('invalid');
        setMessage(err.message);
      });
    return () => { cancelled = true; };
  }, [uid, token]);

  if (state === 'checking') {
    return (
      <AuthLayout {...QUOTE}>
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <span className="spinner" style={{ margin: '0 auto 16px' }} />
          <p className="field-hint">Confirming your email…</p>
        </div>
      </AuthLayout>
    );
  }

  if (state === 'success') {
    return (
      <AuthLayout {...QUOTE}>
        <div className="auth-status-icon-wrap success"><CheckCircleIcon /></div>
        <div className="auth-form-header" style={{ textAlign: 'center' }}>
          <h1>Email confirmed</h1>
          <p>{message}</p>
        </div>
        <button className="btn btn-primary btn-block btn-lg" onClick={() => history.push('/signin?verified=1')}>
          Continue to sign in
        </button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout {...QUOTE}>
      <div className="auth-status-icon-wrap error"><XCircleIcon /></div>
      <div className="auth-form-header" style={{ textAlign: 'center' }}>
        <h1>Link not valid</h1>
        <p>{message}</p>
      </div>
      <button className="btn btn-primary btn-block" onClick={() => history.push('/check-email')}>
        Request a new link
      </button>
      <p className="auth-switch">
        <button type="button" className="btn-ghost" style={{ fontWeight: 700 }} onClick={() => history.push('/signin')}>Back to sign in</button>
      </p>
    </AuthLayout>
  );
};

export default VerifyEmail;
