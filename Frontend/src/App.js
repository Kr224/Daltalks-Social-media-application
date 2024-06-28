import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/signUp';
import ProfilePage from './components/ProfilePage';
import ErrorPage from './components/ErrorPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route
                    path="/profile"
                    element={<PrivateRoute element={ProfilePage} />}
                />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
