import React, { useState } from 'react';
import { Button } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const Navigation = () => {
    return (
      <div>
        <h1>Dal Talk</h1>
        <Button type="text">
          <HomeOutlined />Home
        </Button>
        <Button type="text">
          <UserOutlined />User
        </Button>
      </div>
    );
  };

export default Navigation;