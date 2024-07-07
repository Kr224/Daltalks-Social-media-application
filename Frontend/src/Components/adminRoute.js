import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ element: Component }) => {
  const isAuthenticated = localStorage.getItem('admin') === 'true';

  return isAuthenticated ? <Component /> : <Navigate to="/error" />;
};

export default AdminRoute;
