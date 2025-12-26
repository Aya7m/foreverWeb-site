import React from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cash");
  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    products,
    getCartAmount,
    delivery_fee,
  } = useContext(ShopContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const infoItem = structuredClone(
              products.find((product) => product._id === itemId)
            );

            if (infoItem) {
              infoItem.size = size;
              infoItem.quantity = cartItems[itemId][size];
              orderItems.push(infoItem);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cash":
          const response = await axios.post(
            backendUrl + "/api/order/cash",
            orderData,
            { headers: { token } }
          );
          console.log(response.data);

          if (response.data.success) {
            toast.success(response.data.message);
            setCartItems({});
            navigate("/");
          } else {
            toast.error(response.data.message);
          }

          break;

        case "stripe":
          const stripeResponse = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          console.log(stripeResponse.data);
          if (stripeResponse.data.success) {
            const { session_url } = stripeResponse.data;
            window.location.replace(session_url);
          } else {
            toast.error(stripeResponse.data.message);
          }
        break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={onsubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div>
          <Title text="Delivery" category={"Information"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            name="firstName"
            onChange={onchangeHandler}
            value={formData.firstName}
            placeholder="First Name"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
          <input
            type="text"
            name="lastName"
            onChange={onchangeHandler}
            value={formData.lastName}
            placeholder="Last Name"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          onChange={onchangeHandler}
          value={formData.email}
          placeholder="Email"
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />

        <input
          type="text"
          name="street"
          onChange={onchangeHandler}
          value={formData.street}
          placeholder="Street"
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <div className="flex gap-3">
          <input
            type="number"
            name="zipcode"
            onChange={onchangeHandler}
            value={formData.zipcode}
            placeholder="Zip code"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
          <input
            type="text"
            name="country"
            onChange={onchangeHandler}
            value={formData.country}
            placeholder="Country"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          onChange={onchangeHandler}
          value={formData.phone}
          placeholder="Phone"
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
      </div>

      {/* right side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <CartTotal />

        <div className="mt-12">
          <Title text="Payment" Category="Method" />
          <div className="flex  gap-3 items-center justify-center">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-2 border p-2 px-3 cursor-pointer bg-slate-100"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} alt="" className="h-5 mx-4" />
            </div>
            <div
              onClick={() => setMethod("cash")}
              className="flex items-center gap-2 border p-2 px-3 cursor-pointer bg-slate-100"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cash" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="font-medium mx-4 text-sm text-[#ED985F]">Cash</p>
            </div>
          </div>
        </div>
        <div className="w-full text-center mt-8">
          <button
            type="submit"
            className="text-slate-100 bg-[#f7893f] px-16 py-3 cursor-pointer"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
