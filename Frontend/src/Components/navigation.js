import React from 'react';
import { Button } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const Navigation = () => {
  const id = localStorage.getItem('userID');
    return (
      <div>
        <h1>Dal Talk</h1>
        <Button type="text">
          <a href="/">
            <HomeOutlined />Home
          </a>
        </Button>
        <Button type="text">
          <a href={`/profile/${id}`}>
            <UserOutlined />User
          </a>
        </Button>
      </div>
    );
  };

export default Navigation;