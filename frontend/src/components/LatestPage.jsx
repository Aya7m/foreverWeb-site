import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import ProductCart from "./ProductCart";

const LatestPage = () => {
  const { products } = useContext(ShopContext);
  console.log(products);

  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, [products]);
  return (
    <div className="mt-7">
      <Title
        text="Latest"
        category="Collection"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the."
      />

      {/* GRID HERE ✅ */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProduct.map((product, index) => (
          <ProductCart key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LatestPage;
