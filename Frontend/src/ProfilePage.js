import React, { useState, useEffect } from 'react'
import axios from 'axios';

//this displays the profile information by getting it from the database
const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/profiles/getById/${id}`);
        console.log(response);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, [id]);

  return (
    <div className="container">
      <h2 className="title">My Profile</h2>
      {profile ? (
        profile.map((res, index) => (
          <div key={index} className="profile">
            <p><strong>Status:</strong> {res.status}</p>
            <p><strong>Interests:</strong> {res.interests}</p>
            <p><strong>Major:</strong> {res.major}</p>
            <p><strong>Location:</strong> {res.location}</p>
            <p><strong>Birthday:</strong> {res.birthday}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
