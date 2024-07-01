import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Avatar, Input, Space, Spin, Flex, Button } from 'antd';
import { UserOutlined, LikeOutlined, CommentOutlined, SendOutlined } from '@ant-design/icons';
import Friend from './friends';
import axios from 'axios';
import Navigation from './navigation';
import '../css/post.css';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/getAllPost');
                const fetchedPosts = response.data;
                setPosts(fetchedPosts);

                const emailPromises = fetchedPosts.map(async (post) => {
                    const userID = post.userID;
                    const emailResponse = await axios.get(`http://localhost:8080/api/getEmailByUserID/${userID}`);
                    return emailResponse.data;
                });

                const fetchedEmails = await Promise.all(emailPromises);
                setEmails(fetchedEmails);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="main">
            <Row justify="center" align="top">
                <Col span={4}>
                    <Navigation />
                </Col>
                <Col span={16} className="navigation-col">
                    <div className="search">
                        <Search className="search-bar"  placeholder="search" />
                    </div>
                    {loading ? (
                        <div className="loading-container">
                            <Spin size="large" />
                        </div>
                    ) : (
                        posts.map((post, index) => (
                                <div class='post'>
                                    <Flex gap="middle" vertical>
                                        <Flex vertical className = "post-header">
                                            <Card style={{ width: 500 }} >
                                                <div className="space-align-block" class="profile">
                                                    <Space align="start">
                                                        <div class="profile-picture">
                                                            <Avatar size={48} icon={<UserOutlined />} />
                                                        </div>
                                                        <div class="username" onClick={() => navigate(`/profile/${post.userID}`)}>
                                                            <div><a>{emails[index]}</a></div>
                                                        </div>
                                                    </Space>  
                                                </div>
                                                <div >
                                                    <h4 >Post Title: {post.postTitle}</h4>
                                                    <p >Post content: {post.postBodyContent}</p>
                                                </div>
                                                <div class="post-actions">
                                                    <Button type="text" class="like-button"><LikeOutlined /></Button>
                                                    <Button type="text" class="comment-button"><CommentOutlined /></Button>
                                                    <Button type="text" class="share-button"><SendOutlined /></Button>
                                                </div>
                                            </Card>
                                        </Flex>
                                    </Flex>
                                </div>
                        ))
                    )}
                </Col>
                <Col span={4} className="friends-col">
                    <Friend />
                </Col>
            </Row>
        </div>
    );
};

export default Post;
