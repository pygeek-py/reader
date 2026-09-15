import React from 'react';
import { useHistory } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

const NotFound = () => {
  const history = useHistory();
  return (
    <div className="page">
      <SiteNav />
      <div className="status-page">
        <div>
          <div className="status-page-code">404</div>
          <h1>Page not found</h1>
          <p>The page you're looking for doesn't exist, or may have moved.</p>
          <button className="btn btn-primary" onClick={() => history.push('/')}>Back to home</button>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default NotFound;
