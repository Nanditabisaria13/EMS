import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

const AllEmployees = () => {
  const navigate = useNavigate();
  const {
    allEmployees,
    getAllEmployees,
    aToken,
    getSpecificEmployee,
    filterEmployees,
    filteredEmployees,
    searchResults,
  } = useContext(AdminContext);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  const toggleFilter = () => setFilterVisible(!filterVisible);

  useEffect(() => {
    if (aToken) {
      getAllEmployees();
    }
  }, []);

  const handleFilterSelect = (status) => {
    filterEmployees(status);
    setSelectedFilter(status);
    setFilterVisible(false);
  };

  const handleOnClick = (employeeId) => {
    getSpecificEmployee(employeeId);
    navigate(`/employee-profile/${employeeId}`);
  };

  return (
    <div className="w-full flex">
      <Sidebar />
      <div className="w-full sm:ml-[10rem] md:ml-[19.6rem]">
        <AdminNavbar setFilterVisible={setFilterVisible} />
        <div className="p-4 relative flex flex-col gap-8">
          <h1 className="font-medium text-2xl text-neutral-800 dark:text-white">
            All Employees
          </h1>

          <div className="w-full flex items-start justify-between p-2">
            <div className="flex items-center gap-2 bg-emerald-700 dark:bg-emerald-500 text-white px-4 py-3 rounded-lg ">
              <h1 className="hidden sm:block text-lg font-normal">Filter:</h1>
              <i
                onClick={toggleFilter}
                className="ri-equalizer-line text-xl font-semibold"
              ></i>
            </div>
            <div
              className="bg-emerald-700 text-white border-2 border-emerald-900 dark:bg-emerald-500 px-4 py-3 flex items-center gap-2
            rounded-lg "
            >
              <i className="ri-add-line text-xl font-medium"></i>
              <button
                className="text-lg font-normal"
                onClick={() => navigate("/add-employee")}
              >
                Add New Employee
              </button>
            </div>
          </div>

          {filterVisible && (
            <div
              className="absolute top-36 left-20 bg-white dark:bg-[#1a1a1a] dark:border-[#535353] dark:text-white shadow-md border rounded-lg w-48
          p-2 z-10"
            >
              <h1 className="text-lg font-normal p-2 cursor-pointer">
                Filter by:
              </h1>
              <div
                className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-400"
                onClick={() => handleFilterSelect("active")}
              >
                Active Tasks
              </div>
              <div
                className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-400"
                onClick={() => handleFilterSelect("completed")}
              >
                Completed Tasks{" "}
              </div>
              <div
                className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-400"
                onClick={() => handleFilterSelect("failed")}
              >
                Failed Tasks{" "}
              </div>
            </div>
          )}

          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full pt-3 md:px-1 ">
            {allEmployees ? (
              searchResults.length > 0 ? (
                searchResults.map((employee, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 gap-2 bg-white drop-shadow-md rounded-xl border
    border-zinc-300 transition-all hover:scale-105 duration-500 dark:bg-[#1a1a1a] dark:border-[#535353]"
                  >
                    <img
                      src={employee.image}
                      className="w-20 h-20 rounded-full"
                      alt=""
                    />
                    <div className="flex flex-col">
                      <h1 className="text-3xl md:text-lg lg:text-xl text-emerald-700 font-medium dark:text-emerald-500">
                        {employee.fullName.firstName}{" "}
                        {employee.fullName.lastName}
                      </h1>
                      <p className="text-lg md:text-sm lg:text-base font-normal text-gray-600 dark:text-gray-100">
                        {employee.position}
                      </p>
                    </div>
                    <button onClick={() => handleOnClick(employee._id)}>
                      <i className="ri-user-fill text-2xl md:text-xl text-zinc-800 dark:text-zinc-200 font-semibold "></i>
                    </button>
                  </div>
                ))
              ) : (
                (filteredEmployees.length > 0
                  ? filteredEmployees
                  : allEmployees
                ).map((employee, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 gap-2 bg-white drop-shadow-md rounded-xl border
    border-zinc-300 transition-all hover:scale-105 duration-500 dark:bg-[#1a1a1a] dark:border-[#535353]"
                  >
                    <img
                      src={employee.image}
                      className="w-20 h-20 rounded-full"
                      alt=""
                    />
                    <div className="flex flex-col">
                      <h1 className="text-xl md:text-lg lg:text-xl text-emerald-700 font-medium dark:text-emerald-500">
                        {employee.fullName.firstName}{" "}
                        {employee.fullName.lastName}
                      </h1>
                      <p className="text-lg md:text-sm lg:text-base font-normal text-gray-600 dark:text-gray-100">
                        {employee.position}
                      </p>
                    </div>
                    <button onClick={() => handleOnClick(employee._id)}>
                      <i className="ri-user-fill text-2xl md:text-xl text-zinc-800 dark:text-zinc-200 font-semibold "></i>
                    </button>
                  </div>
                ))
              )
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEmployees;
