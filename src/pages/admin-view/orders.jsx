import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchAllOrdersByUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL_SERVER}api/admin/adminGetOrders/adminGetOrders`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    console.log("orderId, newStatus" , orderId, newStatus)
    try {
      // Update the status in the backend
      await axios.patch(`${import.meta.env.VITE_API_URL_SERVER}api/admin/adminGetOrders/adminUpdateOrders`, {
        orderId,
        status: newStatus,
      });

      // Update the status locally in the state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  useEffect(() => {
    fetchAllOrdersByUsers();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "green";
      case "rejected":
        return "red";
      case "delivered":
        return "blue";
      default:
        return "black";
    }
  };

  return (
    <div>
      <h1>Admin Orders</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId}</td>
              <td>${order.totalPrice}</td>
              <td style={{ color: getStatusColor(order.status) }}>{order.status}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="delivered">Delivered</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
