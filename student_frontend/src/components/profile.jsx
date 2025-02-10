

import { useState, useEffect } from "react";


const Profile = () => {
 
  const [bookings, setBookings] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user/bookmarks/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch bookmarks");

        const data = await response.json();
        setBookmarks(data); 
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, [token]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          setBookings([]);  
          return;
        }
        const response = await fetch("http://127.0.0.1:8000/api/user/bookings/", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
  
        
        const data = await response.json();
        console.log('Booking Data:',data)

        if (!Array.isArray(data)) {
          console.error("Unexpected data format:", data);
          setBookings([]);  
          return;
        }
  
        
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      }
    };
  
    fetchBookings();
  }, []);

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      {/* <h1>Hello {user.username}</h1> */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Bookmarked Places</h2>

      {bookmarks.length === 0 ? (
        <p>No bookmarked places yet.</p>
      ) : (
        <ul className="grid grid-cols-3 gap-4">
          {bookmarks.map((place) => (
            <li key={place.id} className="border p-4 rounded-lg shadow-md">
              <h3 className="font-semibold">{place.name}</h3>
              <p>{place.location}</p>
              <a href={`/place-details/${place.id}`} className="text-blue-500 hover:underline">View Place</a>
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-4">
  {(Array.isArray(bookings) ? bookings : []).map((booking) => (
    <li key={booking.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{booking.place_name}</h3>
      <p><strong>Check-in:</strong> {booking.check_in}</p>
      <p><strong>Check-out:</strong> {booking.check_out}</p>
      <p><strong>Guests:</strong> {booking.adults} Adults, {booking.children} Children</p>
    </li>
  ))}
</ul>
      )}
    </div>
    </>
  );
};

export default Profile;

