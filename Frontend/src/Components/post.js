import React, { useState } from 'react';
import { Col, Divider, Row, Card, Avatar, Input, Flex, Radio, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import '../css/post.css';

const Post = () => {
    const elements = [];
    const value = 'verticle'

    for (let i = 1; i <= 50; i++) {
        elements.push(
        <div key={i}>
            <p>Hello from post</p>
        </div>
        );
    }

    return (
        <div class="main">
            <div class='search'>
                <div class="search-bar">
                    <Input placeholder="Search" />
                </div>
            </div>
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
                                        <a href="#">Username</a>
                                    </div>
                                </Space>  
                                <div class="timestamp">
                                    <span >2 hours ago</span>
                                </div>  
                            </div>
                            <div class="post-image">
                            </div>
                            <div class="post-actions">
                                <button class="like-button">123 Like</button>
                                <button class="comment-button">45 Comment</button>
                                <button class="share-button">Share</button>
                            </div>
                        </Card>
                    </Flex>
                </Flex>
            </div>   
        </div>
    );
};

export default Post;