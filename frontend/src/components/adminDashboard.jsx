import { useEffect, useState } from "react";
import { notify } from "../utils/toast";
import API_URL from "../services/api";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBookings, setSelectedBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${API_URL}/api/admin/bookings/`);
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const updateBookingStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/bookings/${id}/update/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update booking status");
      }

      notify.success("Booking status updated successfully!");
    } catch (error) {
      console.error(error.message);
      notify.error("Error updating booking status");
    }
  };

  const deleteSelectedBookings = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/bookings/bulk-delete/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: selectedBookings }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete bookings");
      }

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => !selectedBookings.includes(booking.id))
      );

      setSelectedBookings([]);
      notify.success("Selected bookings deleted successfully!");
    } catch (error) {
      console.error(error.message);
      notify.error("Error deleting selected bookings");
    }
  };

  const toggleSelectBooking = (id) => {
    setSelectedBookings((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((bookingId) => bookingId !== id)
        : [...prevSelected, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedBookings.length === bookings.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(bookings.map((booking) => booking.id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Bookings Management</h1>
        <p className="text-gray-600">Welcome, Admin! Here are the latest bookings.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-blue-100">
          <p className="text-gray-500">No bookings available.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl border border-blue-100 shadow-sm">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-50 text-gray-700 text-sm uppercase tracking-wider">
                <th className="px-4 py-3 text-left font-semibold">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBookings.length === bookings.length}
                      onChange={toggleSelectAll}
                    />
                    <span>All</span>
                  </label>
                </th>
                <th className="px-4 py-3 text-left font-semibold">First Name</th>
                <th className="px-4 py-3 text-left font-semibold">Last Name</th>
                <th className="px-4 py-3 text-left font-semibold">Phone</th>
                <th className="px-4 py-3 text-left font-semibold">Place</th>
                <th className="px-4 py-3 text-left font-semibold">Check-in</th>
                <th className="px-4 py-3 text-left font-semibold">Check-out</th>
                <th className="px-4 py-3 text-center font-semibold">Adults</th>
                <th className="px-4 py-3 text-center font-semibold">Children</th>
                <th className="px-4 py-3 text-left font-semibold">Trip Preferences</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-blue-50/50 transition">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedBookings.includes(booking.id)}
                      onChange={() => toggleSelectBooking(booking.id)}
                    />
                  </td>
                  <td className="px-4 py-3">{booking.first_name}</td>
                  <td className="px-4 py-3">{booking.last_name}</td>
                  <td className="px-4 py-3">{booking.phone}</td>
                  <td className="px-4 py-3">{booking.place?.name || "N/A"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{booking.check_in}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{booking.check_out}</td>
                  <td className="px-4 py-3 text-center">{booking.adults}</td>
                  <td className="px-4 py-3 text-center">{booking.children}</td>
                  <td className="px-4 py-3 max-w-xs">
                    <span className="text-sm text-gray-600">
                      {booking.trip_preferences || "None"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      className="border border-blue-200 rounded-lg px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => updateBookingStatus(booking.id, booking.status)}
                      className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-600 transition whitespace-nowrap"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedBookings.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={deleteSelectedBookings}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Delete Selected ({selectedBookings.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;