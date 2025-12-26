import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductCart from "./ProductCart";

const RelateProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relateProduct, setRelateProduct] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = [...products];
      productCopy = productCopy.filter((item) => category === item.category);
      productCopy = productCopy.filter(
        (item) => subCategory === item.subCategory
      );

      setRelateProduct(productCopy);
    }
  }, [products, category, subCategory]);
  console.log(relateProduct);

  return (
    relateProduct && (
      <div className="mt-12 my-24">
        <Title text="Relative" category="Products" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-x-5">
          {relateProduct.slice(0, 6).map((item, index) => (
            <ProductCart product={item} key={index} />
          ))}
        </div>
      </div>
    )
  );
};

export default RelateProduct;
