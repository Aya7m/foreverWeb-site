import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, cartItems, currency, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (products.length > 0) {
      const prodInCart = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          prodInCart.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
      setCartData(prodInCart);
      console.log(prodInCart);
    }
  }, [cartItems, products]);
  return (
    <div>
      <Title text="Your" category="Cart" />
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          return (
            <div key={index} className="border-t border-b p-3">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center sm:space-y-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <img src={productData.image} alt="" className="w-20" />
                  <div className="flex flex-col">
                    <p>{productData.name}</p>
                    <p>
                      {productData.price} {currency}
                    </p>
                    <p>{item.size}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:gap-4 gap-4 my-2">
                  <input
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(
                            item._id,
                            item.size,
                            Number(e.target.value)
                          )
                    }
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    className="border max-w-20 px-4 py-1.5 outline-0"
                  />
                  <div className="group">
                    <button
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="text-red-600 cursor-pointer px-4 py-1.5 border group-hover:scale-105 duration-300 transition-all"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
     { cartData.length > 0 ? (
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end group">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-slate-100 text-orange-400 px-8 py-2 my-8 group-hover:scale-105 duration-300 transition-all"
            >
              To Check Out
            </button>
          </div>
        </div>
      </div>
     ):(
      <p className="text-center my-20 text-lg">Your cart is empty</p>
     )}
    </div>
  );
};

export default Cart;
