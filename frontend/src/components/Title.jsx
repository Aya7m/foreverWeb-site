import React from "react";

const Title = ({ text, description, category }) => {
  return (
    <div className="flex flex-col items-center justify-center my-6 mt-5">
      <div className="flex items-center gap-5">
        <h2 className="text-3xl font-semibold text-center">
          {text}
          <span className="text-[#ED985F]"> {category}</span>
        </h2>
        <p className="w-8 md:w-11 h-[3px] bg-[#001F3D]"></p>
      </div>

      <p className="text-center text-gray-500 mt-2">{description}</p>
    </div>
  );
};

export default Title;
