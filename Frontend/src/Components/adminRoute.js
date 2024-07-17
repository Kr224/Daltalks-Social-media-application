import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const AdminRoute = ({ element: Component }) => {
  const isAuthenticated = localStorage.getItem('loggedIn') === 'true';
  const [role, setRole] = useState(false);
  const userID = localStorage.getItem('userId');

  const getRole = async (userID) => {
    const reRole = await axios.get(`http://localhost:8080/api/user/getRole/${userID}`);
    
    if(reRole.data === "BSB" && isAuthenticated){
      setRole(true);
      window.location.href = '/admin';
    }
    else {
      window.location.href = '/error'; 
    }
  }

  getRole(userID);
};



export default AdminRoute;
