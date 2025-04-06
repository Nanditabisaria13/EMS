import React, { useContext, useEffect } from "react";
import Sidebar from "../../components/common/Sidebar";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import CreateTask from "../../components/Admin/CreateTask";
import AllTasks from "../../components/Admin/AllTasks";
import { AdminContext } from "../../context/AdminContext";

const TaskBoard = () => {
  const { allEmployees, getAllEmployees, aToken } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllEmployees();
    }
  }, []);
  return (
    <div className="w-full flex items-start">
      <Sidebar />
      <div className="w-full sm:ml-[8rem] md:ml-[19.6rem] overflow-hidden">
        <AdminNavbar />
        <div className="px-3 py-3 pt-28 w-full bg-slate-50 dark:bg-[#101013] dark:text-white">
          <h1 className="font-medium text-2xl text-neutral-800 dark:text-white mt-2">
            Task Board
          </h1>
          <div className="mt-5">
            <CreateTask />

            <AllTasks allEmployees={allEmployees} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
