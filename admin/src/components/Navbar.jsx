import React from "react";
import {Link} from 'react-router-dom'

const Navbar = ({setToken}) => {
  return (
   <div className="container max-w-7xl mx-auto">
     <div className="flex items-center justify-between gap-5 py-3 mt-3 border-b border-slate-100">
      <Link to={"/"}>
        <h2 className="text-[#001F3D] font-bold text-2xl md:text-4xl">
          Every-Thing<span className="text-[#ED985F]">.</span>
        </h2>
        <p className="font-semibold">Admin-Panal</p>
      </Link>
      <button onClick={()=>setToken('')} className="px-4 py-1.5 bg-slate-50 border text-[#ED985F] font-medium rounded-md cursor-pointer hover:scale-105 hover:text-[#df5f0a] transition-all duration-300">LogOut</button>
    </div>

   </div>
  );
};

export default Navbar;
