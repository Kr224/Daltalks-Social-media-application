import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Avatar, Input, Space, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Friend from './friends';
import axios from 'axios';
import Navigation from './navigation';
import '../css/post.css';

const { Search } = Input;

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);

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
                        <Search placeholder="Search" style={{ marginBottom: '20px' }} />
                    </div>
                    {loading ? (
                        <div className="loading-container">
                            <Spin size="large" />
                        </div>
                    ) : (
                        posts.map((post, index) => (
                            <Card key={post.id} className="post-card" style={{ marginBottom: '20px' }}>
                                <Space direction="vertical" size="large">
                                    <Space className="post-header">
                                        <Avatar size={48} icon={<UserOutlined />} />
                                        <span className="username">{emails[index]}</span>
                                    </Space>
                                    <div>
                                        <h4>Post Title: {post.postTitle}</h4>
                                        <p>Post content: {post.postBodyContent}</p>
                                    </div>
                                    <div className="post-actions">
                                        <button className="like-button">Like</button>
                                        <button className="comment-button">Comment</button>
                                        <button className="share-button">Share</button>
                                    </div>
                                </Space>
                            </Card>
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
