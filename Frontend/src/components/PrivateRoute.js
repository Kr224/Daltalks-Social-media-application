import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
    const isAuthenticated = localStorage.getItem('loggedIn') === 'true';

    return isAuthenticated ? <Component /> : <Navigate to="/error" />;
};

export default PrivateRoute;
