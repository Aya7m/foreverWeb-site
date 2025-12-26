import { Router } from "express";
import { loginAdmin, loginUser, registerUser } from "../controller/User.controller.js";

const userRoute = Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.post("/admin", loginAdmin);

export default userRoute;
