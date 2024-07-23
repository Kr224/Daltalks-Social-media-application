import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Avatar, Input, Space, Spin, Button, AutoComplete, Select } from 'antd';
import { UserOutlined, LikeOutlined, CommentOutlined, SendOutlined, TeamOutlined } from '@ant-design/icons';
import Friend from './friends';
import axios from 'axios';
import Navigation from './navigation';
import '../css/post.css';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filter, setFilter] = useState('people');
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [selectedMajor, setSelectedMajor] = useState([]);
    const [allInterests, setAllInterests] = useState(new Set());
    const [allStatus, setAllStatus] = useState(new Set());
    const [allMajor, setAllMajor] = useState(new Set());
    const navigate = useNavigate();

    const currentID = localStorage.getItem('userId');

    // Fetch posts, users, groups, and profiles
    useEffect(() => {
        const fetchData = async () => {
            try {
                const postResponse = await axios.get('http://localhost:8080/api/getAllPost');
                setPosts(postResponse.data);

                const userResponse = await axios.get('http://localhost:8080/api/user/getAllUser');
                setUsers(userResponse.data);

                const groupResponse = await axios.get('http://localhost:8080/groups/get-all-groups');
                setGroups(groupResponse.data);

                const profilesResponse = await axios.get('http://localhost:8080/profiles/getAllProfiles');
                const profiles = profilesResponse.data;

                // Extract and store unique interests, status, and major
                const interestsSet = new Set();
                const statusSet = new Set();
                const majorSet = new Set();

                profiles.forEach(profile => {
                    if (profile.interests) {
                        profile.interests.split(',').forEach(interest => interestsSet.add(interest.trim()));
                    }
                    if (profile.status) {
                        statusSet.add(profile.status.trim());
                    }
                    if (profile.major) {
                        majorSet.add(profile.major.trim());
                    }
                });

                setAllInterests(interestsSet);
                setAllStatus(statusSet);
                setAllMajor(majorSet);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [currentID]);

    // Update search results based on search query and filters
    useEffect(() => {
        if (searchQuery) {
            let results = [];
            if (filter === 'people') {
                results = users
                    .filter(({ email, interests, status, major }) =>
                        email &&
                        email.split('@')[0].toLowerCase().includes(searchQuery.toLowerCase()) &&
                        (selectedInterests.length === 0 || (interests && interests.split(',').some(interest => selectedInterests.includes(interest.trim())))) &&
                        (selectedStatus.length === 0 || (status && selectedStatus.includes(status.trim()))) &&
                        (selectedMajor.length === 0 || (major && selectedMajor.includes(major.trim())))
                    );
            } else {
                results = groups
                    .filter(({ groupName }) =>
                        groupName && groupName.toLowerCase().includes(searchQuery.toLowerCase())
                    );
            }
            // Debugging: Check searchResults before setting state
            console.log('Filtered Results:', results);
            setSearchResults(results.map(({ email, id, groupName }) => ({
                type: filter === 'people' ? 'friend' : 'group',
                value: filter === 'people' ? (email ? email.split('@')[0] : '') : (groupName ? groupName : ''),
                label: filter === 'people' ? (
                    <div>
                        <UserOutlined /> {email.split('@')[0]}
                    </div>
                ) : (
                    <div>
                        <TeamOutlined /> {groupName}
                    </div>
                ),
                id: id,
            })));
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, users, groups, filter, selectedInterests, selectedStatus, selectedMajor]);

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
                    <div className="filter-container">
                        <Select
                            defaultValue="people"
                            onChange={(value) => setFilter(value)}
                            className="filter-dropdown"
                        >
                            <Option value="people">People</Option>
                            <Option value="groups">Groups</Option>
                            <Option value="interests">Interests</Option>
                            <Option value="status">Status</Option>
                            <Option value="major">Major</Option>
                        </Select>
                        {filter === 'interests' && (
                            <Select
                                className="filter-select"
                                mode="multiple"
                                placeholder="Select interests"
                                onChange={setSelectedInterests}
                                style={{ width: '100%' }}
                            >
                                {[...allInterests].map(interest => (
                                    <Option key={interest} value={interest}>{interest}</Option>
                                ))}
                            </Select>
                        )}
                        {filter === 'status' && (
                            <Select
                                className="filter-select"
                                mode="multiple"
                                placeholder="Select status"
                                onChange={setSelectedStatus}
                                style={{ width: '100%' }}
                            >
                                {[...allStatus].map(status => (
                                    <Option key={status} value={status}>{status}</Option>
                                ))}
                            </Select>
                        )}
                        {filter === 'major' && (
                            <Select
                                className="filter-select"
                                mode="multiple"
                                placeholder="Select major"
                                onChange={setSelectedMajor}
                                style={{ width: '100%' }}
                            >
                                {[...allMajor].map(major => (
                                    <Option key={major} value={major}>{major}</Option>
                                ))}
                            </Select>
                        )}
                        {(filter === 'people' || filter === 'groups') && (
                            <AutoComplete
                                options={searchResults}
                                onSelect={handleSelect}
                                onSearch={(value) => setSearchQuery(value)}
                                style={{ width: '100%' }}
                            >
                                <Input.Search
                                    placeholder="Search people or groups"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-bar"
                                />
                            </AutoComplete>
                        )}
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
                                                        {users.find((user) => user.id === post.userID)?.email.split('@')[0]
                                                            ? <a>{users.find((user) => user.id === post.userID)?.email.split('@')[0]}</a>
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
