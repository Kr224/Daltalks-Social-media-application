import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/friends.css';

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
      try {
        const savedUserId = localStorage.getItem('userId');
        if (savedUserId) {
          const response = await axios.get(`http://localhost:8080/api/user/getFriendRequests?userID=${savedUserId}`);
          setRequests(response.data);
        }
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    const handleAcceptRequest = async (requestId) => {
        try {
          await axios.post(`http://localhost:8080/api/user/acceptFriendRequest?requestId=${requestId}`);
          fetchFriendRequests();
        } catch (error) {
          console.error('Error accepting friend request:', error);
        }
      };

      const handleRejectRequest = async (requestId) => {
        try {
          await axios.post(`http://localhost:8080/api/user/rejectFriendRequest?requestId=${requestId}`);
          fetchFriendRequests();
        } catch (error) {
          console.error('Error rejecting friend request:', error);
        }
      };

  return (
    <div>
      <h2>Friend Requests</h2>
      <Link to="/My-friends">Go to Friends List</Link>
      {requests.length > 0 ? (
        requests.map((request) => (
          <div key={request.requestId}>
            <p>{request.senderEmail} wants to be your friend.</p>
            <button onClick={() => handleAcceptRequest(request.requestId)}>Accept</button>
            <button onClick={() => handleRejectRequest(request.requestId)}>Reject</button>
          </div>
        ))
      ) : (
        <p>No friend requests.</p>
      )}
    </div>
  );
};

export default FriendRequests;