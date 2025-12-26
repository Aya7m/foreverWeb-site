import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-sm">
        <NavLink
          to="/add"
          className={`flex items-center gap-4 border border-slate-200 p-2 pl-[20%]`}
        >
          <img src={assets.add_icon} alt="" className="w-5" />
          <p className="hidden md:block">Add Product</p>
        </NavLink>

        <NavLink
          to="/list"
          className={`flex items-center gap-4 border border-slate-200 p-2 pl-[20%]`}
        >
          <img src={assets.order_icon} alt="" className="w-5" />
          <p className="hidden md:block">List Product</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={`flex items-center gap-4 border border-slate-200 p-2 pl-[20%]`}
        >
          <img src={assets.order_icon} alt="" className="w-5" />
          <p className="hidden md:block">Order Product</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
