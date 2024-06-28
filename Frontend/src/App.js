import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/signUp';
import ForgotPassword from './components/forgotPassword';
import FriendRequests from './components/FriendRequests';
import ErrorPage from './components/ErrorPage';
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from './components/ProfilePage';
import FriendRequestComponent from './components/FriendRequestComponent';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/friend-requests" element={<FriendRequests />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="/friend-requests" element={<FriendRequestComponent />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/profile" element={<PrivateRoute component={ProfilePage} />} />
            </Routes>
        </Router>
    );
};

export default App;