import React from "react";

const DashboardHeader = () => {
  return (
    <div className="flex items-end justify-between">
      <h1 className="text-2xl text-zinc-900 font-medium">
        Hello <br />
        <span className="text-3xl text-emerald-900 font-semibold">
          username👋{" "}
        </span>{" "}
      </h1>
      <button className="bg-red-600 text-xl font-light text-white px-6 py-2 rounded-sm">
        {" "}
        Logout
      </button>
    </div>
  );
};

export default DashboardHeader;
