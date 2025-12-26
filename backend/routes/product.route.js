import { Router } from "express";
import upload from "../middleware/multer.js";
import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} from "../controller/Product.controller.js";
import { adminAuth } from "../middleware/adminAuth.js";

const productRouter = Router();
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

productRouter.get("/list-products", listProduct);
productRouter.delete("/remove-product", adminAuth, removeProduct);
productRouter.post("/single-product", singleProduct);
export default productRouter;
