import { Router } from "express";
import { userAuth } from "../middleware/userAuth.js";
import { adToCart, getUserCart, updateCart } from "../controller/Cart.controller.js";

const cartRouter=Router()
cartRouter.post('/add',userAuth,adToCart)
cartRouter.post('/update',userAuth,updateCart)
cartRouter.post('/',userAuth,getUserCart)
export default cartRouter