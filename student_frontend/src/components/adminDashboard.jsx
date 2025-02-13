import { useEffect, useState } from "react";


const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBookings, setSelectedBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/admin/bookings/");
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
      const response = await fetch(`http://127.0.0.1:8000/api/admin/bookings/${id}/update/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update booking status");
      }

      alert("Booking status updated successfully!");
    } catch (error) {
      console.error(error.message);
      alert("Error updating booking status");
    }
  };

  const deleteSelectedBookings = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/bookings/bulk-delete/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedBookings }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete bookings");
      }

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => !selectedBookings.includes(booking.id))
      );

      setSelectedBookings([]);
      alert("Selected bookings deleted successfully!");
    } catch (error) {
      console.error(error.message);
      alert("Error deleting selected bookings");
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
    <div className="mx-auto p-6">
      
      <h1 className="text-4xl font-bold text-center mb-4">Bookings Management</h1>
      <p className="text-gray-700 text-center mb-6">Welcome, Admin! Here are the latest bookings.</p>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedBookings.length === bookings.length}
                    onChange={toggleSelectAll}
                    className="mr-2"
                  />
                  Select All
                </th>
                <th className="border px-4 py-2">First Name</th>
                <th className="border px-4 py-2">Last Name</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Place</th>
                <th className="border px-4 py-2">Check-in</th>
                <th className="border px-4 py-2">Check-out</th>
                <th className="border px-4 py-2">Adults</th>
                <th className="border px-4 py-2">Children</th>
                <th className="border px-4 py-2">Trip Preferences</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="text-center">
                  <td className="border px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedBookings.includes(booking.id)}
                      onChange={() => toggleSelectBooking(booking.id)}
                    />
                  </td>
                  <td className="border px-4 py-2">{booking.first_name}</td>
                  <td className="border px-4 py-2">{booking.last_name}</td>
                  <td className="border px-4 py-2">{booking.phone}</td>
                  <td className="border px-4 py-2">{booking.place?.name || "N/A"}</td>
                  <td className="border px-4 py-2">{booking.check_in}</td>
                  <td className="border px-4 py-2">{booking.check_out}</td>
                  <td className="border px-4 py-2">{booking.adults}</td>
                  <td className="border px-4 py-2">{booking.children}</td>
                  <td className="border px-4 py-2">{booking.trip_preferences || "None"}</td>
                  <td className="border px-4 py-2 font-bold text-green-600">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      className="border p-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => updateBookingStatus(booking.id, booking.status)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
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
        <div className="mt-4 text-center">
          <button
            onClick={deleteSelectedBookings}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Selected
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
