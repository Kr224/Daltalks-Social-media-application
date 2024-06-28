import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/friend-requests');
      setFriendRequests(response.data);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };


//const fetchFriendRequests = () => {
//  const myInput = [
//    { id: 1, senderId: 1, receiverId: 2, status: 'PENDING' },
//    { id: 2, senderId: 3, receiverId: 2, status: 'PENDING' },
//  ];
//  setFriendRequests(myInput);
//};

  const handleAccept = async (requestId) => {
    try {
      await axios.post(`http://localhost:8080/api/friend-requests/${requestId}/accept`);
      fetchFriendRequests();
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.post(`http://localhost:8080/api/friend-requests/${requestId}/reject`);
      fetchFriendRequests();
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      {friendRequests.length === 0 ? (
        <p>No friend requests</p>
      ) : (
        <ul>
          {friendRequests.map((request) => (
            <li key={request.id}>
              <p>User {request.senderId} is requesting to be friends with User {request.receiverId}</p>
              <button onClick={() => handleAccept(request.id)}>Accept</button>
              <button onClick={() => handleReject(request.id)}>Decline</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendRequests;

