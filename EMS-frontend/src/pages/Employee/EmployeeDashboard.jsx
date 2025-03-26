import React, { useContext, useEffect, useState } from "react";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import Sidebar from "../../components/common/Sidebar";
import { EmployeeContext } from "../../context/EmployeeContext";
import PerformanceChart from "../../components/Employee/PerformanceChart";
import LeaveChart from "../../components/Employee/LeaveChart";
import { assets } from "../../assets/assets";

const EmployeeDashboard = () => {
  const {
    employeeData,
    getEmployeeDashboard,
    token,
    leaveData,
    getEmployeeLeaveData,
  } = useContext(EmployeeContext);

  useEffect(() => {
    if (token) {
      getEmployeeDashboard();
      getEmployeeLeaveData();
    }
  }, []);

  const tasksData = {
    activeTasks: employeeData.activeTasks,
    completedTasks: employeeData.completedTasks,
    failedTasks: employeeData.failedTasks,
  };

  const leavedata = {
    pendingRequest: leaveData.filter((item) => item.status === "pending")
      .length,
    approvedRequest: leaveData.filter((item) => item.status === "approved")
      .length,
    rejectedRequest: leaveData.filter((item) => item.status === "rejected")
      .length,
  };

  return (
    <div className="w-full flex items-start">
      <Sidebar />
      <div className="w-full  sm:ml-[8.5rem] md:ml-[19.6rem] overflow-hidden cursor-pointer">
        <EmployeeNavbar />

        <div className="px-4 py-3 w-full bg-slate-50 dark:bg-[#101013]">
          <h1 className="font-medium text-2xl text-neutral-800 dark:text-white">
            Dashboard
          </h1>

          <div className="grid grid-cols-1  lg:grid-cols-2 gap-6 px-3 mt-5">
            <div
              className="mt-2 bg-white drop-shadow-md p-4 px-4 rounded-xl border border-zinc-300 flex items-center md:flex-row
          lg:flex-col xl:flex-row gap-6 dark:bg-[#1a1a1a] dark:border-[#535353]"
            >
              <div className="flex flex-col gap-2">
                <p className="font-medium text-3xl">
                  Hello,{" "}
                  <span className="text-emerald-800 dark:text-emerald-500 font-semibold text-3xl">
                    {employeeData.name}{" "}
                  </span>
                  👋{" "}
                </p>
                <p className="font-sm text-xl">
                  Welcome Back, Have a Good Day!
                </p>
              </div>
              <div className="hidden sm:block w-1/2 lg:w-[80%]  xl:w-1/2">
                <img src={assets.welcomeImage} alt="" />
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div
                className="flex flex-col gap-5 bg-white drop-shadow-md border border-zinc-300 p-4 px-4 rounded-xl w-full lg:w-80
         dark:bg-[#1a1a1a] dark:border-[#535353]"
              >
                <div className="flex justify-between">
                  <h2 className="text-lg font-medium leading-tight text-neutral-900 dark:text-white">
                    Tasks Details
                  </h2>
                  <i className="ri-file-cloud-fill font-medium text-2xl sm:text-3xl text-neutral-900 dark:text-white"></i>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <h2 className="text-base md:text-lg font-normal leading-tight text-blue-500">
                      Active Tasks
                    </h2>
                    <p className="font-medium  text-2xl sm:text-3xl text-blue-500">
                      {employeeData.activeTasks}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="text-base md:text-lg font-normal leading-tight text-green-500">
                      Completed Tasks
                    </h2>
                    <p className="font-medium  text-2xl sm:text-3xl text-green-500">
                      {employeeData.completedTasks}
                    </p>
                  </div>
                  <div className="flex justify-between ">
                    <h2 className="text-base md:text-lg font-normal leading-tight text-red-500">
                      Failed Tasks
                    </h2>
                    <p className="font-medium  text-2xl sm:text-3xl text-red-400">
                      {employeeData.failedTasks}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="flex flex-col gap-5 bg-white drop-shadow-md border border-zinc-300 p-4 px-4 rounded-xl w-full lg:w-80
          dark:bg-[#1a1a1a] dark:border-[#535353]"
              >
                <div className="flex justify-between">
                  <h2 className="text-lg font-medium leading-tight text-neutral-900 dark:text-white">
                    Leave Requests
                  </h2>
                  <i className="ri-archive-stack-fill font-medium text-2xl sm:text-3xl text-neutral-900 dark:text-white"></i>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <h2 className="text-base md:text-lg font-normal leading-tight text-blue-500">
                      Pending Requests
                    </h2>
                    <p className="font-medium  text-2xl sm:text-3xl text-blue-500">
                      {leavedata.pendingRequest}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="text-base md:text-lg font-normal leading-tight text-green-500">
                      Approved Requests
                    </h2>
                    <p className="font-medium  text-2xl sm:text-3xl text-green-500">
                      {leavedata.approvedRequest}
                    </p>
                  </div>
                  <div className="flex justify-between ">
                    <h2 className="text-base md:text-lg font-normal leading-tight text-red-500">
                      Rejected Requests
                    </h2>
                    <p className="font-medium  text-2xl sm:text-3xl text-red-400">
                      {leavedata.rejectedRequest}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 pt-4 flex flex-col md:flex-row justify-between gap-8">
            <PerformanceChart tasksData={tasksData} leavedata={leavedata} />
            <LeaveChart leavedata={leavedata} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
