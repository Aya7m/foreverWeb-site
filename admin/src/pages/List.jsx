import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { backend_url } from "../App";
import { toast } from "react-hot-toast";

const List = ({ token }) => {
  const [list, setlist] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        backend_url + "/api/product/list-products"
      );
      console.log(response.data);
      if (response.data.success) {
        setlist(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  console.log(list);

const removeProduct = async (id) => {
  try {
    const response = await axios.delete(
      backend_url + "/api/product/remove-product",
      {
        headers: {
          token,
        },
        data: { id }, // <--- هنا يبعت الـ id في body
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      fetchData();
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="font-semibold text-2xl mb-4">Product List</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 sm:px-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2 hidden sm:table-cell">
                Category
              </th>
              <th className="border border-gray-300 px-4 py-2 hidden sm:table-cell">
                SubCategory
              </th>
              <th className="border border-gray-300 px-4 py-2 hidden sm:table-cell">
                Best Seller
              </th>
              <th className="border border-gray-300 px-4 py-2 hidden sm:table-cell">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((product) => (
              <tr key={product._id}>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    className="w-16 h-16 object-cover"
                    src={product.image[0]}
                    alt=""
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${product.price}
                </td>
                <td className="border border-gray-300 px-4 py-2 hidden sm:table-cell">
                  {product.category}
                </td>
                <td className="border border-gray-300 px-4 py-2 hidden sm:table-cell">
                  {product.subCategory}
                </td>
                <td className="border border-gray-300 px-4 py-2 hidden sm:table-cell">
                  {product.bestSeller ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-4 py-2 hidden sm:table-cell">
                  <p
                    onClick={() => removeProduct(product._id)}
                    className="text-center text-red-600 hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    X
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
