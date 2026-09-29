import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import { AuthProvider } from './context/authContext';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import AdminDashboard from './components/adminDashboard';
import UserDashboard from './components/userDashboard';
import PlaceDetailsPage from './components/placeDetails';
import Success from './components/success';
import Cancel from './components/cancel';
import Profile from './components/profile';
import { LoadScript } from "@react-google-maps/api";
import AdminNavbar from './components/adminNavbar';
import UserNavbar from './components/userNavbar';
import RatingsPage from './components/adminRatings';
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <>
    <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "12px",
            background: "#ffffff",
            color: "#1f2937",
            border: "1px solid #dbeafe",
          },
        }}
      />
  <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
    <Router>
      <Navbar/>
      {/* {renderNavbar()} */}
      <Routes>
        <Route path="/maps" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ratings" element={<RatingsPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/" element={<UserDashboard />} />
          <Route path="/place-details/:id" element={<PlaceDetailsPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/footer" element={<Footer/>}/> */}
      </Routes>
      
      {/* <Footer className="absolute bottom-96 left-0 w-full" /> */}
    </Router>
  </LoadScript>
    
    </>
  );
}

function Navbar() {
  const location = useLocation();

  // Conditionally render UserNavbar or AdminNavbar
  if (location.pathname === '/admin-dashboard' || location.pathname === "/ratings") {
    return <AdminNavbar />;
  }
  return <UserNavbar />;
}

export default App;

