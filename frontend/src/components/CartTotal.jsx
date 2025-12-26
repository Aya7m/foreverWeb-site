import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { getCartAmount, currency, delivery_fee } = useContext(ShopContext);
  return (
    <div className="w-full">
      <div>
        <Title text="Cart" category="Total" />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex justify-between">
          <p>SubTotal</p>
          <p>
            {currency} {getCartAmount()}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shopping_fee</p>
          <p>
            {delivery_fee} {currency}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Total</p>
          <p>
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}{" "}
            {currency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
