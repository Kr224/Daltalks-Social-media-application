import React, { useEffect, useState } from 'react';
import { Avatar, Space, Card, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';

import '../css/friends.css'

const Friend = () => {
  const [User, setUser] = useState(null);


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
    return (
      <div>
        {User ? (
          User.map((user, index) => (
            <div class="user-profile">
              <Card style={{ width: 300 }}>
              <Avatar size={48} icon={<UserOutlined />} />
                <div class="user-info">
                  <p class="account-name">{user.email}</p>
                  <Button type="primary">Follow</Button>
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