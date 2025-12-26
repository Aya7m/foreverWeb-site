import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductCart from "./ProductCart";

const BestSeller = () => {
  const { products } = useContext(ShopContext);

  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
   const bestProduct=products.filter((product)=>product.bestSeller===true);
   setBestSeller(bestProduct.slice(0,5));
  }, [products]);
 

  return (
    <div>
      <Title
        text="Best"
        category="Seller"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 space-y-5">
        {bestSeller.map((product, index) => (
          <div>
            <ProductCart key={index} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
