import axios from 'axios';

// Set the base URL for the API requests
axios.defaults.baseURL = 'http://localhost:8080/api';

export const fetchPendingRequests = async () => {
    try {
        const response = await axios.get('/friends/requests');
        return response.data;
    } catch (error) {
        console.error("Error fetching pending requests", error);
        throw error;
    }
};

export const sendFriendRequest = async (friendId) => {
    try {
        const response = await axios.post('/friends/add', null, { params: { friendId } });
        return response.data;
    } catch (error) {
        console.error("Error sending friend request", error);
        throw error;
    }
};

export const respondToRequest = async (requestId, response) => {
    try {
        const res = await axios.post('/friends/respond', null, { params: { requestId, response } });
        return res.data;
    } catch (error) {
        console.error("Error responding to friend request", error);
        throw error;
    }
};

