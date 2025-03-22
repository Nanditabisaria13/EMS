import React, { createContext, useState, useEffect } from "react";

export const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Retrieve the dark mode preference from localStorage when the app loads
  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newDarkMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newDarkMode)); // Save preference to localStorage
      return newDarkMode;
    });
  };

  const value = {
    darkMode,
    toggleDarkMode,
  };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
