import React from "react";
import { assets } from "../../assets/assets";

const Quality = () => {
  return (
    <div className="w-full p-5 mt-16 xl:mt-20 py-20 flex flex-col md:flex-row items-center justify-center gap-6 ">
      <div
        className="w-9/12 lg:w-[30%] flex flex-col items-center justify-center gap-4 rounded-xl p-7 bg-white drop-shadow-md
        hover:scale-105 transition-all duration-500 border border-zinc-300 dark:bg-[#1a1a1a] dark:border-[#535353]"
      >
        <img src={assets.qualityIcon1} className="w-16" alt="" />
        <h1 className="text-emerald-900 font-semibold text-2xl dark:text-emerald-400">
          Stay informed
        </h1>
        <p className="text-neutral-600 font-medium dark:text-neutral-200">
          Manage all your resources efficiently to save time, avoid rework, and
          leave your team more time for creative work
        </p>
      </div>

      <div
        className="w-9/12 lg:w-[30%]  flex flex-col items-center justify-center gap-4 rounded-xl p-7 bg-white drop-shadow-md
        hover:scale-105 transition-all duration-500 border border-zinc-300 dark:bg-[#1a1a1a] dark:border-[#535353]"
      >
        <img src={assets.qualityIcon2} className="w-16" alt="" />
        <h1 className="text-emerald-900 font-semibold text-2xl dark:text-emerald-400">
          Time And Leave
        </h1>
        <p className="text-neutral-600 font-medium dark:text-neutral-200">
          Track employee leaves data effortlessly and make task allocation in
          one place, keep the track of employees's task and leave details{" "}
        </p>
      </div>

      <div
        className="w-9/12 lg:w-[30%] flex flex-col items-center justify-center gap-4 rounded-xl p-7 bg-white drop-shadow-md
        hover:scale-105 transition-all duration-500 border border-zinc-300 dark:bg-[#1a1a1a] dark:border-[#535353]"
      >
        <img src={assets.qualityIcon3} className="w-16" alt="" />
        <h1 className="text-emerald-900 font-semibold text-2xl dark:text-emerald-400">
          Effectiveness
        </h1>
        <p className="text-neutral-600 font-medium dark:text-neutral-200">
          Enhance work efficiently through streamlined processes,ensuring tasks
          are completed promptly and accurately{" "}
        </p>
      </div>
    </div>
  );
};

export default Quality;
