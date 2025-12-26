import React from "react";
import { assets } from "../assets/admin_assets/assets";

import axios from "axios";
import { backend_url } from "../App";

import { useState } from "react";
import { toast } from "react-hot-toast";

const Add = ({ token }) => {
  const [loading, setLoading] = useState(false);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");

  const [bestSeller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);

    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestSeller", bestSeller);
    formData.append("sizes", JSON.stringify(sizes));

    image1 && formData.append("image1", image1);
    image2 && formData.append("image2", image2);
    image3 && formData.append("image3", image3);
    image4 && formData.append("image4", image4);

    setLoading(true);
    const response = await axios.post(
      backend_url + "/api/product/add",
      formData,
      {
        headers: {
          token, // <-- هنا التوكن
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      setName("");
      setDescription("");
      setPrice("");
      setImage1(false);
      setImage2(false);
      setImage3(false);
      setImage4(false);
      setSizes([]);
      setBestseller(false);
      setLoading(false);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start w-full gap-3"
    >
      <p className="mb-3">Upload Image</p>
      <div className="flex gap-2 items-center">
        <div>
          <label htmlFor="image1">
            <img
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
        </div>
        <div>
          <label htmlFor="image2">
            <img
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
        </div>
        <div>
          <label htmlFor="image3">
            <img
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
        </div>
        <div>
          <label htmlFor="image4">
            <img
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="mt-3 w-full">
        <p className="mb-1">Product Name</p>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Type Here"
          className="w-full max-w-[500px] px-3 py-2"
          required
        />
      </div>

      <div className="mt-3 w-full">
        <p className="mb-1">Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write Description Here"
          className="w-full max-w-[500px] px-3 py-2"
          required
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div>
          <p className="text-sm mb-2">Select Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-1.5"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="text-sm mb-2">Select Subcategory</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-1.5"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="text-sm mb-2">Product Price</p>
          <input
            type="Number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="25"
            className="w-full px-3 py-1.5 sm:w-[120px]"
          />
        </div>
      </div>

      <div className="mb-4 flex flex-col">
        <p className="text-sm mb-2">Product Sizes</p>
        <div className="flex items-center gap-4">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
            className={`px-3 py-1.5 border border-gray-200 cursor-pointer  ${
              sizes.includes("S") ? "bg-indigo-400 text-white" : "bg-slate-200"
            }`}
          >
            <p className="">S</p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
            className={`px-3 py-1.5 border border-gray-200 cursor-pointer  ${
              sizes.includes("M") ? "bg-indigo-400 text-white" : "bg-slate-200"
            }`}
          >
            <p>M</p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
            className={`px-3 py-1.5 border border-gray-200 cursor-pointer  ${
              sizes.includes("L") ? "bg-indigo-400 text-white" : "bg-slate-200"
            }`}
          >
            <p>L</p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
            className={`px-3 py-1.5 border border-gray-200 cursor-pointer  ${
              sizes.includes("XL") ? "bg-indigo-400 text-white" : "bg-slate-200"
            }`}
          >
            <p>Xl</p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
            className={`px-3 py-1.5 border border-gray-200 cursor-pointer  ${
              sizes.includes("XXl")
                ? "bg-indigo-400 text-white"
                : "bg-slate-200"
            }`}
          >
            <p>XXl</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          id="bestseller"
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestSeller}
        />
        <label htmlFor="bestseller" className="cursor-pointer text-sm">
          Add To Best Seller
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-500 text-sm px-6 py-3 rounded-lg w-full max-w-[500px] text-white mt-3 cursor-pointer hover:bg-indigo-600 transition-all duration-300"
      >
        {loading ? "Adding..." : "Add Product "}
      </button>
    </form>
  );
};

export default Add;
