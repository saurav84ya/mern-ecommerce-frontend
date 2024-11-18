import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AllRegisterUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch users data
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_SERVER}api/admin/products/fetchUsers`
      );

      // Access the users array from the response data (based on your screenshot)
      const data = response.data.data;

      if (Array.isArray(data)) {
        setUsers(data); // Update the state with fetched users data
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Unable to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch users data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">All Registered Users</h2>

      {/* Display loading message */}
      {loading && <p>Loading users...</p>}

      {/* Display error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display users table */}
      {!loading && !error && users.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border p-2">{user._id}</td>
                <td className="border p-2">{user.userName}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role || "User"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No users found.</p>
      )}
    </div>
  );
}
