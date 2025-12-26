import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewLitter from "../components/NewLitter";

const Contant = () => {
  return (
    <div className="">
      <Title text="Contact" category={"Us"} />
      <div className="flex flex-col items-center justify-center sm:flex-row gap-12">
        <img
          src={assets.contact_img}
          alt=""
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col gap-4">
          <p className="text-xl font-medium text-gray-800">Our Store</p>

          <p className="w-2/3">Maghagha, Minia, Egypt</p>
          <div className="flex flex-col gap-3">
            <p>Tel: (002) 1558611828</p>
            <p>Email: yyoyo6987@gmail.com</p>
          </div>
        </div>
      </div>
      <NewLitter />
    </div>
  );
};

export default Contant;
