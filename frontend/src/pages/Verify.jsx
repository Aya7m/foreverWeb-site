import React, { useContext, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";

const Verify = () => {
  const navigate = useNavigate();
  const { token, backendUrl, setCartItems } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const hasVerified = useRef(false); // 🔑 المفتاح

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!token || !sessionId || hasVerified.current) return;

    hasVerified.current = true;

    const verifyPayment = async () => {
      try {
        const response = await axios.post(
          backendUrl + "/api/order/verify",
          { sessionId },
          { headers: { token } }
        );

        if (response.data.success) {
          toast.success("Payment Verified Successfully");

          // مسح الـ state
          setCartItems({});
          // مسح الـ cart من localStorage لو متخزن
          localStorage.removeItem("cartItems");

          navigate("/orders");
        } else {
          toast.error("Payment Verification Failed");
          navigate("/cart", { replace: true });
        }
      } catch (error) {
        console.log(error);
        toast.error("Error verifying payment");
        navigate("/cart", { replace: true });
      }
    };

    verifyPayment();
  }, [token, backendUrl, navigate, setCartItems, searchParams]);

  return <div className="text-center mt-20">Verifying Payment...</div>;
};

export default Verify;
