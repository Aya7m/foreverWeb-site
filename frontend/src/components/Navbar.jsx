import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  const { setShowSearch, getCartCount, token, setToken, setCartItems } =
    useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-between gap-5 py-3 mt-3 border-b border-slate-100">
      <Link to={"/"}>
        <h2 className="text-[#001F3D] font-bold text-2xl md:text-4xl">
          Every-Thing<span className="text-[#ED985F]">.</span>
        </h2>
      </Link>
      <div className="flex items-center justify-between gap-6">
        <div className="hidden sm:flex space-x-3">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>Home</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink
            to="/collection"
            className="flex flex-col items-center gap-1"
          >
            <p>Collection</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>About</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>Contact</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </div>

        <div className="flex items-center gap-6">
          <img
            src={assets.search_icon}
            alt="search"
            className="w-5 cursor-pointer"
            onClick={() => setShowSearch(true)}
          />
          <div className="group relative">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              src={assets.profile_icon}
              alt="profile"
              className="w-5 cursor-pointer"
            />

            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  <p className="cursor-pointer hover:text-black">MyProfile</p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-black"
                  >
                    Orders
                  </p>

                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="" className="w-5 min-w-5" />
          <p className="absolute -top-5 left-3 bg-[#ED985F] text-white rounded-full px-2 py-0.5 text-sm">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setMobileMenu(true)}
          src={assets.menu_icon}
          alt="menu"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* show mobile menu */}

      {mobileMenu && (
        <div className="fixed inset-0 bg-white z-50 transition-all">
          <div className="flex flex-col text-[#ED985F]">
            <div
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-4 p-3 cursor-pointer"
            >
              <img
                src={assets.dropdown_icon}
                alt=""
                className="h-5 rotate-180"
              />
              <p className="font-bold">Back</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-6 mt-12">
              <NavLink to="/" onClick={() => setMobileMenu(false)}>
                Home
              </NavLink>
              <NavLink to="/collection" onClick={() => setMobileMenu(false)}>
                Collection
              </NavLink>
              <NavLink to="/about" onClick={() => setMobileMenu(false)}>
                About
              </NavLink>
              <NavLink to="/contact" onClick={() => setMobileMenu(false)}>
                Contact
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
