import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import AuthContext from '../context/authContext';
import { Link } from 'react-router-dom';
import API_URL from '../services/api';

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
      const response = await axios.post(
        `${API_URL}/api/auth/login/`,
        credentials
      );
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
      const errorMessage =
        error.response?.data?.error || 'Login failed! Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 px-4">
      <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-8">
        <h1 className="text-2xl font-bold text-center mb-2">Welcome back</h1>
        <p className="text-center text-gray-500 text-sm mb-8">
          Log in to continue your journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </p>
          )}

          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="you@example.com"
              value={credentials.email}
              required
              className="w-full p-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="••••••••"
              value={credentials.password}
              required
              className="w-full p-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;