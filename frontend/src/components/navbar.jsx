import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    console.log('Navbar User State Updated:', user);
  }, [user]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu when navigating
  const closeMenu = () => setMenuOpen(false);

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-blue-600'
        : 'text-gray-700 hover:text-blue-600'
    }`;

  // const linkUnderline = ({ isActive }) => isActive;

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b transition-shadow duration-300 ${
        scrolled
          ? 'border-blue-100 shadow-[0_4px_16px_rgba(137,207,240,0.35)]'
          : 'border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ============ BRAND ============ */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <img
              src="/images/logo1.png"
              alt="Safiri Central Kenya"
              className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold text-gray-900 tracking-tight">
                Safiri
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-600">
                Central Kenya
              </span>
            </div>
          </Link>

          {/* ============ DESKTOP LINKS ============ */}
          <div className="hidden lg:flex items-center gap-1">
            <NavLink to="/" className={linkClass} end>
              {({ isActive }) => (
                <>
                  Home
                  {isActive && (
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-6 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink to="/maps" className={linkClass}>
              {({ isActive }) => (
                <>
                  Maps
                  {isActive && (
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-6 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </>
              )}
            </NavLink>

            {user && (
              <NavLink to="/profile" className={linkClass}>
                {({ isActive }) => (
                  <>
                    Profile
                    {isActive && (
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-6 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            )}

            {/* Divider */}
            <span className="w-px h-6 bg-gray-200 mx-2" />

            {user ? (
              <div className="flex items-center gap-2">
                {/* User pill */}
                <div className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-blue-50 border border-blue-100">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white">
                    <FaUser className="text-xs" />
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {user.username || 'Account'}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-9 h-9 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition"
                  aria-label="Log out"
                  title="Log out"
                >
                  <FaSignOutAlt className="text-base" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition shadow-sm"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* ============ MOBILE TOGGLE ============ */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-blue-50 transition"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ============ MOBILE MENU ============ */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-blue-50 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-1 bg-white">
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg font-semibold transition ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/maps"
            onClick={closeMenu}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg font-semibold transition ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`
            }
          >
            Maps
          </NavLink>

          {user && (
            <NavLink
              to="/profile"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg font-semibold transition ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`
              }
            >
              Profile
            </NavLink>
          )}

          <div className="pt-3 mt-3 border-t border-blue-50">
            {user ? (
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white">
                    <FaUser className="text-sm" />
                  </span>
                  <span className="font-semibold text-gray-800">
                    {user.username || 'Account'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    closeMenu();
                    handleLogout();
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-semibold text-sm transition"
                >
                  <FaSignOutAlt />
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="block text-center px-4 py-3 rounded-lg font-semibold text-gray-700 border border-blue-100 hover:bg-blue-50 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="block text-center px-4 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;