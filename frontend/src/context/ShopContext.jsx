import { createContext, useEffect, useState } from "react";
import axios from "axios";

import toast from "react-hot-toast";

export const ShopContext = createContext();
const ShopContextProvider = (props) => {
  const currency = "EGP";
  const delivery_fee = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("select size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          {
            headers: {
              token,
            },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error("Error in adding to cart");
      }
    }
  };

  const getCartCount = () => {
    // if (!cartItems || Object.keys(cartItems).length === 0) return 0;
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity === 0) {
      delete cartData[itemId][size];

      // لو مفيش مقاسات تاني للمنتج
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);
    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          {
            headers: {
              token,
            },
          }
        );
        if (response.data.success) {
          toast.success(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getUserCart = async (token) => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/cart",
        {},
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting cart data");
    }
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const getCartAmount = () => {
    if (!cartItems || Object.keys(cartItems).length === 0) return 0;
    let totalCart = 0;
    for (const itemId in cartItems) {
      const productInfo = products.find((product) => product._id === itemId);
      for (const size in cartItems[itemId]) {
        try {
          if (cartItems[itemId][size] > 0) {
            totalCart += productInfo.price * cartItems[itemId][size];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCart;
  };

  const getAllProduct = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/product/list-products"
      );
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error("Error in getting products");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  console.log("products", products);

  useEffect(() => {
    getAllProduct();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, [token]);

  useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems]);


  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
