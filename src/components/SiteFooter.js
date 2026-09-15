import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SiteFooter = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const history = useHistory();
  const year = new Date().getFullYear();

  const handleLogout = async () => {
    await logout();
    history.push('/signin');
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-text">Reader</div>
            <p className="footer-tagline">
              A calm, well-organized home for your reading life: discover books, follow authors,
              and keep track of what you borrow.
            </p>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Product</div>
            <button onClick={() => history.push('/')}>Overview</button>
            <button onClick={() => history.push('/library')}>Library</button>
            <button onClick={() => history.push('/library/authors')}>Authors</button>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Account</div>
            {isAuthenticated ? (
              <>
                <button onClick={() => history.push('/library/mine')}>My Books</button>
                {isAdmin && <button onClick={() => history.push('/library/add-book')}>Add a Book</button>}
                <button onClick={handleLogout}>Sign out</button>
              </>
            ) : (
              <>
                <button onClick={() => history.push('/signup')}>Create an account</button>
                <button onClick={() => history.push('/signin')}>Sign in</button>
                <button onClick={() => history.push('/forgot-password')}>Reset password</button>
              </>
            )}
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Company</div>
            <button onClick={() => history.push('/about')}>About</button>
            <button onClick={() => history.push('/help')}>Help Center</button>
            <button onClick={() => history.push('/privacy')}>Privacy</button>
            <button onClick={() => history.push('/terms')}>Terms</button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {year} Reader. Built as a demonstration project.</span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
