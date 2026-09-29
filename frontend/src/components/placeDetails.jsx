import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaFacebook, FaTwitter, FaWhatsapp, FaCalendarAlt, FaHotel,
  FaLightbulb, FaMapMarker, FaStar, FaBookmark,
} from "react-icons/fa";
import React, { useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./checkout";
import AuthContext from "../context/authContext";
import { Link } from "react-router-dom";
import { notify } from "../utils/toast";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PlaceDetailsPage = ({ fetchBookings }) => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [events, setEvents] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);
  const [rating, setRating] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userRating, setUserRating] = useState(null);
  const [tips, setTips] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isBookingClicked, setIsBookingClicked] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    check_in: "",
    check_out: "",
    adults: 1,
    children: 0,
    trip_preferences: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

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

        const bookmarkedStatus = localStorage.getItem(`bookmark_${id}`);
        if (bookmarkedStatus) {
          setBookmarked(JSON.parse(bookmarkedStatus));
        }

        const userRatingStatus = localStorage.getItem(`rating_${id}`);
        if (userRatingStatus) {
          setUserRating(JSON.parse(userRatingStatus));
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

  const adultPrice = place?.price_per_adult || 0;
  const childPrice = place?.price_per_child || 0;

  useEffect(() => {
    if (!place) return;
    const newTotalPrice =
      bookingData.adults * adultPrice + bookingData.children * childPrice;
    setTotalPrice(newTotalPrice);
  }, [bookingData.adults, bookingData.children, place, adultPrice, childPrice]);

  if (!place) {
    return <p className="text-center py-20 text-gray-500">Loading...</p>;
  }

  const shareUrl = window.location.href;

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);

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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Booking Failed:", data);
        throw new Error(
          `Booking failed: ${data.message || JSON.stringify(data)}`
        );
      }

      console.log("Booking Created:", data);

      setShowBookingForm(false);
      setShowPaymentForm(true);

      if (data.email_sent === false) {
        notify.error(
          "Booking successful, but the confirmation email could not be sent."
        );
      } else {
        notify.success(
          "Booking successful! A confirmation email has been sent."
        );
      }
    } catch (error) {
      console.error(error);
      notify.error(error.message || "An error occurred while booking.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBookNowClick = () => {
    setIsBookingClicked(true);
    if (user) {
      setShowBookingForm(true);
    }
  };

  const handleGetDirections = () => {
    navigate("/maps", { state: { selectedPlaceId: place.id } });
  };

  const handleBookmark = async () => {
    if (!user) {
      notify.error("Please log in to bookmark this place.");
      return;
    }

    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (!token) {
      notify.error("No authentication token found.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/bookmarks/${id}/`, {
        method: bookmarked ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user: user.id, place: id }),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        setBookmarked(!bookmarked);
        localStorage.setItem(`bookmark_${id}`, JSON.stringify(!bookmarked));
        notify.success(bookmarked ? "Bookmark removed." : "Bookmarked!");
      } else if (data.message === "Already bookmarked") {
        setBookmarked(true);
        localStorage.setItem(`bookmark_${id}`, JSON.stringify(true));
      } else {
        console.error("Error:", data);
        notify.error("Could not update bookmark.");
      }
    } catch (error) {
      console.error("Error updating bookmark status", error);
      notify.error("Could not update bookmark.");
    }
  };

  const handleRating = async (selectedRating) => {
    if (!user) {
      notify.error("Please log in to rate this place.");
      return;
    }

    setUserRating(selectedRating);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/ratings/${id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: selectedRating }),
      });

      if (response.status === 401) {
        console.error("Unauthorized: Invalid or missing token");
      }

      if (response.ok) {
        const data = await response.json();
        setRating(data.new_average_rating);
        setUserRating(data.user_rating);
        localStorage.setItem(`rating_${id}`, JSON.stringify(selectedRating));
        notify.success("Thanks for rating!");
      }
    } catch (error) {
      console.error("Error submitting rating", error);
      notify.error("Could not submit rating.");
    }
  };

  // Normalize images into an array (defensive)
  const images =
    Array.isArray(place.images) && place.images.length > 0
      ? place.images
      : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* ============ HERO IMAGE + THUMBNAIL STRIP ============ */}
      {images.length > 0 && (
        <div className="mb-10">
          {/* Main image */}
          <div className="relative rounded-2xl overflow-hidden shadow-md border border-blue-100 bg-gray-100">
            <img
              src={images[activeImage]}
              alt={`${place.name} — view ${activeImage + 1}`}
              className="w-full h-96 object-cover"
            />

            {/* Image counter badge */}
            {images.length > 1 && (
              <span className="absolute top-4 right-4 bg-black/60 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                {activeImage + 1} / {images.length}
              </span>
            )}

            {/* Prev / Next arrows if more than one image */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImage(
                      (activeImage - 1 + images.length) % images.length
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImage((activeImage + 1) % images.length)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition"
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
              {images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition ${
                    index === activeImage
                      ? "border-blue-600 ring-2 ring-blue-200"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============ TITLE ============ */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
        {place.name}
      </h1>

      {/* ============ DESCRIPTION + ACTIONS ============ */}
      <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 md:p-8 max-w-4xl mx-auto space-y-5">
        <p className="text-gray-700 leading-relaxed">{place.description}</p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleGetDirections}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition"
          >
            <FaMapMarker /> Get Directions
          </button>
          <button
            onClick={handleBookmark}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition"
          >
            <FaBookmark className={bookmarked ? "text-yellow-500" : ""} />
            {bookmarked ? "Remove Bookmark" : "Bookmark"}
          </button>
        </div>
      </div>

      {/* ============ RATING ============ */}
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold mb-1">Rate this place</h3>
        <span className="text-sm text-gray-500">
          Your Rating: {userRating || "Not rated yet"}
        </span>
        <div className="flex justify-center space-x-2 mt-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-2xl transition ${
                star <= (userRating || rating)
                  ? "text-yellow-500"
                  : "text-gray-300 hover:text-yellow-400"
              }`}
              onClick={() => handleRating(star)}
            />
          ))}
        </div>
        <p className="mt-3 text-gray-600">
          Average Rating:{" "}
          <span className="font-semibold text-yellow-600">
            {place?.average_rating
              ? place.average_rating.toFixed(1)
              : "No ratings yet"}
          </span>
        </p>
      </div>

      {/* ============ EVENTS ============ */}
      <div className="mt-10 bg-white rounded-2xl border border-blue-100 shadow-sm p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" /> Upcoming Events
        </h2>
        {events.length === 0 ? (
          <p className="text-gray-500">No events available for this place.</p>
        ) : (
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {events.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        )}
      </div>

      {/* ============ BOOKING ============ */}
      {place.requires_booking && (
        <div className="mt-10 bg-blue-50 border border-blue-100 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <FaHotel className="text-blue-600" /> Book Your Stay
          </h2>
          <p className="text-gray-700 mb-2">
            Check out available accommodations for {place.name}.
          </p>
          <a
            href="https://www.booking.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline inline-block mb-5 font-medium"
          >
            Browse Hotels & Resorts
          </a>

          <div>
            <button
              onClick={handleBookNowClick}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {showBookingForm ? "Collapse Form" : "Book Now"}
            </button>
          </div>

          {isBookingClicked && !user && (
            <div className="mt-6 bg-white rounded-lg p-4 border border-blue-200">
              <p className="mb-3 text-gray-700">
                Please log in to book a stay.
              </p>
              <Link
                to="/login"
                state={{ from: `/place-details/${place.id}` }}
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Login
              </Link>
            </div>
          )}

          {user && showBookingForm && (
            <form
              onSubmit={handleBookingSubmit}
              className="mt-6 bg-white p-6 rounded-2xl shadow-sm border border-blue-100 grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={bookingData.first_name}
                  onChange={handleChange}
                  required
                  className="border border-blue-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={bookingData.last_name}
                  onChange={handleChange}
                  required
                  className="border border-blue-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleChange}
                  placeholder="+2547XXXXXXXX"
                  required
                  className="border border-blue-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  required
                  className="border border-blue-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold text-gray-700">
                  Check-in Date
                </label>
                <input
                  type="date"
                  name="check_in"
                  value={bookingData.check_in}
                  onChange={handleChange}
                  required
                  className="border border-blue-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold text-gray-700">
                  Check-out Date
                </label>
                <input
                  type="date"
                  name="check_out"
                  value={bookingData.check_out}
                  onChange={handleChange}
                  min={bookingData.check_in}
                  required
                  className="border border-blue-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold text-gray-700">
                  Number of Adults
                </label>
                <input
                  type="number"
                  name="adults"
                  value={bookingData.adults}
                  onChange={handleChange}
                  min="1"
                  required
                  className="border border-blue-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold text-gray-700">
                  Number of Children
                </label>
                <input
                  type="number"
                  name="children"
                  value={bookingData.children}
                  onChange={handleChange}
                  min="0"
                  required
                  className="border border-blue-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col sm:col-span-2">
                <label className="mb-1 text-sm font-semibold text-gray-700">
                  Trip Preferences
                </label>
                <textarea
                  name="trip_preferences"
                  value={bookingData.trip_preferences}
                  onChange={handleChange}
                  className="border border-blue-200 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Any specific requests or preferences?"
                  rows="3"
                />
              </div>

              <div className="sm:col-span-2 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h3 className="text-lg font-bold mb-2">Total Price</h3>
                <p className="text-sm text-gray-700">
                  Adults: {bookingData.adults} × Ksh {adultPrice} = Ksh{" "}
                  {bookingData.adults * adultPrice}
                </p>
                <p className="text-sm text-gray-700">
                  Children: {bookingData.children} × Ksh {childPrice} = Ksh{" "}
                  {bookingData.children * childPrice}
                </p>
                <p className="font-bold text-blue-800 mt-2">
                  Total: Ksh {totalPrice}
                </p>
              </div>

              <div className="sm:col-span-2 flex justify-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Confirming..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          )}

          {showPaymentForm && (
            <div className="mt-6 bg-white border border-blue-100 rounded-2xl">
              <h3 className="text-xl font-bold text-center text-gray-800 my-5">
                Please proceed with Payment
              </h3>
              <Elements stripe={stripePromise}>
                <Checkout bookingData={bookingData} />
              </Elements>
            </div>
          )}
        </div>
      )}

      {/* ============ TRAVEL TIPS ============ */}
      <div className="mt-10 bg-white rounded-2xl border border-blue-100 shadow-sm p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaLightbulb className="text-yellow-500" /> Travel Tips
        </h2>
        {tips.length === 0 ? (
          <p className="text-gray-500">No tips available for this place.</p>
        ) : (
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        )}
      </div>

      {/* ============ SHARE ============ */}
      <div className="mt-10 bg-white rounded-2xl border border-blue-100 shadow-sm p-6 md:p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Share This Place
        </h2>
        <div className="flex justify-center gap-6">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition"
            aria-label="Share on Facebook"
          >
            <FaFacebook className="text-blue-600 text-3xl" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition"
            aria-label="Share on Twitter"
          >
            <FaTwitter className="text-blue-400 text-3xl" />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition"
            aria-label="Share on WhatsApp"
          >
            <FaWhatsapp className="text-green-500 text-3xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailsPage;