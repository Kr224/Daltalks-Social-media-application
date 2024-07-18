import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/CreateGroup.css';

const CreateGroup = () => {
  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [createdBy, setCreatedBy] = useState(localStorage.getItem('userId'));
  const date = new Date();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const groupData = { name, visibility, created_by: createdBy, date };

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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <button type="submit">Create Group</button>
      </form>
    </div>
  );
};

export default CreateGroup;