import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const GuardedRoute = ({ authenticated, ...props }) => {
  if (authenticated) {
    return <Route {...props} />;
  } else {
    return <Navigate to="/" />;
  }
};

export default GuardedRoute;