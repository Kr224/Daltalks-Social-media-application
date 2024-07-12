import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../css/friends.css';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/friends/${userId}`);
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends', error);
      }
    };

    fetchFriends();
  }, [userId]);


  return (
    <div>
      <h2>Friends List</h2>
      <List
        itemLayout="horizontal"
        dataSource={friends}
        renderItem={friend => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={friend.name}
              description={friend.email}
            />
            <Button danger>Remove</Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default FriendsList;
