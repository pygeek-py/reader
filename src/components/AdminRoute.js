import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Like ProtectedRoute, but also requires admin (staff) status. A signed-out
 * visitor is sent to sign in; a signed-in non-admin is sent back into the
 * library rather than shown a page they were never meant to reach.
 * The backend independently enforces this on the write endpoint either way.
 */
const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) return <Redirect to="/signin" />;
        if (!isAdmin) return <Redirect to="/library" />;
        return <Component {...props} />;
      }}
    />
  );
};

export default AdminRoute;
