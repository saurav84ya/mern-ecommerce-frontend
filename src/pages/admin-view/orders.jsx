import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchAllOrdersByUsers = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL_SERVER
        }api/admin/adminGetOrders/adminGetOrders`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    // console.log("orderId, newStatus" , orderId, newStatus)
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_API_URL_SERVER
        }api/admin/adminGetOrders/adminUpdateOrders`,
        {
          orderId,
          status: newStatus,
        }
      );

      // Update the status locally in the state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status", error);
    }
    // console.log("AdminOrders component rendered");
    // console.log("Orders state:", orders);
    // console.log("fetchAllOrdersByUsers function called");
    // console.log("handleStatusChange function called with orderId and newStatus:", orderId, newStatus);
  };

  useEffect(() => {
    fetchAllOrdersByUsers();
  }, []);

  console.log(orders)

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
            <th>Pincode</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.address.pincode}/{order.address.city}</td>
              <td>${order.totalPrice}</td>
              <td style={{ color: getStatusColor(order.status) }}>
                {order.status}
              </td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="delivered">Delivered</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
              <td>
                <Dialog>
                  <DialogTrigger><Button>More...</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                    <DialogTitle
                              className={`
    ${order.status === "pending" ? "text-yellow-400 font-extrabold " : ""}
    ${order.status === "rejected" ? "text-red-400 font-extrabold " : ""}
    ${order.status === "delivered" ? "text-green-400 font-extrabold" : ""}
  `}
                            >
                              {order.status}
                            </DialogTitle>
                      <DialogDescription>
                      <div className="grid grid-cols-2">
                                <div>
                                  <p>Address : {order.address.address}</p>
                                  <p>City : {order.address.city}</p>
                                  <p>Pincode : {order.address.pincode}</p>
                                  <p>Phone : {order.address.phone}</p>
                                </div>
                                <div>
                                  <h1>Total Price : ${order.totalPrice}</h1>
                                  <div className="flex mt-3 gap-2" >
                                    {order.items.map((item, i) => {
                                      return (
                                        <div
                                          key={i}
                                        >
                                            <img
                                              className="h-[50px] w-[50px]"
                                              src={item.image}
                                              alt="image"
                                            />
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
