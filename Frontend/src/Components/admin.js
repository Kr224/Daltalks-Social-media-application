import React, { useEffect, useState } from 'react';
import { Col, Flex, Row } from 'antd';
import { Avatar, Space, Card, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from './navigation';

const Admin = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState('vertical');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/user/getAllPendingUser');
                const fetchedPendingUser = response.data;
                setPendingUsers(fetchedPendingUser);

                const response1 = await axios.get('http://localhost:8080/api/user/getAllUser');
                const fetchedUser = response1.data;
                setUsers(fetchedUser);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const removeUser = async (userID) => {
        try {
            console.log("HELLO");
            await axios.delete(`http://localhost:8080/api/user/deleteUser/${userID}`);
        } catch (error) {
            alert(error);
        }
    };
  
      const acceptUser = async (userID) => {
        try {
            console.log("HELLO1");
            await axios.put(`http://localhost:8080/api/user/acceptUser/${userID}`);
            console.log("HELLO2");
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div>
            <Navigation />
            <div>
                <Row justify="center" align="top">
                    <Col span={12}>
                        <Flex vertical={value === 'vertical'} align='center'>
                            <div>
                                <h1>Pending</h1>

                            </div>
                            <div>
                                {pendingUsers ? (
                                    pendingUsers.map((user, index) => (
                                            <div class="user-profile">
                                            <Card style={{ width: 300 }}>
                                            <Avatar size={48} icon={<UserOutlined />} />
                                                <div class="user-info">
                                                <p class="account-name" onClick={() => navigate(`/profile/${user.id}`)}>
                                                    <a>{user.email.split('@')[0]}</a>
                                                </p>
                                                <Button type="primary" className="follow" onClick={() => acceptUser(user.id)}>Accept</Button>
                                                <Button type="primary" danger onClick={() => removeUser(user.id)}>Reject</Button>
                                                </div>
                                            </Card> 
                                            </div>
                                    ))
                                    ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <div>
                            <Flex vertical={value === 'vertical'} align='center'>
                                <div>
                                    <h1>Current</h1>
                                    
                                </div>
                                {users ? (
                                    users.map((user, index) => (
                                        <div class="user-profile">
                                            <Card style={{ width: 300 }}>
                                            <Avatar size={48} icon={<UserOutlined />} />
                                                <div class="user-info">
                                                <p class="account-name" onClick={() => navigate(`/profile/${user.id}`)}>
                                                    <a>{user.email.split('@')[0]}</a>
                                                </p>
                                                    <Button type="primary" danger onClick={() => removeUser(user.id)}>Remove</Button>
                                                </div>
                                            </Card> 
                                        </div>             
                                    ))
                                    ) : (
                                    <p>Loading...</p>
                                )}
                            </Flex>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Admin;