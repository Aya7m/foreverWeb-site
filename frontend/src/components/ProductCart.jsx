import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductCart = ({ product }) => {
  const { currency } = useContext(ShopContext);
  return (
    <div className="group my-5">
      <div className="group-hover:scale-105 transition-all duration-300">
        {product.image && (
          <Link to={`/product/${product._id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="rounded-l-lg"
            />
            <p>{product.name.slice(0, 30)}</p>
            <p>
              {product.price} {currency}
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductCart;
