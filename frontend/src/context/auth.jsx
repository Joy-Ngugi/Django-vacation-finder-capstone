// src/api/auth.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/auth/';

// export const signup = async (userData) => {
//   return axios.post(`${API_URL}signup/`, userData);
// };

export const signup = async (formData) => {
  const response = await axios.post(`${API_URL}signup/`, formData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}login/`, credentials);
  return response.data;
};

export const getProfile = async (token) => {
  return axios.get(`${API_URL}profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const promoteToAdmin = async (email, token) => {
  try {
  // const csrfToken = document.cookie.match(/csrftoken=([^;]+)/)[1];
    const response = await axios.post(
      'http://127.0.0.1:8000/api/promote-to-admin/',
      { email },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'X-CSRFToken': csrfToken,
        },
      }
    );
    return response.data;
  } catch (error){
    console.error('Error promoting user to admin:', error.response?.data || error.message);
    throw error; 
  }
};