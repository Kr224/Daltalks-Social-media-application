import React, { useEffect, useState } from 'react';
import { Avatar, Space, Card, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


import '../css/friends.css'

const Friend = () => {
  const [User, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const currentID = localStorage.getItem('userId');


  useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/user/getAllUser/${currentID}`);
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
                  <p class="account-name" onClick={() => navigate(`/profile/${user.id}`)}>
                    <a>{user.email}</a>
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