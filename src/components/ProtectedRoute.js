import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Frontend-only gate for UX (immediate redirect instead of a broken page).
 * The backend independently enforces authentication on every write endpoint,
 * so this is not the real security boundary.
 */
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default ProtectedRoute;
