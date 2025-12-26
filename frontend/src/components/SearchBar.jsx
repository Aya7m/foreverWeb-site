import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const location = useLocation();
  const [visable, setVisable] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisable(true);
    } else {
      setVisable(false);
    }
  },[location.pathname]);
  return showSearch && visable ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-300 px-5 py-2 my-5 mx-5 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="outline-none flex-1 bg-inherit text-sm"
        />
        <img src={assets.search_icon} alt="" className="w-3" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        src={assets.cross_icon}
        alt=""
        className="inline cursor-pointer w-3"
      />
    </div>
  ) : null;
};

export default SearchBar;
