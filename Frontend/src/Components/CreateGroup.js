import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/CreateGroup.css';

const CreateGroup = () => {
  const [groupName, setName] = useState('');
  const [isPrivate, setVisibility] = useState('public');
  const [creatorID, setCreatedBy] = useState(localStorage.getItem('userId'));
  const creation_date = new Date();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    console.log(groupName)
    console.log(isPrivate)
    console.log(creatorID)
    console.log(creation_date)

    event.preventDefault();
    const groupData = { groupName, isPrivate, creatorID, creation_date };

    try {
      const response = await axios.post('http://localhost:8080/groups/create-group', groupData);
      alert('Group created successfully!');
      navigate('/groups');
    } catch (error) {
      console.error('Error creating group', error);
      alert('Failed to create group');
    }
  };


  return (
    <div className="create-group-form">
      <h2>Create a New Group</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select value={isPrivate} onChange={(e) => setVisibility(e.target.value)}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <button type="submit">Create Group</button>
      </form>
    </div>
  );
};

export default CreateGroup;

