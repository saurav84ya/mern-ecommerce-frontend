import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '../ui/table';
import { Button } from '../ui/button';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function UserOrders() {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]); // State to store fetched orders

  const fetchAllOrders = async () => {
    try {
      const userId = user.id;
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_SERVER}api/user/order/fetchOrders/${userId}`
      );
      console.log(response.data);
      setOrders(response.data.orders || []); // Update orders state
    } catch (error) {
      console.log('Error while fetching orders', error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell
  className={`
    ${order.status === "pending" ? "text-yellow-400 font-extrabold " : ""}
    ${order.status === "rejected" ? "text-red-400 font-extrabold " : ""}
    ${order.status === "delivered" ? "text-green-400 font-extrabold" : ""}
  `}
>
  {order.status}
</TableCell>

                  <TableCell>${order.totalPrice}</TableCell>
                  <TableCell>
                    <Button>View Detail</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
