import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const getOrder = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        backendUrl + "/api/order/userOrder",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let orders = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["date"] = order.date;
            item["status"] = order.status;
            item["paymentMethod"] = order.paymentMethod;
            item["payment"] = order.payment;
            orders.push(item);
          });
        });
        setOrderData(orders.reverse());
        console.log(orders);
      }
    } catch (error) {
      console.log(error);
      toast.error();
    }
  };

  useEffect(() => {
    getOrder();
  }, [token]);
  return (
    <div className="flex flex-col gap-5 mb-24">
      <Title text="All" category={"Orders"} />
      <div className="flex flex-col gap-3">
        {orderData.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row  items-center justify-between border-t border-b border-gray-200 gap-y-4"
          >
            <div className="flex items-center gap-2">
              <img src={item.image} alt="" className="w-40" />
              <div>
                <p>{item.name}</p>
                <p>
                  {item.price} {currency}
                </p>
                <p>Quantity:{item.quantity}</p>

                <p>Size:{item.size}</p>
                <p>
                  Date:<span>{new Date(item.date).toDateString()}</span>
                </p>
                <p>Payment Method: {item.paymentMethod}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <p className="w-3 h-3 bg-green-400 rounded-full"></p>
              <p>{item.status}</p>
            </div>

            <p
              onClick={getOrder}
              className="border border-gray-400 px-6 py-2 cursor-pointer gap-y-2 hover:bg-gray-100 hover:scale-105 duration-300"
            >
              Tranck Order
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
