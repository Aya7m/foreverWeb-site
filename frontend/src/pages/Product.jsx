import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelateProduct from "../components/RelateProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, cartItems,setCartItems,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [selectSize, setSelectSize] = useState("");

  useEffect(() => {
    if (!products || products.length === 0) return;

    const product = products.find(
      (item) => String(item._id) === String(productId)
    );

    console.log("products", products);
    console.log("productId", productId);
    console.log("found product", product);

    setProductData(product || null);
    setImage(product.image[0]);
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product image */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 sm:w-[30%] w-full">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className="w-full  cursor-pointer object-cover"
              />
            ))}
          </div>

          <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4">
            <img src={image} alt="" className="object-cover gap-4" />
          </div>
        </div>

        <div className="flex-1 flex-col sm:flex-row">
          <p className="text-2xl font-medium text-[#ED985F] mb-3">
            {productData.name}
          </p>
          <p className="text-slate-500">{productData.description}</p>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="font-bold my-3">
            {productData.price} {currency}
          </p>

          <div className="flex-col">
            <p className="mb-2">Select Size</p>
            <div className="space-x-4">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSelectSize(item)}
                  className={`border px-4 py-2 cursor-pointer space-x-3 bg-gray-100 ${
                    item === selectSize ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,selectSize)} className="px-4 py-2 bg-[#ED985F] text-white active:bg-orange-300 my-5 mb-6">
            Add To Cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-slate-500 text-sm flex-col my-5">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* description and rate */}
      <div className="mt-20 gap-5 mb-12">
        <div className="flex">
          <p className="border border-slate-300 px-5 py-2 text-sm">
            Description
          </p>
          <p className="border border-slate-300 px-5 py-2 text-sm">
            Reviews(12)
          </p>
        </div>
        <div className="flex flex-col text-slate-500 text-sm border border-slate-300 px-6 py-6 gap-5">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>
      <RelateProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
