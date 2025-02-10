import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import { AuthProvider } from './context/authContext';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import AdminDashboard from './components/adminDashboard';
import UserDashboard from './components/userDashboard';
// import {jwtDecode} from 'jwt-decode';
// import Navbar from './components/navbar';
import PlaceDetailsPage from './components/placeDetails';
import Success from './components/success';
import Cancel from './components/cancel';
import Profile from './components/profile';
import { LoadScript } from "@react-google-maps/api";
import AdminNavbar from './components/adminNavbar';
import UserNavbar from './components/userNavbar';


function App() {
  // const [isAdmin, setIsAdmin] = useState(false);
  // const location = useLocation();

  // This is just an example of how you could check if the user is an admin
  // useEffect(() => {
  //   const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
  //   if (token) {
  //     try {
  //       const decodedToken = jwtDecode(token);
  //       console.log(decodedToken);
  //       if (decodedToken.userRole === 'admin') {
  //         setIsAdmin(true);
  //       }
  //     } catch (error) {
  //       console.error("Error decoding token:", error);
  //     }
  //   }
  // }, []);
  
  // const renderNavbar = () => {
  //   // Check if the current route is not the admin dashboard
  //   if (location.pathname !== '/admin-dashboard') {
  //     return <UserNavbar />;
  //   }
  //   return <AdminNavbar />;
  // };

  return (
    <>
  <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
    <Router>
      <Navbar/>
      {/* {renderNavbar()} */}
      <Routes>
        <Route path="/maps" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/" element={<UserDashboard />} />
          <Route path="/place-details/:id" element={<PlaceDetailsPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  </LoadScript>
    
    </>
  );
}

function Navbar() {
  const location = useLocation();

  // Conditionally render UserNavbar or AdminNavbar
  if (location.pathname === '/admin-dashboard') {
    return <AdminNavbar />;
  }
  return <UserNavbar />;
}

export default App;

