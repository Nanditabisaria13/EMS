import React from "react";
import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap rounded-lg px-5 py-3 w-full h-full items-center justify-end">
      {/* Left Side */}
      <div className="md:w-1/2 flex flex-col gap-4 items-start justify-center m-auto py-10 md:pt-[10vw] ">
        <h2
          className="text-emerald-900 font-semibold text-4xl sm:text-6xl text-center md:text-4xl lg:text-6xl md:text-left leading-tight
                           dark:text-emerald-400"
        >
          Experience Seamless Employee Management System With Our Integreted
          Dashboard{" "}
        </h2>
        <p className="text-neutral-700 font-medium text-lg dark:text-neutral-200">
          E.M.S. is all-in-one employee management system platform that
          simplifies employees work authorization,work status, categories with
          its intiutive dashboards. Simplify complexities and elevate
          organizational success with our employee management dashboards.
        </p>
      </div>

      {/* Right Side */}
      <div className="md:w-2/5 relative m-auto">
        <img src={assets.emsImg} alt="" />
      </div>
    </div>
  );
};

export default Header;
