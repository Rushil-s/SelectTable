import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AuthRoute = ({ loggedIn, path, component: Component }) => {
  return (
    <Route
      path={path}
      render={(props) =>
        loggedIn ? <Redirect to="/dashboard" /> : <Component {...props} />
      }
    />
  );
};

export const ProtectedRoute = ({ loggedIn, path, component: Component }) => {
  return (
    <Route
      path={path}
      render={(props) =>
        loggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
