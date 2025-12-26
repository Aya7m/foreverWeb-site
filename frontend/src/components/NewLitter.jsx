import React from "react";

const NewLitter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
   <div className="my-24">

     <div className="flex-col items-center justify-center  text-center mt-12">
      <p className="text-2xl font-semibold space-y-2">
        Subscribe now & get 20% off
      </p>
      <p className="text-slate-500">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.{" "}
      </p>
      <form
        onSubmit={handleSubmit}
        className="sm:w-1/2 mx-auto flex items-center gap-3 my-6 border pl-3"
      >
        <input
          type="email"
          placeholder="Enter Your Email"
          className="w-full flex-1 outline-none"
        />
        <button type="submit" className="px-10 py-2 text-white bg-black">
          Subscripe
        </button>
      </form>
    </div>
   </div>
  );
};

export default NewLitter;
