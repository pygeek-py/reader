import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * The inverse of ProtectedRoute: for pages meant only for signed-out visitors
 * (the landing page, sign in, sign up). A signed-in user hitting one of these
 * is sent straight into the app instead of being shown an entry page for an
 * account they're already in.
 */
const PublicOnlyRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Redirect to="/library" /> : <Component {...props} />
      }
    />
  );
};

export default PublicOnlyRoute;
