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
                </Routes>
            </Router>
          </div>
        </Col>  
      </Row>
    </div>
  );
};


export default App;
