import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import AuthContext from '../context/authContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', credentials);
    console.log(response.data);
    const { access_token, role: roleFromResponse } = response.data;

    if (access_token) {
      
      const decoded = jwtDecode(access_token);
      const userRole = decoded.role || roleFromResponse;  

      
      localStorage.setItem('token', access_token); 
      
      login(access_token, userRole);

      const from = location.state?.from;
      
      if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate(from || '/');
      }
    } else {
      setError('No access token received');
    }
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message);
    const errorMessage = error.response?.data?.error || 'Login failed! Please try again.';
    setError(errorMessage);
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-100 p-6 rounded-xl shadow-md max-w-md mx-auto my-20 space-y-6"
    >
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="Email"
        value={credentials.email}
        required
        className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Password"
        value={credentials.password}
        required
        className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition "
      >
        Login
      </button>
      <p>Don't have an account? <Link to="/signup" className="hover:text-blue-700 underline m-4  ">
        Sign up 
      </Link>
      </p>
    </form>
  );
};

export default Login;

