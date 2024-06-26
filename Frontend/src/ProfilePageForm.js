import React, { useState } from 'react';
import axios from 'axios';

//this form sets up a profile with 5 entities 
const profilePageForm = () => {
    const [interests, setInterests] = useState('');
    const [status, setStatus] = useState('');
    const [birthday, setBirthday] = useState('');
    const [major, setMajor] = useState('');
    const [location, setLocation] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const formData = {
            interests,
            status,
            birthday,
            major,
            location,
        };
      
        try {
          const response = await axios.post(`http://localhost:8080/profiles/save/${id}`, formData);
          console.log(response.data);
          alert('Profile was saved!');
        } catch (error) {
          console.error(error);
          alert('An error occurred. Please try again later');
        }
      };
    
    
    return (
      <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
        <h2 style={{ marginBottom: '20px' }} >Enter profile details:</h2>
        <form onSubmit={handleSubmit} >
          
          <input type="text" name="interests" placeholder="Enter Interests" onChange={(e) => setInterests(e.target.value)} style={{ padding: '10px', height: '150px' }} />
          <input type="text" name="status" placeholder="Enter Status" onChange={(e) => setStatus(e.target.value)}  style={{ padding: '10px', height: '150px' }} />
          <input type="text" name="birthday" placeholder="Enter Birthday" onChange={(e) => setBirthday(e.target.value)} style={{ padding: '10px', height: '150px' }} />
          <input type="text" name="major" placeholder="Enter Major" onChange={(e) => setMajor(e.target.value)} style={{ padding: '10px', height: '150px' }} />
          <input type="text" name="location" placeholder="Enter Location" onChange={(e) => setLocation(e.target.value)} style={{ padding: '10px', height: '150px' }} />
          
          
          <button type="submit">Submit Changes</button>
        </form>
      </div>
    );
    };

export default profilePageForm;
