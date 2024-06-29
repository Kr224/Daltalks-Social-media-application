import './App.css';
import Post from './Components/post';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/signUp';
import ForgotPassword from './Components/forgotPassword';
import ProfilePage from './Components/ProfilePage';
import ProfilePageForm  from './ProfilePageForm';
import ErrorPage from './Components/ErrorPage';
import PrivateRoute from './Components/PrivateRoute';


const App = () => {
  return (
    <div className="App">
          <div>
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
                  <Route path="/main" element={<Post />} />

                </Routes>
            </Router>
          </div>
    </div>
  );
};

export default App;
