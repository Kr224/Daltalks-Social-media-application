import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/signUp';
<<<<<<< HEAD
import ForgotPassword from './components/forgotPassword';
=======
import FriendRequests from './components/FriendRequests';
>>>>>>> main

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
<<<<<<< HEAD
                <Route path="/forgotPassword" element={<ForgotPassword />} />
=======
                <Route path="/friend-requests" element={<FriendRequests />} />
>>>>>>> main
            </Routes>
        </Router>
    );
};

export default App;