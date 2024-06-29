import React, { useEffect, useState } from 'react';
import { Avatar, Space, Card, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';

import '../css/friends.css'

const Friend = () => {
  const [User, setUser] = useState(null);
  const [message, setMessage] = useState('');


  useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/user/getAllUser`);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching resume', error);
        }
      };
    
      fetchUser();
  }, []);

  const handleRemoveFriend = async (friendEmail) => {
      try {
          const response = await axios.post('/api/user/remove-friend', { userEmail: 'current_user_email', friendEmail });
          setMessage(response.data);
      } catch (error) {
          setMessage(error.response.data.message);
      }
  };

    const handleAddFriend = async (friendEmail) => {
      try {
          const response = await axios.post('/api/user/send-friend-request', { userEmail: 'current_user_email', friendEmail});
          setMessage(response.data);
      } catch (error) {
          setMessage(error.response.data.message);
      }
  };


    return (
      <div>
        {User ? (
          User.map((user, index) => (
            <div class="user-profile">
              <Card style={{ width: 300 }}>
              <Avatar size={48} icon={<UserOutlined />} />
                <div class="user-info">
                  <p class="account-name">
                    <a href={`/profile/${user.id}`}>{user.email}</a>
                  </p>
                  <Button type="primary" className="follow" onClick={() => handleAddFriend(user.email)}>Follow</Button>
                  <Button type="primary" danger onClick={() => handleRemoveFriend(user.email)}>Remove</Button>
                </div>
              </Card> 
            </div>             
          ))
          ) : (
          <p>Loading...</p>
        )}
      </div>
    );
};

export default Friend;