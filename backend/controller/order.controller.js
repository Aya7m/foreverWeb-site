import stripe from "../middleware/stripe.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";

// initialize
const currency = "egp";
const deliveryFee = 50;

// create order cash
export const createCashOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "cash",
      payment: false,
      date: Date.now(),
    };

    const newOrder = await Order(orderData);
    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.status(201).json({ success: true, message: "order placed" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

// get user orders
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);

    res.status(404).json({ success: false, message: error.message });
  }
};

// get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

// update order status (admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: "order status updated" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

// create stripe session
export const createStripeSession = async (req, res) => {
  try {
    const { items, userId, address, amount } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = await Order(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
          images: [item.image[0]],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "delivery charge",
        },
        unit_amount: deliveryFee * 100,
      },
      quantity: 1,
    });

    // const session = await stripe.checkout.sessions.create({
    //   line_items,
    //   mode: "payment",
    //   success_url: `${origin}/verify?success===true&orderId=${newOrder._id}`,
    //   cancel_url: `${origin}/verify?canceled===false&orderId=${newOrder._id}`,
    //   mode: "payment",
    // });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",

      success_url: `${origin}/verify?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,

      metadata: {
        orderId: newOrder._id.toString(),
        userId: userId,
      },
    });

    res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: error.message });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    const { orderId, userId } = session.metadata;

    await Order.findByIdAndUpdate(orderId, {
      payment: true,
      status: "Paid",
    });

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



