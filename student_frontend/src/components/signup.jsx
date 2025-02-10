import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../context/auth';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    try {
      await signup(formData);
      alert('User registered successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Signup Error:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.error || 'Signup failed! Please try again.';
      setError(errorMessage);
      
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-100 p-6 rounded-xl shadow-md max-w-md mx-auto my-20 space-y-4"
    >
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="text"
        name="username"
        onChange={handleChange}
        placeholder="Username"
        value={formData.username}
        required
        className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="Email"
        value={formData.email}
        required
        className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Password"
        value={formData.password}
        required
        className="w-full p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
      >
        Sign up
      </button>
    </form>
  );
};

export default Signup;
