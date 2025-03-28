import React, { useContext, useEffect, useState } from "react";
import DarkModeToggler from "../common/DarkModeToggler";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const AdminNavbar = () => {
  const {
    toggleSidebar,
    handleSearchChange,
    setSearchResults,
    getAdminProfile,
    adminProfile,
    aToken,
  } = useContext(AdminContext);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    setOpenSearch((prevState) => !prevState);
  };

  useEffect(() => {
    if (aToken && !adminProfile) {
      getAdminProfile();
      console.log(adminProfile);
    }
  }, [aToken, adminProfile, getAdminProfile]);

  const handleSearchRequest = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setSearchResults([]);
      return;
    }

    handleSearchChange(searchTerm);
  };

  return (
    <div className="sticky top-0 left-0 z-40">
      <div
        className="py-4 md:px-2 lg:px-4 w-full flex items-center justify-between sm:px-10 border-b  bg-white drop-shadow-md
                     dark:bg-[#1a1a1A] dark:border-[#535353] cursor-pointer"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            {" "}
            <button
              onClick={toggleSidebar}
              className=" block sm:hidden text-white p-2 rounded-full"
            >
              <i className="ri-menu-3-line text-2xl text-neutral-900 dark:text-white"></i>{" "}
            </button>
          </div>

          <div className="py-2 px-4 border border-zinc-400 dark:border-[#535353] rounded-xl flex items-start gap-2 relative sm:w-64 lg:w-full">
            <i
              className="ri-search-line font-medium text-xl text-zinc-800 dark:text-zinc-50"
              onClick={handleSearch}
            ></i>
            <input
              type="text"
              placeholder="search employees..."
              className="w-full hidden sm:block bg-transparent text-slate-900 outline-0  dark:text-slate-50 "
              value={searchTerm}
              onChange={(e) => handleSearchRequest(e)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <DarkModeToggler />
          <i className="ri-notification-3-fill font-semibold text-xl dark:text-gray-200"></i>
          <div className="flex gap-2 p-2">
            <div className="w-12 h-12 rounded-full border-[3px] border-green-600">
              <img
                src={adminProfile?.image || assets.uploadImage}
                alt=""
                className="w-full h-full rounded-full"
              />
            </div>

            <div className="hidden lg:flex flex-col gap-1">
              <h1 className="text-base font-normal text-neutral-900 dark:text-white">
                {adminProfile
                  ? `${adminProfile.fullName.firstName} ${adminProfile.fullName.lastName}`
                  : "Admin Name"}
              </h1>
              <p className="text-sm font-light text-neutral-800 dark:text-white">
                Admin
              </p>
            </div>
          </div>
        </div>
      </div>

      {openSearch && (
        <div className="w-full py-4 px-6 bg-white shadow-md dark:bg-[#1a1a1a] dark:border-[#535353] sm:hidden ">
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full p-2 border  border-zinc-400 dark:border-[#535353] rounded-xl bg-transparent text-slate-900 dark:text-slate-50"
            value={searchTerm}
            onChange={(e) => handleSearchRequest(e)}
          />
        </div>
      )}
    </div>
  );
};

export default AdminNavbar;
