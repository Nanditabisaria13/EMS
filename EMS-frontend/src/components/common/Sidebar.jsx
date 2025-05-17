import React, { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { EmployeeContext } from "../../context/EmployeeContext";

const Sidebar = () => {
  const { aToken, setAToken, isSidebarOpen, toggleSidebar } =
    useContext(AdminContext);
  const { token, setToken } = useContext(EmployeeContext);
  const navigate = useNavigate();
  const location = useLocation(); 

  const logout = () => {
    localStorage.removeItem("aToken");
    setAToken(null);
    navigate("/");
  };

  const employeeLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };
   
    // Function to check if current path is related to "Employees"
    const isEmployeePageActive = () => {
      return (
        location.pathname === "/all-employees" ||
        location.pathname === "/add-employee" ||
        location.pathname.startsWith("/employee") 
      );
    };
  
    // Function to check if current path is related to "Task Board"
    const isTaskBoardPageActive = () => {
      return (
        location.pathname === "/task-board" ||
        location.pathname.startsWith("/get-employee-tasks") 
      );
    };

  return (
  
    <div
      className={`fixed top-0 left-0 min-h-screen py-6 px-10 sm:px-3 border-r border-zinc-300 bg-white drop-shadow-md  sm:flex flex-col gap-3 
       dark:bg-[#1a1a1a]  dark:border-[#535353]  cursor-pointer z-50   transform ${
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } sm:translate-x-0 transition-all duration-300`} 
    >
      <div className="logo flex items-start justify-between">
        <h1 className="text-emerald-600 px-3 dark:text-emerald-500 font-semibold text-2xl sm:text-3xl">
          E.M.S.
        </h1>
        <i
          onClick={toggleSidebar}
          className="ri-close-fill text-2xl dark:text-white sm:hidden"
        ></i>
      </div>

      {aToken && (
        <ul className="mt-5">
          <NavLink
            to="/admin-dashboard"
            className={({
              isActive,
            }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 w-fit md:min-w-72 cursor-pointer mt-3 
          ${
            isActive
              ? "bg-emerald-500 rounded-tl-sm rounded-bl-sm rounded-tr-full rounded-br-full border-primary text-white"
              : ""
          }`}
          >
            <i className="ri-dashboard-fill text-xl font-semibold"></i>
            <p className="block sm:hidden md:block text-2xl font-medium">
              Dashboard
            </p>
          </NavLink>

          <NavLink
            to="/all-employees"
            className={({
              isActive,
            }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 w-fit md:min-w-72 cursor-pointer
                 ${
                  isEmployeePageActive() ||  isActive
                     ? "bg-emerald-500 rounded-tl-sm rounded-bl-sm rounded-tr-full rounded-br-full border-primary text-white"
                     : ""
                 }`}
          >
            <i className="ri-group-fill text-xl font-semibold "></i>
            <p className="block sm:hidden md:block text-2xl font-medium">
              Employees
            </p>
          </NavLink>

          <NavLink
            to="/task-board"
            className={({
              isActive,
            }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 w-fit md:min-w-72 cursor-pointer
                 ${
                  isTaskBoardPageActive() ||  isActive
                     ? "bg-emerald-500  rounded-tl-sm rounded-bl-sm rounded-tr-full rounded-br-full border-primary text-white"
                     : ""
                 }`}
          >
            <i className="ri-file-cloud-fill text-xl font-semibold "></i>
            <p className="block sm:hidden md:block text-2xl font-medium">
              Task Board
            </p>
          </NavLink>

          <NavLink
            to="/departments"
            className={({
               isActive,
            }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 w-fit md:min-w-72 cursor-pointer
                 ${
                  isActive
                     ? "bg-emerald-500 rounded-tl-sm rounded-bl-sm rounded-tr-full rounded-br-full border-primary text-white"
                     : ""
                 }`}
          >
            <i className="ri-layout-grid-fill text-xl font-semibold "></i>
            <p className="block sm:hidden md:block text-2xl font-medium">
              Departments
            </p>
          </NavLink>

          <NavLink
            to="/leave"
            className={({
              isActive,
            }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 w-fit md:min-w-72 cursor-pointer
                 ${
                   isActive
                     ? "bg-emerald-500 rounded-tl-sm rounded-bl-sm rounded-tr-full rounded-br-full border-primary text-white"
                     : ""
                 }`}
          >
            <i className="ri-crosshair-2-line text-xl font-semibold "></i>
            <p className="block sm:hidden md:block text-2xl font-medium">
              Leave Stats
            </p>
          </NavLink>

          <div className="h-[2px] w-11/12 sm:w-14 md:w-11/12 bg-zinc-900 dark:bg-white m-3"></div>

          <NavLink
            to="/admin-profile"
            className={({
              isActive,
            }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 w-fit md:min-w-72 cursor-pointer
                 ${
                   isActive
                     ? "bg-emerald-500  rounded-tl-sm rounded-bl-sm rounded-tr-full rounded-br-full border-primary text-white"
                     : ""
                 }`}
          >
            <i className="ri-user-fill text-xl font-semibold "></i>
            <p className="block sm:hidden md:block text-2xl font-medium">
              Get Profile
            </p>
          </NavLink>

          <NavLink
            onClick={logout}
            to="/"
            className={({
              isActive,
            }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 w-fit md:min-w-72 cursor-pointer
                 ${
                   isActive
                     ? " rounded-tl-sm rounded-bl-sm rounded-tr-full rounded-br-full border-primary text-white"
                     : ""
                 }`}
          >
            <i className="ri-logout-box-r-line text-xl font-semibold "></i>
            <p className="block sm:hidden md:block text-2xl font-medium">
              Logout
            </p>
          </NavLink>
        </ul>
      )}

      {token && (
        <ul className="mt-5">
          <NavLink
            to="/employee-dashboard"
            className={({
              isActive,
            }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 w-fit md:min-w-72 cursor-pointer mt-3
          ${
            isActive
              ? "bg-emerald-500  rounded-tl-sm rounded-bl-sm rounded-tr-full rounded-br-full border-primary text-white"
              : ""
          }`}
          >
            <i className="ri-dashboard-fill text-xl font-semibold "></i>
            <p className="block sm:hidden md:block text-2xl font-medium">
              Dashboard
            </p>
          </NavLink>

          <NavLink
            to="/employee-tasks"
            className={({
              isActive,
            }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 w-fit md:min-w-72 cursor-pointer
                 ${
                  isActive
                     ? "bg-emerald-500 rounded-tl-sm rounded-bl-sm rounded-tr-full rounded-br-full border-primary text-white"
                     : ""
                 }`}
          >
            <i className="ri-group-fill text-xl font-semibold "></i>
            <p className="block sm:hidden md:block text-2xl font-medium">
              Task Board
            </p>
          </NavLink>

          <NavLink
            to="/employee-leaves"
            className={({
              isActive,
            }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 w-fit md:min-w-72 cursor-pointer
                 ${
                   isActive
                     ? "bg-emerald-500 rounded-tl-sm rounded-bl-sm rounded-tr-full rounded-br-full border-primary text-white"
                     : ""
                 }`}
          >
            <i className="ri-crosshair-2-line text-xl font-semibold "></i>
            <p className="block sm:hidden md:block text-2xl font-medium">
              Leave Stats
            </p>
          </NavLink>

          <NavLink
            to="/employee-profile"
            className={({
              isActive,
            }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 w-fit md:min-w-72 cursor-pointer
                 ${
                   isActive
                     ? "bg-emerald-500 rounded-tl-sm rounded-bl-sm rounded-tr-full rounded-br-full border-primary text-white"
                     : ""
                 }`}
          >
            <i className="ri-user-fill text-xl font-semibold "></i>
            <p className="block sm:hidden md:block text-2xl font-medium">
              My Profile
            </p>
          </NavLink>

          <NavLink
            onClick={employeeLogout}
            to="/"
            className={({
              isActive,
            }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 w-fit md:min-w-72 cursor-pointer
                 ${
                   isActive
                     ? "rounded-tl-sm rounded-bl-sm rounded-tr-full rounded-br-full border-primary text-white"
                     : ""
                 }`}
          >
            <i className="ri-logout-box-r-line text-xl font-semibold "></i>
            <p className="block sm:hidden md:block text-2xl font-medium">
              Logout
            </p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
