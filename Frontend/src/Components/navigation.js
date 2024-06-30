import React from 'react';
import { Button } from 'antd';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const id = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div>
      <h1>DalTalks</h1>
      <Button type="text">
        <a href="/main">
          <HomeOutlined /> Home
        </a>
      </Button>
      <Button type="text" onClick={() => navigate(`/profile`)}>
        <UserOutlined /> User
      </Button>
      <Button type="text" onClick={handleLogout}>
        <LogoutOutlined /> Log out
      </Button>
    </div>
  );
};

export default Navigation;
