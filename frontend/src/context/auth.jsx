// src/api/auth.js
import axios from 'axios';
import API_URL from '../services/api';

const AUTH_URL = `${API_URL}/api/auth/`;

// export const signup = async (userData) => {
//   return axios.post(`${API_URL}signup/`, userData);
// };

export const signup = async (formData) => {
  const response = await axios.post(`${AUTH_URL}signup/`, formData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${AUTH_URL}login/`, credentials);
  return response.data;
};

export const getProfile = async (token) => {
  return axios.get(`${AUTH_URL}profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const promoteToAdmin = async (email, token) => {
  try {
  // const csrfToken = document.cookie.match(/csrftoken=([^;]+)/)[1];
    const response = await axios.post(
     `${API_URL}/api/promote-to-admin/`,
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