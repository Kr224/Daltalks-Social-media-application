import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Avatar, Input, Space, Spin, Button, Modal } from 'antd';
import { UserOutlined, LikeOutlined, CommentOutlined, SendOutlined, FilterOutlined } from '@ant-design/icons';
import Friend from './friends';
import axios from 'axios';
import Navigation from './navigation';
import '../css/post.css';
import { useNavigate } from 'react-router-dom';

const FilterModal = ({ filteredResults, handleResultClick }) => {
    return (
        <div className="filter-modal">
            <h2>Filtered Results</h2>
            <div>
                <h3>People</h3>
                {filteredResults
                    .filter(result => result.type === 'person')
                    .map(result => (
                        <div key={result.id} onClick={() => handleResultClick(result.id, result.type)}>
                            {result.name}
                        </div>
                    ))
                }
            </div>
            <div>
                <h3>Groups</h3>
                {filteredResults
                    .filter(result => result.type === 'group')
                    .map(result => (
                        <div key={result.id} onClick={() => handleResultClick(result.id, result.type)}>
                            {result.name}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const navigate = useNavigate();

    const currentID = localStorage.getItem('userId');

    // Fetch posts, friends, and groups
    useEffect(() => {
        const fetchData = async () => {
            try {
                const postResponse = await axios.get('http://localhost:8080/api/getAllPost');
                setPosts(postResponse.data);

                const friendResponse = await axios.get(`http://localhost:8080/api/user/getAllUser/${currentID}`);
                setFriends(friendResponse.data);

                const groupResponse = await axios.get('http://localhost:8080/api/groups'); // Assuming you have an endpoint for groups
                setGroups(groupResponse.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [currentID]);

    // Handle filter button click
    const handleFilterClick = () => {
        fetchFilteredResults(searchQuery);
        setShowFilterModal(true);
    };

    // Fetch filtered results based on search query
    const fetchFilteredResults = (query) => {
        const allResults = [
            ...friends.map(friend => ({ id: friend.id, name: friend.email.split('@')[0], type: 'person' })),
            ...groups.map(group => ({ id: group.id, name: group.name, type: 'group' }))
        ];
        const results = allResults.filter(result =>
            result.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredResults(results);
    };

    // Handle selection of a filtered result
    const handleResultClick = (id, type) => {
        const route = type === 'person' ? `/profile/${id}` : `/group/${id}`;
        navigate(route);
        setShowFilterModal(false);
    };

    // Handle modal close
    const handleClose = () => {
        setShowFilterModal(false);
    };

    return (
        <div className="main">
            <Row justify="center" align="top">
                <Col span={4}>
                    <Navigation />
                </Col>
                <Col span={16} className="navigation-col">
                    <div className="search">
                        <Input.Search
                            placeholder="Search for people or groups"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onSearch={handleFilterClick}
                            style={{ marginBottom: 20 }}
                        />
                        <Button icon={<FilterOutlined />} onClick={handleFilterClick}>Filter</Button>
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
            <Modal
                visible={showFilterModal}
                onCancel={handleClose}
                footer={null}
                title="Filtered Results"
            >
                <FilterModal filteredResults={filteredResults} handleResultClick={handleResultClick} handleClose={handleClose} />
            </Modal>
        </div>
    );
};

export default Post;
