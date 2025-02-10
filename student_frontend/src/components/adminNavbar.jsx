import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt} from 'react-icons/fa';


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
    <nav className="bg-white shadow-lg text-black px-4" style={{ boxShadow: '0 4px 6px rgba(137, 207, 240)' }}>
      <div className="container mx-5 flex justify-between items-center">
        <div className="flex justify-between ml-40">
          <img src="/images/logo1.png" alt="logo" className="h-28 w-28 " />
          <h1 className="text-lg font-bold mt-11 md:text-1xl sm:text-1xl">Safiri Central Kenya</h1>
        </div>
        
        <input type="checkbox" id="menu-toggle" class="peer hidden"/>
        <label for="menu-toggle" class="lg:hidden flex items-center cursor-pointer">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </label>

        <div className="hidden peer-checked:flex lg:flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6 md:text-1xl sm:text-1xl ">
          
           
              {/* <span>Welcome, {user.username}!</span> */}
              <Link to="/admin-dashboard" className="bg-blue-300   p-2 rounded-lg font-semibold">
                Manage Bookings
              </Link>
                          
             
              <button
                onClick={handleLogout}
                className=" p-2 font-semibold  rounded"
              >
                <FaSignOutAlt className="mr-2 h-7 w-8" />
              </button>
           
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
