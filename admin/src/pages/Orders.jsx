import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { assets } from "../assets/admin_assets/assets";
import { backend_url, currency } from "../App";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        backend_url + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleStatusChange = async (event, orderId) => {
    try {
      const response = await axios.post(
        backend_url + "/api/order/updateStatus",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Order status updated");
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-center border-b pb-2">
        Orders
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="border rounded-xl shadow-sm p-4 bg-white flex flex-col gap-4"
          >
            {/* Header */}
            <div className="flex items-center gap-4">
              <img
                src={assets.parcel_icon}
                alt="parcel"
                className="w-12 h-12"
              />
              <div className="flex-1">
                <p className="font-semibold text-lg">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  order.payment
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {order.payment ? "Paid" : "Pending"}
              </span>
            </div>

            {/* Items */}
            <div className="text-sm text-gray-700">
              {order.items.map((item, idx) => (
                <p key={idx}>
                  • {item.name} × {item.quantity}{" "}
                  <span className="text-gray-500">(Size: {item.size})</span>
                </p>
              ))}
            </div>

            {/* Address */}
            <div className="text-sm text-gray-600 border-t pt-3">
              <p>{order.address.street}</p>
              <p>
                {order.address.city}, {order.address.country} –{" "}
                {order.address.zipcode}
              </p>
              <p>📞 {order.address.phone}</p>
            </div>

            {/* Order Info */}
            <div className="grid grid-cols-2 gap-3 text-sm border-t pt-3">
              <p>
                <span className="font-semibold">Items:</span>{" "}
                {order.items.length}
              </p>
              <p>
                <span className="font-semibold">Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className="font-semibold">Amount:</span> {order.amount}{" "}
                {currency}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {order.status}
              </p>
            </div>

            {/* Status Update */}
            <select
              onChange={(event) => handleStatusChange(event, order._id)}
              className="border rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              defaultValue={order.status}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
