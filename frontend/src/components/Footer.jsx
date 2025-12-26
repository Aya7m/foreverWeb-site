import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#001F3D] text-[#ED985F] mt-20">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        
        <p className="text-sm text-center sm:text-left">
          © 2025 yoyo.dev. All rights reserved.
        </p>

        <p className="text-sm">
          Built with ❤️ by{" "}
          <span className="text-slate-300 font-semibold">Aya77</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
