import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Card, Avatar, Input, Space, Spin, Button, AutoComplete } from 'antd';
import { UserOutlined, LikeOutlined, CommentOutlined, SendOutlined } from '@ant-design/icons';
import Friend from './friends';
import Navigation from './navigation';
import '../css/post.css';
import { useNavigate } from 'react-router-dom';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const currentID = localStorage.getItem('userId');

    // Fetch posts, friends, and groups
    useEffect(() => {
        const fetchPostsFriendsAndGroups = async () => {
            try {
                const postResponse = await axios.get('http://localhost:8080/api/getAllPost');
                setPosts(postResponse.data);

                const friendResponse = await axios.get('http://localhost:8080/api/user/getAllUser');
                setFriends(friendResponse.data);

                const groupResponse = await axios.get('http://localhost:8080/groups/get-all-groups');
                setGroups(groupResponse.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchPostsFriendsAndGroups();
    }, [currentID]);

    // Update search results based on search query
    useEffect(() => {
        if (searchQuery) {
            const friendResults = friends.filter(({ email }) =>
                email && email.split('@')[0].toLowerCase().includes(searchQuery.toLowerCase())
            ).map(({ email, id }) => ({
                type: 'friend',
                value: email.split('@')[0],
                label: email.split('@')[0],
                id: id,
            }));

            const groupResults = groups.filter(({ groupName }) =>
                groupName && groupName.toLowerCase().includes(searchQuery.toLowerCase())
            ).map(({ groupName, id }) => ({
                type: 'group',
                value: groupName,
                label: groupName,
                id: id,
            }));

            setSearchResults([...friendResults, ...groupResults]);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, friends, groups]);

    // Handle selection of a search result
    const handleSelect = (value, option) => {
        if (option.type === 'friend') {
            navigate(`/profile/${option.id}`);
        } else if (option.type === 'group') {
            navigate(`/groups/${option.id}`);
        }
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
                            options={searchResults}
                            onSelect={handleSelect}
                            onSearch={(value) => setSearchQuery(value)}
                            style={{ width: '100%' }}
                        >
                            <Input.Search
                                placeholder="Search friends or groups"
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
