import React from 'react';
import { Avatar, Space, Card, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../css/friends.css'

const Friend = () => {
    return (
      <div class="user-profile">
        <Card style={{ width: 300 }}>
          <Avatar size={48} icon={<UserOutlined />} />
          <div class="user-info">
            <p class="account-name">John Doe</p>
            <p class="user-name">@johndoe</p>
            <Button type="primary">Follow</Button>
          </div>
        </Card>
      </div>
    );
};

export default Friend;