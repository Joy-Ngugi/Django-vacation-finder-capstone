import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import { FaFacebook, FaTwitter, FaWhatsapp, FaCalendarAlt, FaHotel, FaLightbulb, FaMapMarker, FaStar, FaBookmark } from 'react-icons/fa';
import React, {useContext} from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./checkout";
import AuthContext from "../context/authContext";
import { Link } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PlaceDetailsPage = ({mapRef}) => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [events, setEvents] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);
  const [rating, setRating] = useState(0);
  // const [travelMode, setTravelMode] = useState("driving");
  const [userRating, setUserRating] = useState(null);
  const [tips, setTips] = useState([]);
  const { user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [isBookingClicked, setIsBookingClicked] = useState(false);
    const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email:"",
    check_in: "",
    check_out: "",
    adults: 1,
    children: 0,
    trip_preferences: "",
  });
  
  const [showPaymentForm, setShowPaymentForm] = useState(false);

   useEffect(() => {
    const fetchPlaceDetails = async () => {
      if (!id) {
        console.error("Invalid place ID:", id);
        return;
      }
      
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/places/${id}/`);
        if (!response.ok) {
          throw new Error("Place not found");
        }
        const data = await response.json();
        setPlace(data);
        setBookmarked(data.is_bookmarked);
        setRating(data.average_rating);
        if (data.tips && Array.isArray(data.tips)) {
          setTips(data.tips);
        } else {
          setTips([]); 
        }

        if (data.events && Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          setEvents([]); 
        }

      } catch (error) {
        console.error(error.message);
      }
    };

    
    fetchPlaceDetails();
    
  }, [id]);

  if (!place) {
    return <p>Loading...</p>;
  }

  const shareUrl = window.location.href;
  
  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };


  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    const userId = 1; 
    const bookingPayload = {
      user: userId,
      place: id,
      first_name: bookingData.first_name,
      last_name: bookingData.last_name,
      phone: bookingData.phone,
      email: bookingData.email,
      check_in: bookingData.check_in,
      check_out: bookingData.check_out,
      adults: bookingData.adults,
      children: bookingData.children,
      trip_preferences: bookingData.trip_preferences,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/bookings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log("Booking Created:", data);
        throw new Error(`Booking failed: ${data.message || 'Unknown error'}`);
      }
  

      // alert("Booking successful!");
      setShowBookingForm(false);
      setShowPaymentForm(true);
    } catch (error) {
      console.error(error);
      alert("An error occurred while booking.");
    }
  };

  const handleBookNowClick = () => {
    setIsBookingClicked(true);
    if (user) {
      setShowBookingForm(true);
    }
  };

  const handleGetDirections = () => {
    navigate('/maps', { state: { selectedPlaceId: place.id } });
  };

  const handleBookmark = async () => {
    if (!user) {
      alert("Please log in to bookmark this place.");
      return;
    } 

    // alert("Successfully added to bookmark");

    const token = localStorage.getItem("token");
    console.log("Token:", token); 

    if (!token) {
      alert("No authentication token found.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/bookmarks/${id}/`, {
        method: bookmarked ? "DELETE" : "POST",
        headers: {
           "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`,
          },
        body: JSON.stringify({ user: user.id, place: id })
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) { 
        setBookmarked(!bookmarked);
      } else if ( data.message === "Already bookmarked"){
        setBookmarked(true);
        
      } else {
      
      console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error updating bookmark status", error);
    }
  };

  const handleRating = async (selectedRating) => {
    if (!user) {
      alert("Please log in to rate this place.");
      return;
    }

    setUserRating(selectedRating);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/ratings/${id}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: user.id, place: id, rating: selectedRating })
      });
      if (response.ok) {
        const data = await response.json();
        setRating(data.new_average_rating);
      }
    } catch (error) {
      console.error("Error submitting rating", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">{place.name}</h1>

      
      <div className="relative mb-8">
        <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1} autoplay={true} autoplaySpeed={3000}>
          {place.images.map((image, index) => (
            <div key={index} className="flex justify-center">
              <img src={image} alt={`Place ${index + 1}`} className="w-9/12 mx-auto h-96 rounded-lg shadow-lg" />
            </div>
          ))}
        </Slider>
      </div>

      
      <div className="text-gray-700 rounded-lg bg-gray-100 space-y-4 max-w-4xl mx-auto p-8">
        <p>{place.description}</p>
       
        <button onClick={handleGetDirections} className="text-red-600 flex items-center font-bold">
        <FaMapMarker className="mr-2" /> Get Directions
        </button>
        <button onClick={handleBookmark} className="text-blue-600 flex items-center font-bold">
          <FaBookmark className={`mr-2 ${bookmarked ? 'text-yellow-500' : ''}`} /> {bookmarked ? "Remove Bookmark" : "Bookmark"}
        </button>
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold">Rate this place</h3>
        <div className="flex justify-center space-x-2 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar key={star} className={`cursor-pointer text-2xl ${star <= (userRating || rating) ? 'text-yellow-500' : 'text-gray-400'}`} onClick={() => handleRating(star)} />
          ))}
        </div>
        <p className="mt-2">Average Rating: {place.average_rating ? place.average_rating.toFixed(1) : "No ratings yet"}</p>
      </div>
    

      {/* Events Section */}
      <div className="mt-10 bg-gray-200 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaCalendarAlt className="mr-2" /> Upcoming Events
        </h2>
        
        {events.length === 0 ? (
        <p>No events available for this place.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {events.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      )}
      </div>

      {/* booking */}
      <div className="mt-10 bg-blue-100 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
          <FaHotel className="mr-2" /> Book Your Stay
        </h2>
        <p>Check out available accommodations for {place.name}.</p>
        <a href="https://www.booking.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline block mb-4">
          Browse Hotels & Resorts 
        </a> 
        
        <button
          onClick={handleBookNowClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 block"
        >
          {showBookingForm ? "Collapse Form" : "Book Now"}
        </button>

        {isBookingClicked && !user && (
        <div>
        <p className="mt-4">Please log in to book a stay.</p>
        <p className="mx-5 mb-2">👇</p>
        <Link to="/login" state={{ from: `/place-details/${place.id}` }} className="hover:bg-blue-500 hover:text-white  p-2 rounded-lg font-semibold">
                Login
        </Link>
        </div>
        
        )}
        
        {user && showBookingForm && (
          <form onSubmit={handleBookingSubmit} className="mt-4 bg-white p-4 rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="flex flex-col">
            <label className="block mb-2">First Name:</label>
            <input
              type="text"
              name="first_name"
              value={bookingData.first_name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded mb-3"
            />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
            <label className="block mb-2">Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={bookingData.last_name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded mb-3"
            />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
            <label className="block mb-2">Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={bookingData.phone}
              onChange={handleChange}
              placeholder="+2547XXXXXXXX"
              required
              className="w-full border p-2 rounded mb-3"
            />
            </div>

            {/* email */}
            <div className="flex flex-col">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={bookingData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
              className="w-full border p-2 rounded mb-3"
            />
            </div>

            {/* Check-in Date */}
            <div className="flex flex-col">
            <label className="block mb-2">Check-in Date:</label>
            <input
              type="date"
              name="check_in"
              value={bookingData.check_in}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded mb-3"
            />
            </div>

            <div className="flex flex-col">
            <label className="block mb-2">Check-out Date:</label>
            <input
              type="date"
              name="check_out"
              value={bookingData.check_out}
              onChange={handleChange}
              min={bookingData.check_in}
              required
              className="w-full border p-2 rounded mb-3"
            />
            </div>

            {/* Number of Adults */}
            <div className="flex flex-col">
            <label className="block mb-2">Number of Adults:</label>
            <input
              type="number"
              name="adults"
              value={bookingData.adults}
              onChange={handleChange}
              min="1"
              required
              className="w-full border p-2 rounded mb-3"
            />
            </div>

            {/* Number of Children */}
            <div className="flex flex-col">
            <label className="block mb-2">Number of Children:</label>
            <input
              type="number"
              name="children"
              value={bookingData.children}
              onChange={handleChange}
              min="0"
              required
              className="w-full border p-2 rounded mb-3"
            />
            </div>

            {/* Trip Preferences */}
            <div className="flex flex-col">
            <label className="block mb-2">Trip Preferences:</label>
            <textarea
              name="trip_preferences"
              value={bookingData.trip_preferences}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
              placeholder="Any specific requests or preferences?"
            />
            </div>
            
            <div className="col-span-2 flex justify-center">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Confirm Booking
            </button>
            </div>
          </form>
        
        )}
        {showPaymentForm && (
                <div className="mt-6 bg-white border border-gray-300 rounded-lg">
                    <h3 className="text-2xl font-bold text-center text-gray-800 my-4"> Please proceed with Payment</h3>
                    <Elements stripe={stripePromise}>
                        <Checkout bookingData={bookingData} />
                    </Elements>
                </div>
            )}
      </div>
           

      {/* Travel Tips */}
      <div className="mt-10 bg-gray-100 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaLightbulb className="mr-2" /> Travel Tips
        </h2>
          
        {tips.length === 0 ? (
        <p>No tips available for this place.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      )}
      </div>

      {/* Social Sharing */}
      <div className="mt-10 bg-gray-100 p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Share This Place</h2>
        <div className="flex justify-center space-x-4">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-blue-600 text-3xl" />
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-blue-400 text-3xl" />
          </a>
          <a href={`https://api.whatsapp.com/send?text=${shareUrl}`} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="text-green-500 text-3xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailsPage;
