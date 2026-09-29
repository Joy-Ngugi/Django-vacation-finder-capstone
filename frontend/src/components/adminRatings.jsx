import { useEffect, useState } from "react";
import API_URL from "../services/api";

const RatingsPage = ({ user }) => {
  const [ratings, setRatings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch(`${API_URL}/api/admin/ratings/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch ratings");
        }
        const data = await response.json();
        setRatings(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchRatings();
  }, [token]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Ratings Management</h1>
        <p className="text-gray-600">Here are the latest ratings.</p>
      </div>

      {ratings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-blue-100">
          <p className="text-gray-500">No ratings available.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl border border-blue-100 shadow-sm">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-50 text-gray-700 text-sm uppercase tracking-wider">
                <th className="px-4 py-3 text-left font-semibold">User</th>
                <th className="px-4 py-3 text-left font-semibold">Place</th>
                <th className="px-4 py-3 text-left font-semibold">Rating</th>
                <th className="px-4 py-3 text-left font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ratings.map((rating) => (
                <tr key={rating.id} className="hover:bg-blue-50/50 transition">
                  <td className="px-4 py-3">{rating.user || "N/A"}</td>
                  <td className="px-4 py-3">{rating.place || "N/A"}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 font-semibold text-yellow-600">
                      {rating.rating} <span className="text-gray-400 font-normal">/ 5</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(rating.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RatingsPage;