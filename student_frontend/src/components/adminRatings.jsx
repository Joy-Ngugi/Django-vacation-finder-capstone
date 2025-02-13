import { useEffect, useState } from "react";

const RatingsPage = ({user}) => {
  const [ratings, setRatings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/admin/ratings/", {
          headers: { 
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${user.token}` 
            Authorization: `Bearer ${token}`,
          }
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
    
    <>
    <div className="mx-auto p-6">
    <h1 className="text-4xl font-bold text-center mb-4">Ratings Management</h1>
    <p className="text-gray-700 text-center mb-6">Here are the latest ratings.</p>

    {ratings.length === 0 ? (
      <p className="text-center text-gray-500">No ratings available.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Place</th>
              <th className="border px-4 py-2">Rating</th>
              
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((rating) => (
              <tr key={rating.id} className="text-center">
                <td className="border px-4 py-2">{rating.user || "N/A"}</td>
                <td className="border px-4 py-2">{rating.place || "N/A"}</td>
                <td className="border px-4 py-2 font-bold text-yellow-600">{rating.rating} / 5</td>
                
                <td className="border px-4 py-2">{new Date(rating.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  
  </>
  );
};

export default RatingsPage;
