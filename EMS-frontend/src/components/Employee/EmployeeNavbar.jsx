import React, { useContext, useEffect } from "react";
import { EmployeeContext } from "../../context/EmployeeContext";
import DarkModeToggler from "../common/DarkModeToggler";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const EmployeeNavbar = () => {
  const { profile, getMyProfile } = useContext(EmployeeContext);
  const { toggleSidebar } = useContext(AdminContext);

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <div
      className="fixed top-0 py-4 px-4 w-full flex items-center justify-between gap-3 sm:px-10 border-b z-40 bg-white drop-shadow-md
     dark:bg-[#1a1a1a] dark:border-[#535353] cursor-pointer sm:left-[8rem] md:left-[19.6rem]  sm:w-[calc(100%-8rem)] md:w-[calc(100%-19.6rem)]"
    >
      <div>
        {" "}
        <button
          onClick={toggleSidebar}
          className=" block sm:hidden text-white p-2 rounded-full"
        >
          <i className="ri-menu-3-line text-2xl text-neutral-900 dark:text-white"></i>{" "}
        </button>
      </div>

      <div className="flex justify-end items-center gap-2">
        <div className="flex items-center justify-between gap-3">
          <DarkModeToggler />
          <i className="ri-notification-3-fill font-semibold text-xl text-emerald-800 dark:text-emerald-500"></i>
          <div className="flex gap-2 p-2">
            <div className="w-12 h-12 rounded-full border-[3px] border-green-600">
              <img
                src={profile?.image || assets.uploadImage}
                alt=""
                className="w-full h-full rounded-full"
              />
            </div>

            <div className="hidden lg:flex flex-col gap-1">
              <h1 className="text-base font-normal text-neutral-900 dark:text-white">
                {profile
                  ? `${profile.fullName.firstName} ${profile.fullName.lastName}`
                  : "Employee Name"}
              </h1>
              <p className="text-sm font-light text-neutral-800 dark:text-white">
                Employee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeNavbar;
