import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const AdminNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    console.log('Navbar User State Updated:', user);
  }, [user]);

  return (
    <nav
      className="bg-white text-black sticky top-0 z-50 border-b border-blue-100"
      style={{ boxShadow: '0 4px 6px rgba(137, 207, 240)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Brand */}
          <Link to="/admin-dashboard" className="flex items-center gap-3 shrink-0">
            <img src="/images/logo1.png" alt="logo" className="h-14 w-14 object-contain" />
            <div className="flex flex-col leading-tight">
              <h1 className="text-lg md:text-xl font-bold tracking-tight">
                Safiri Central Kenya
              </h1>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Admin Panel
              </span>
            </div>
          </Link>

          {/* Mobile toggle */}
          <input type="checkbox" id="admin-menu-toggle" className="peer hidden" />
          <label
            htmlFor="admin-menu-toggle"
            className="lg:hidden flex items-center cursor-pointer p-2 rounded-lg hover:bg-blue-50 transition"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </label>

          {/* Links */}
          <div
            className="hidden peer-checked:flex lg:flex absolute lg:static top-20 left-0 right-0 lg:top-auto bg-white lg:bg-transparent border-b lg:border-0 border-blue-100 flex-col lg:flex-row items-stretch lg:items-center gap-1 lg:gap-2 p-4 lg:p-0"
          >
            <Link
              to="/admin-dashboard"
              className="px-4 py-2 rounded-lg font-semibold text-center hover:bg-blue-300 transition"
            >
              Manage Bookings
            </Link>
            <Link
              to="/ratings"
              className="px-4 py-2 rounded-lg font-semibold text-center hover:bg-blue-300 transition"
            >
              Ratings
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold hover:bg-blue-300 transition"
              aria-label="Log out"
            >
              <FaSignOutAlt className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;