import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../context/auth';
import { notify } from '../utils/toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setError('');
    setSubmitting(true);

    try {
      await signup(formData);
      notify.success('Account created! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Signup Error:', error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.error || 'Signup failed! Please try again.';
      setError(errorMessage);
      notify.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 px-4">
      <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-8">
        <h1 className="text-2xl font-bold text-center mb-2">
          Create an account
        </h1>
        <p className="text-center text-gray-500 text-sm mb-8">
          Join us to explore and book your next adventure
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </p>
          )}

          <div className="space-y-1">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="Your username"
              value={formData.username}
              required
              className="w-full p-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="you@example.com"
              value={formData.email}
              required
              className="w-full p-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="••••••••"
              value={formData.password}
              required
              className="w-full p-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-semibold underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;