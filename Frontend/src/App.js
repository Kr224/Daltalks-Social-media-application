import './App.css';
import Post from './Components/post';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/signUp';
import ForgotPassword from './Components/forgotPassword';
import ProfilePage from './Components/ProfilePage';
import ProfilePageForm from './Components/ProfilePageForm';
import ErrorPage from './Components/ErrorPage';
import PrivateRoute from './Components/PrivateRoute';
import UserProfilePage from './Components/UserProfilePage';
// import Navigation from './Components/navigation'; // Assuming you have a Navigation component
import FriendRequests from './Components/FriendRequests';
import Friend from './Components/friends';
import FriendsList from './Components/FriendsList';  // Import the FriendsList component

const App = () => {
  return (
    <div className="App">
      <Router>
        {/* Routing list */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/profile" element={<PrivateRoute element={UserProfilePage} />} />
          <Route path="/profile/:id" element={<PrivateRoute element={ProfilePage} />} />
          <Route path="/editprofile" element={<PrivateRoute element={ProfilePageForm} />} />
          <Route path="/main" element={<PrivateRoute element={Post} />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/friend" element={<Friend />} />
          <Route path="/friend-requests" element={<FriendRequests />} />
          <Route path="/My-friends" element={<FriendsList />} />  {/* The route for FriendsList */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
