import './App.css';
import Navigation from './Components/navigation';
import Post from './Components/post';
import User from './Components/user';
import { Col, Row } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from '../src/ProfilePage'

const App = () => {
  return (
    <div className="App">
      <Row justify="center" align="top">
        <Col span={6}>
          <div>
            <Navigation />
          </div>
        </Col>
        <Col span={18} className="content-col">
          <div>
            <Router>
                <Routes>
                  <Route index element={<Post />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/create" />
                  <Route path="/reset" />
                  <Route path="/signin" />
                  <Route path="/authorize" />
                </Routes>
            </Router>
          </div>
        </Col>  
      </Row>
    </div>
  );
};

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/signUp';
import ForgotPassword from './components/forgotPassword';
import ProfilePage from './components/ProfilePage';
import ProfilePageForm  from './ProfilePageForm';
import ErrorPage from './components/ErrorPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route
                    path="/profile/:id"
                    element={<PrivateRoute element={ProfilePage} />}
                />
                <Route
                    path="/editprofile"
                    element={<PrivateRoute element={ProfilePageForm} />}
                />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
