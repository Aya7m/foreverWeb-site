import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div className="flex-col sm:flex-row border border-gray-200 mt-5">
      <div className="flex items-center justify-center">
        <div className="w-full sm:w-2/3 flex items-center justify-center">
          <div className="text-[#ED985F]">
            <div className="flex items-center gap-2">
              <p className="w-8 md:w-11 h-[3px] bg-[#001F3D]"></p>
              <p className="font-semibold">our bestsellers</p>
            </div>
            <h1 className="text-4xl my-2 font-bold lg:text-5xl sm:py-3">Latest Arrivals</h1>
            <div className="flex items-center gap-2">
              <p className="font-light">Shop Now</p>
              <p className="w-8 md:w-11 h-[4px] bg-[#001F3D]"></p>
            </div>
          </div>
        </div>
        <div className="w-full h-[600px] sm:w-1/3">
          <img
            src={assets.he_img}
            alt="hero"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
