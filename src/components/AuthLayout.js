import React from 'react';
import { useHistory } from 'react-router-dom';

const AuthLayout = ({ quote, attribution, children }) => {
  const history = useHistory();

  return (
    <div className="auth-shell">
      <div className="auth-visual">
        <button type="button" className="auth-visual-brand" onClick={() => history.push('/')}>
          <span className="brand-mark">R</span> Reader
        </button>
        <div className="auth-visual-content">
          <p className="auth-visual-quote">{quote}</p>
          <p className="auth-visual-attribution">{attribution}</p>
        </div>
        <div />
      </div>
      <div className="auth-form-side">
        <div className="auth-form-wrap">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
