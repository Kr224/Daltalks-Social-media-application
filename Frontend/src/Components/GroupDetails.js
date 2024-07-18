import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/GroupDetails.css';

const GroupDetails = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/groups/${id}`);
        setGroup(response.data.group);
        setMembers(response.data.members);
      } catch (error) {
        console.error('Error fetching group details', error);
      }
    };

    fetchGroupDetails();
  }, [id]);

  const handleAddMember = async (userId) => {
    try {
      await axios.post(`http://localhost:8080/group_members/add-membership`, {
        group: { id },
        user: { id: userId },
        isActive: true
      });
      alert('Member added successfully');
      const response = await axios.get(`http://localhost:8080/groups/${id}`);
      setMembers(response.data.members);
    } catch (error) {
      console.error('Error adding member', error);
      alert('Failed to add member');
    }
  };

  const handleRemoveMember = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/group_members/remove-friendship`, {
        data: {
          group: { id },
          user: { id: userId }
        }
      });
      alert('Member removed successfully');
      const response = await axios.get(`http://localhost:8080/groups/${id}`);
      setMembers(response.data.members);
    } catch (error) {
      console.error('Error removing member', error);
      alert('Failed to remove member');
    }
  };

  return (
    <div className="group-details">
      {group ? (
        <>
          <h2>{group.name}</h2>
          <p>Visibility: {group.visibility}</p>
          <p>Created by: {group.created_by}</p>
          <h3>Members</h3>
          <ul>
            {members.map(member => (
              <li key={member.user_id}>
                {member.user_id} - {member.isActive ? 'Active' : 'Inactive'}
                <button onClick={() => handleRemoveMember(member.user_id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={() => handleAddMember(prompt('Enter user ID to add'))}>Add Member</button>
        </>
      ) : (
        <p>Loading group details...</p>
      )}
    </div>
  );
};

export default GroupDetails;





//import React, { useState, useEffect } from 'react';
//import axios from 'axios';
//import { useParams } from 'react-router-dom';
//import '../css/GroupDetails.css';
//
//const GroupDetails = () => {
//  const { id } = useParams();
//  const [group, setGroup] = useState(null);
//  const [members, setMembers] = useState([]);
//
//  useEffect(() => {
//    const fetchGroupDetails = async () => {
//      try {
//        const response = await axios.get(`http://localhost:8080/groups/${id}`);
//        setGroup(response.data.group);
//        setMembers(response.data.members);
//      } catch (error) {
//        console.error('Error fetching group details', error);
//      }
//    };
//
//    fetchGroupDetails();
//  }, [id]);
//
//  const handleAddMember = async (userId) => {
//    try {
//      await axios.post(`http://localhost:8080/group/${id}/add-member/${userId}`);
//      alert('Member added successfully');
//      // Refresh members list
//    } catch (error) {
//      console.error('Error adding member', error);
//      alert('Failed to add member');
//    }
//  };
//
//
//  const handleRemoveMember = async (userId) => {
//    try {
//      await axios.delete(`http://localhost:8080/group/${id}/delete-member/${userId}`);
//      alert('Member removed successfully');
//      // Refresh members list
//    } catch (error) {
//      console.error('Error removing member', error);
//      alert('Failed to remove member');
//    }
//  };
//
//  return (
//    <div className="group-details">
//      {group ? (
//        <>
//          <h2>{group.name}</h2>
//          <p>Visibility: {group.visibility}</p>
//          <p>Created by: {group.created_by}</p>
//          <h3>Members</h3>
//          <ul>
//            {members.map(member => (
//              <li key={member.user_id}>
//                {member.user_id} - {member.isactive ? 'Active' : 'Inactive'}
//                <button onClick={() => handleRemoveMember(member.user_id)}>Remove</button>
//              </li>
//            ))}
//          </ul>
//          <button onClick={() => handleAddMember(prompt('Enter user ID to add'))}>Add Member</button>
//        </>
//      ) : (
//        <p>Loading group details...</p>
//      )}
//    </div>
//  );
//};
//export default GroupDetails;
//
