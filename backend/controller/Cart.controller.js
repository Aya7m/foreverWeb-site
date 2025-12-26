import { User } from "../models/user.model.js";

// add to cart
export const adToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await User.findById(userId);
    let cartData = await userData.cartData;
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
    await User.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "product Add To Cart" });
  } catch (error) {
    console.log(error);

    res.status(404).json({ success: false, message: error.message });
  }
};

// update cart
export const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await User.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;
    await User.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "update cart" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: error.message });
  }
};


// get cart

export const getUserCart = async (req, res) => {
  try {
    const { userId} = req.body;
    const userData = await User.findById(userId);
    let cartData = await userData.cartData;
    res.status(200).json({ success: true,cartData });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: error.message });
  }
};