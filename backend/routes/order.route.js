import { Router } from "express";
import { userAuth } from "../middleware/userAuth.js";
import {
  createCashOrder,
  createStripeSession,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  verifyPayment,
} from "../controller/order.controller.js";
import { adminAuth } from "../middleware/adminAuth.js";

const orderRoute = Router();
orderRoute.post("/cash", userAuth, createCashOrder);

// verify payment
orderRoute.post('/verify',userAuth,verifyPayment);

// userOrder
orderRoute.post("/userOrder", userAuth, getUserOrders);
orderRoute.post("/stripe", userAuth, createStripeSession);
// orderForAdmin
orderRoute.post("/list", adminAuth, getAllOrders);
orderRoute.post("/updateStatus", adminAuth, updateOrderStatus);

export default orderRoute;
