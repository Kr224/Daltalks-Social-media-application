import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Avatar, Input, Flex, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Friend from './friends';
import axios from 'axios';
import Navigation from './navigation';


import '../css/post.css';

const Post = () => {
    const value = "vertical";
    const [post, setPosts] = useState(null);
    const [email, setEmails] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/getAllPost`);
                const fetchedPosts = response.data;
                setPosts(fetchedPosts);

                const emailPromises = fetchedPosts.map(async (post) => {
                    const userID = post.userID;
                    const emailResponse = await axios.get(`http://localhost:8080/api/getEmailByUserID/${userID}`);
                    return emailResponse.data;
                });

                const fetchedEmails = await Promise.all(emailPromises);
                setEmails(fetchedEmails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPost();
    }, []);

    return (
        <div class="main">
            <Row justify="center" align="top">
                <Col span={4}>
                    <div>
                        <Navigation />
                    </div>
                </Col>

                <Col span={16} className="navigation-col">
                    <div>
                        <div class='search'>
                            <div class="search-bar">
                                <Input placeholder="Search" />
                            </div>
                        </div>
                        
                        {post ? (
                            post.map((pos, index) => (
                            <div class='post'>
                                <Flex gap="middle" vertical>
                                    <Flex vertical={value === 'vertical'} class = "post-header">
                                        <Card style={{ width: 500 }} >
                                            <div className="space-align-block" class="profile">
                                                <Space align="start">
                                                    <div class="profile-picture">
                                                        <Avatar size={48} icon={<UserOutlined />} />
                                                    </div>
                                                    <div class="username">
                                                        <a href="#">{email[index]}</a>
                                                    </div>
                                                </Space>  
                                                <div class="timestamp">
                                                    <span >2 hours ago</span>
                                                </div>  
                                            </div>
                                            <div >
                                                <h4>Post Title: {pos.postTitle}</h4>
                                                <p>Post content: {pos.postBodyContent}</p>
                                            </div>
                                            <div class="post-actions">
                                                <button class="like-button">Like</button>
                                                <button class="comment-button">Comment</button>
                                                <button class="share-button">Share</button>
                                            </div>
                                        </Card>
                                    </Flex>
                                </Flex>
                            </div>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}

                    </div>
                </Col>

                <Col span={4} className="friends-col">
                    <div>
                        <Friend />
                    </div> 
                </Col>  
            </Row>
        </div>
    );
};

export default Post;