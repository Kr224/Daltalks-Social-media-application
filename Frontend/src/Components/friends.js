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
  const loggedInUserEmail = localStorage.getItem('loggedInUserEmail'); //added new


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

  const handleRemoveFriend = async (friendEmail) => { //functionality for removing friend
      try {
          const response = await axios.post(`http://localhost:8080/api/user/removeFriend?userID1=${friendEmail}&userID2=${currentID}`);
          setMessage(response.data);
      } catch (error) {
          setMessage(error.response.data.message);
      }

      try {
        const response = await axios.post(`http://localhost:8080/api/user/removeFriend?userID1=${currentID}&userID2=${friendEmail}`);
        setMessage(response.data);
      } catch (error) {
        setMessage(error.response.data.message);
      }
  };


    const handleAddFriend = async (friendEmail) => {
      try {
          const response = await axios.post(`http://localhost:8080/api/user/sendFriendRequest?senderId=${currentID}&receiverId=${friendEmail}`);
          setMessage(response.data);
          if (response.status === 200) {
             navigate('/friend-requests');
          }
      } catch (error) {
          setMessage(error.response?.data?.message || 'Error sending friend request');
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
                    <a>{user.email.split('@')[0]}</a>
                  </p>
                  <Button type="primary" className="follow" onClick={() => handleAddFriend(user.id)}>Follow</Button>
                  <Button type="primary" danger onClick={() => handleRemoveFriend(user.id)}>Remove</Button>
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
