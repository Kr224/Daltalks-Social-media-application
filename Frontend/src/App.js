import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/signUp';
<<<<<<< HEAD
import FriendRequests from './components/FriendRequests';
=======
import ErrorPage from './components/ErrorPage';
import PrivateRoute from './components/PrivateRoute';
>>>>>>> parent of 2ba4b85 (fix: fixed all merge conflicts)

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
<<<<<<< HEAD
                <Route path="/friend-requests" element={<FriendRequests />} />
=======
                <Route path="/error" element={<ErrorPage />} />
                <Route
                    path="/"
                    element={<Navigate to="/login" />}
                />
>>>>>>> parent of 2ba4b85 (fix: fixed all merge conflicts)
            </Routes>
        </Router>
    );
};

export default App;
