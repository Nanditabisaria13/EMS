import React, { useContext, useEffect } from "react";
import Sidebar from "../../components/common/Sidebar";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import EmployeeDetails from "../../components/Admin/EmployeeDetails";
import { AdminContext } from "../../context/AdminContext";
import WorkingChart from "../../components/Admin/WorkingChart";
import { assets } from "../../assets/assets";

const AdminDashboard = () => {
  const {
    adminData,
    getDashData,
    aToken,
    getAllEmployees,
    leaveData,
    departments,
    getLeaveRequests,
    adminProfile,
    getAdminProfile
  } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
      getAllEmployees();
      getLeaveRequests();
      getAdminProfile();
    }
  }, []);

  const pendingRequest = leaveData.filter(
    (item) => item.status === "pending"
  ).length;
  const approvedRequest = leaveData.filter(
    (item) => item.status === "approved"
  ).length;
  const rejectedRequest = leaveData.filter(
    (item) => item.status === "rejected"
  ).length;

  return (
    <div className="w-full flex items-start min-h-screen">
      <Sidebar />
      <div className="w-full sm:ml-[8.5rem] md:ml-[19.6rem] flex flex-col gap-4 overflow-hidden ">
        <AdminNavbar />

        <div className="px-3 py-3 pt-28 w-full bg-slate-50 dark:bg-[#101013] dark:text-white   ">
          <h1 className="font-medium text-2xl text-neutral-800 dark:text-white">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6  mt-1 ">
            <div
              className="mt-2 bg-white drop-shadow-md p-4 px-4 rounded-xl border border-zinc-300 flex items-center md:flex-row
                      dark:bg-[#1a1a1a] dark:border-[#535353] lg:flex-col xl:flex-row justify-between"
            >
              <div className="flex flex-col gap-2">
                <p className="font-medium text-3xl">
                  Hello,{" "}
                  <span className="text-emerald-800 dark:text-emerald-500 font-semibold text-3xl">
                    {adminProfile?.fullName.firstName}
                  </span>
                  👋{" "}
                </p>
                <p className="font-sm text-xl">
                  Welcome Back, Have a Good Day!
                </p>
              </div>
              <div className="hidden sm:block w-1/2 lg:w-[80%] xl:w-1/2">
                <img src={assets.welcomeImage} className="w-full" alt="" />
              </div>
            </div>

            <div className="flex flex-row gap-4">
              <div className="flex flex-col  gap-3 w-full lg:w-60">
                <div
                  className="bg-white drop-shadow-lg border border-zinc-300 flex justify-between items-start gap-2 p-4 px-4 rounded-xl
                          dark:bg-[#1a1a1a] dark:border-[#535353]"
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-medium leading-tight text-neutral-900 dark:text-white">
                      Total Employees
                    </h2>
                    <p className="font-semibold text-3xl text-neutral-800 dark:text-white">
                      {adminData.AllEmployees}
                    </p>
                  </div>
                  <i className="ri-team-fill font-medium text-2xl sm:text-3xl text-neutral-900 dark:text-white"></i>
                </div>
                <div
                  className="bg-white drop-shadow-lg border border-zinc-300 flex justify-between items-start  gap-2 p-4 px-4 rounded-xl
              dark:bg-[#1a1a1a] dark:border-[#535353]"
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-medium leading-tight text-neutral-900 dark:text-white">
                      Total Department
                    </h2>
                    <p className="font-semibold text-3xl text-neutral-800 dark:text-white">
                      {departments.length}
                    </p>
                  </div>
                  <i className="ri-layout-grid-fill font-medium text-2xl sm:text-3xl text-neutral-900 dark:text-white"></i>
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
                      {pendingRequest}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="text-base md:text-lg font-normal leading-tight text-green-500">
                      Approved Requests
                    </h2>
                    <p className="font-medium  text-2xl sm:text-3xl text-green-500">
                      {approvedRequest}
                    </p>
                  </div>
                  <div className="flex justify-between ">
                    <h2 className="text-base md:text-lg font-normal leading-tight text-red-500">
                      Rejected Requests
                    </h2>
                    <p className="font-medium  text-2xl sm:text-3xl text-red-400">
                      {rejectedRequest}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col xl:flex-row  gap-4">
            <div className="w-full xl:w-[60%] ">
              <EmployeeDetails adminData={adminData} />
            </div>

            <div
              className="p-2 mt-5 w-full xl:w-[40%] flex flex-col items-center justify-center gap-3 bg-white drop-shadow-md 
         border border-zinc-300 dark:bg-[#1a1a1a] dark:border-[#535353] rounded-xl"
            >
              <h1 className="font-medium text-2xl text-neutral-800 dark:text-white">
                Working Type
              </h1>
              <WorkingChart adminData={adminData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
