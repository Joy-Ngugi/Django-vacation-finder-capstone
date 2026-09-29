import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBookmark,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaUsers,
  FaTrash,
  FaArrowRight,
} from "react-icons/fa";
import API_URL from "../services/api";

const Profile = () => {
  const [bookings, setBookings] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch(`${API_URL}/api/user/bookmarks/`, {
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
        const response = await fetch(`${API_URL}/api/user/bookings/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Booking Data:", data);

        const bookingsArray = Array.isArray(data) ? data : data.results || [];

        setBookings(bookingsArray);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      }
    };

    fetchBookings();
  }, []);

  const removeBookingFromUI = (bookingId) => {
    const confirmRemoval = window.confirm(
      "Are you sure you want to remove this booking from the list?"
    );
    if (confirmRemoval) {
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* ==================== BOOKMARKS ==================== */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600">
            <FaBookmark className="text-lg" />
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Your Bookmarked Places
          </h2>
        </div>

        {bookmarks.length === 0 ? (
          <div className="bg-white border border-blue-100 rounded-2xl p-10 text-center shadow-sm">
            <FaBookmark className="text-3xl text-blue-200 mx-auto mb-3" />
            <p className="text-gray-500">No bookmarked places yet.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bookmarks.map((place) => (
              <li
                key={place.id}
                className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-50 text-blue-600 shrink-0">
                    <FaMapMarkerAlt />
                  </span>
                  <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                    {place.name}
                  </h3>
                </div>

                {place.location && (
                  <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-400" />
                    {place.location}
                  </p>
                )}

                <Link
                  to={`/place-details/${place.id}`}
                  className="mt-auto inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold text-sm self-start"
                >
                  View Place <FaArrowRight className="text-xs" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ==================== BOOKINGS ==================== */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600">
            <FaCalendarAlt className="text-lg" />
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Your Bookings
          </h1>
        </div>

        {!bookings || bookings.length === 0 ? (
          <div className="bg-white border border-blue-100 rounded-2xl p-10 text-center shadow-sm">
            <FaCalendarAlt className="text-3xl text-blue-200 mx-auto mb-3" />
            <p className="text-gray-500">No bookings found.</p>
          </div>
        ) : (
          <ul className="space-y-5">
            {bookings.map((booking) => (
              <li
                key={booking.id}
                className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-blue-50">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 shrink-0">
                      <FaMapMarkerAlt />
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">
                      {booking.place.name}
                    </h3>
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-5">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FaUser className="text-blue-500 shrink-0" />
                    <span className="text-gray-500">Name:</span>
                    <span className="font-medium">
                      {booking.first_name} {booking.last_name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FaEnvelope className="text-blue-500 shrink-0" />
                    <span className="text-gray-500">Email:</span>
                    <span className="font-medium truncate">{booking.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FaPhone className="text-blue-500 shrink-0" />
                    <span className="text-gray-500">Phone:</span>
                    <span className="font-medium">{booking.phone}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FaUsers className="text-blue-500 shrink-0" />
                    <span className="text-gray-500">Guests:</span>
                    <span className="font-medium">
                      {booking.adults} Adults, {booking.children} Children
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FaCalendarAlt className="text-blue-500 shrink-0" />
                    <span className="text-gray-500">Check-in:</span>
                    <span className="font-medium">{booking.check_in}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FaCalendarAlt className="text-blue-500 shrink-0" />
                    <span className="text-gray-500">Check-out:</span>
                    <span className="font-medium">{booking.check_out}</span>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeBookingFromUI(booking.id)}
                  className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold text-sm transition"
                >
                  <FaTrash />
                  Remove from View
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Profile;