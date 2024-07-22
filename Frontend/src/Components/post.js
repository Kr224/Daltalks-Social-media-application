import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Avatar, Input, Space, Spin, Button, AutoComplete } from 'antd';
import { UserOutlined, LikeOutlined, CommentOutlined, SendOutlined } from '@ant-design/icons';
import Friend from './friends';
import axios from 'axios';
import Navigation from './navigation';
import '../css/post.css';
import { useNavigate } from 'react-router-dom';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const currentID = localStorage.getItem('userId');

    // Fetch posts and friends
    useEffect(() => {
        const fetchPostsAndFriends = async () => {
            try {
                const postResponse = await axios.get('http://localhost:8080/api/getAllPost');
                setPosts(postResponse.data);

                const friendResponse = await axios.get(`http://localhost:8080/api/user/getAllUser`);
                setFriends(friendResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchPostsAndFriends();
    }, [currentID]);

    // Update search results based on search query
    useEffect(() => {
        if (searchQuery) {
            const results = friends.filter(({ email }) =>
                email && email.split('@')[0].toLowerCase().includes(searchQuery.toLowerCase()) // Check if email exists
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, friends]);

    // Handle selection of a search result
    const handleSelect = (value, option) => {
        navigate(`/profile/${option.userID}`);
    };

    return (
        <div className="main">
            <Row justify="center" align="top">
                <Col span={4}>
                    <Navigation />
                </Col>
                <Col span={16} className="navigation-col">
                    <div className="search">
                        <AutoComplete
                            options={searchResults.map(({ email, id }) => ({
                                value: email.split('@')[0] || '',
                                label: email.split('@')[0] || '',
                                userID: id,
                            }))}
                            onSelect={handleSelect}
                            onSearch={(value) => setSearchQuery(value)}
                            style={{ width: '100%' }}
                        >
                            <Input.Search
                                placeholder="Search friends"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ marginBottom: 20 }}
                            />
                        </AutoComplete>
                    </div>
                    {loading ? (
                        <div className="loading-container">
                            <Spin size="large" />
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div className="post" key={post.id}>
                                <div className="post-header">
                                    <Card style={{ width: 500 }}>
                                        <div className="profile">
                                            <Space align="start">
                                                <div className="profile-picture">
                                                    <Avatar size={48} icon={<UserOutlined />} />
                                                </div>
                                                <div className="username" onClick={() => navigate(`/profile/${post.userID}`)}>
                                                    <div>
                                                        {friends.find((friend) => friend.id === post.userID)?.email.split('@')[0] 
                                                            ? <a>{friends.find((friend) => friend.id === post.userID)?.email.split('@')[0]}</a> 
                                                            : <a onClick={() => navigate(`/profile/${post.userID}`)}>User not found with id: {post.userID}</a>}
                                                    </div>
                                                </div>
                                            </Space>
                                        </div>
                                        <div>
                                            <h4>Post Title: {post.postTitle}</h4>
                                            <p>Post content: {post.postBodyContent}</p>
                                        </div>
                                        <div className="post-actions">
                                            <Button type="text" className="like-button"><LikeOutlined /></Button>
                                            <Button type="text" className="comment-button"><CommentOutlined /></Button>
                                            <Button type="text" className="share-button"><SendOutlined /></Button>
                                        </div>
                                    </Card>
                                </div>
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
