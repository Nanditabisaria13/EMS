import React, { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

const DarkModeToggler = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-1 sm:p-2 text-base sm:text-xl rounded-full ${
        darkMode ? "bg-gray-800 text-white" : "bg-slate-200 text-gray-800"
      }`}
    >
      {darkMode ? "🌙" : "🌞"}
    </button>
  );
};

export default DarkModeToggler;
