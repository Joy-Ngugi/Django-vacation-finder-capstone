import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; 
      return decoded.exp > currentTime; 
    } catch (error) {
      return false;
    }
  };

  
  useEffect(() => {
    const refreshToken = async () => {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post('https://localhost:8000/api/token/refresh/', {
            refresh_token: refreshToken,
          });
          const { token } = response.data; // Assuming the new token is in the 'token' field
          localStorage.setItem('token', token);
          setUser(jwtDecode(token)); // Decode and update user state
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        logout();
      }
    };
  
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token); 
    if (token && isTokenValid(token)) {
      const decodedUser = jwtDecode(token);
      console.log('Decoded user:', decodedUser); 
      setUser(decodedUser);
    } else if (token) {

      refreshToken();
    } else {
      localStorage.removeItem('token'); 
    }
    setLoading(false); 
  }, []);

  const login = (token) => {
    const decoded = jwtDecode(token);
    console.log('User Logged In:', decoded);
    console.log('Storing token:', token); 
    setUser(decoded);
    setIsAdmin(decoded.role === 'admin');
    localStorage.setItem('token', token);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenValid(token)) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      setIsAdmin(decodedUser.role === 'admin'); 
    }
  }, []);

  const logout = () => {
    console.log('User Logged Out');
    setUser(null);
    localStorage.removeItem('token');
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;



