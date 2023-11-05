import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuth }) => {
  const token = localStorage.getItem('token');

  if (!isAuth || !token) {

    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
