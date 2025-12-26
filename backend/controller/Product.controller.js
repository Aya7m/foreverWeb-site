import { v2 as cloudinary } from "cloudinary";

import { Product } from "../models/product.model.js";
// add product
// export const addProduct = async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       sizes,
//       category,
//       subCategory,
//       bestSeller,
//     } = req.body;

//     const image1 = req.files.image1 && req.files.image1[0];
//     const image2 = req.files.image2 && req.files.image2[0];
//     const image3 = req.files.image3 && req.files.image3[0];
//     const image4 = req.files.image4 && req.files.image4[0];

//     const images = [image1, image2, image3, image4].filter(
//       (item) => item !== undefined
//     );
//     let imgUrl = await Promise.all(
//       images.map(async (item) => {
//         const base64Image = `data:${
//           item.mimetype
//         };base64,${item.buffer.toString("base64")}`;

//         const result = await cloudinary.uploader.upload(base64Image, {
//           folder: "products",
//         });

//         return result.secure_url;
//       })
//     );

//     const productData = {
//       name,
//       description,
//       price: Number(price),
//       category,
//       subCategory,
//       bestSeller: Boolean(bestSeller),
//       sizes: JSON.parse(sizes),
//       image: imgUrl,
//       date: Date.now(),
//     };

//     const product = new Product(productData);
//     await product.save();
//     res.status(201).json({ success: true, message: "Product Added" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };


export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      sizes,
      category,
      subCategory,
      bestSeller,
    } = req.body;

    const parsedPrice = Number(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid number",
      });
    }

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    const imgUrl = await Promise.all(
      images.map(async (item) => {
        const base64Image = `data:${item.mimetype};base64,${item.buffer.toString(
          "base64"
        )}`;

        const result = await cloudinary.uploader.upload(base64Image, {
          folder: "products",
        });

        return result.secure_url;
      })
    );

    const product = new Product({
      name,
      description,
      price: parsedPrice,
      category,
      subCategory,
      bestSeller: Boolean(bestSeller),
      sizes: JSON.parse(sizes),
      image: imgUrl,
      date: Date.now(),
    });

    await product.save();

    res.status(201).json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// list product
export const listProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(201).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// remove product
export const removeProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.id);
    res
      .status(201)
      .json({ success: true, message: "Product Delete Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// single product
export const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    res
      .status(201)
      .json({ success: true, message: "Product Delete Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
