import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/signUp';
<<<<<<< HEAD
<<<<<<< HEAD
import ForgotPassword from './components/forgotPassword';
=======
import FriendRequests from './components/FriendRequests';
>>>>>>> main
=======
import ErrorPage from './components/ErrorPage';
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from './components/ProfilePage';
import FriendRequestComponent from './components/FriendRequestComponent';
import './App.css';
>>>>>>> main

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
<<<<<<< HEAD
<<<<<<< HEAD
                <Route path="/forgotPassword" element={<ForgotPassword />} />
=======
                <Route path="/friend-requests" element={<FriendRequests />} />
>>>>>>> main
=======
                <Route path="/error" element={<ErrorPage />} />
                <Route path="/friend-requests" element={<FriendRequestComponent />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/profile" element={<PrivateRoute component={ProfilePage} />} />
>>>>>>> main
            </Routes>
        </Router>
    );
};

export default App;