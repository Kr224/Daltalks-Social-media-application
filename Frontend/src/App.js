import './App.css';
import Friend from './Components/friends';
import Navigation from './Components/navigation';
import Post from './Components/post';
import User from './Components/user';
import { Col, Divider, Row } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Row justify="center" align="top">
        <Col span={6}>
          <div class="navigation-col">
            <Navigation />
          </div>
        </Col>
        <Col span={18} className="content-col">
          <div>
            <Router>
                <Routes>
                  <Route index element={<Post />} />
                  <Route path="/user" element={<User/>} />
                </Routes>
            </Router>
          </div>
        </Col>  
      </Row>
    </div>
  );
};


export default App;
