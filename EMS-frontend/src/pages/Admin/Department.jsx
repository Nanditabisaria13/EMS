import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import DepartmentDetail from "../../components/Admin/DepartmentDetail";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import DepartmentChart from "../../components/Admin/DepartmentChart";

const Department = () => {
  const [addDepartment, setAddDepartment] = useState("");
 
  const { backendUrl, aToken, fetchDepartments, departments } =
    useContext(AdminContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const departmentData = {
        departmentName: addDepartment,
      };

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-new-department",
        departmentData,
        { headers: { aToken } }
      );
      if (data.success) {
        fetchDepartments();
        toast.success(data.message);
        setAddDepartment("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [backendUrl, aToken]);

  const deleteDepartment = async (departmentName) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/delete-department",
        { departmentName },
        { headers: { aToken } }
      );

      if (data.success) {
        fetchDepartments();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting department");
    }
  };

  return (
    <div className="w-full flex">
      <Sidebar />
      <div className="w-full sm:ml-[8rem] md:ml-[19.6rem] overflow-hidden">
        <AdminNavbar />
        <div className="px-3 py-3 pt-28 w-full bg-slate-50 dark:bg-[#101013] dark:text-white">
          <h1 className="font-medium text-2xl text-neutral-800 dark:text-white">
            Department
          </h1>

          <div className="p-2  grid md:grid-cols-[6fr,3fr] gap-6 sm:grid-cols-1">
            <div
              className="flex flex-col gap-3 bg-white drop-shadow-md p-4 border border-zinc-300 rounded-xl dark:bg-[#1a1a1a]
                        dark:border-[#535353]"
            >
              <h1 className="font-medium text-xl md:font-normal lg:font-medium md:text-lg lg:text-2xl text-neutral-800 dark:text-white">
                Add a new Department
              </h1>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={addDepartment}
                  onChange={(e) => setAddDepartment(e.target.value)}
                  placeholder="Department Name"
                  className="bg-zinc-100 border border-zinc-300 text-lg placeholder:text-base rounded-sm px-4 py-2 w-full dark:bg-transparent"
                />
                <button
                  onClick={onSubmit}
                  type="submit"
                  className="px-6 py-2 bg-emerald-400 text-neutral-900 text-lg font-medium rounded-lg hover:bg-emerald-500 hover:text-white"
                >
                  Add
                </button>
              </div>
            </div>

            <div
              className="bg-white drop-shadow-lg border border-zinc-300 flex justify-between items-start gap-2 p-4 px-4 rounded-xl
                         dark:bg-[#1a1a1a] dark:border-[#535353]"
            >
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-medium leading-tight text-neutral-900 dark:text-white">
                  Total Department
                </h2>
                <p className="font-semibold text-3xl text-neutral-800 dark:text-white">
                  {departments.length}
                </p>
              </div>
              <i className="ri-grid-fill font-medium text-3xl text-neutral-900 dark:text-white"></i>
            </div>
          </div>

          <div className="mt-4 flex flex-col lg:flex-row  gap-4">
            <div className="w-full lg:w-[70%] xl:w-[60%]">
              <DepartmentDetail deleteDepartment={deleteDepartment} />
            </div>
            
          
            <div
              className="p-2 mt-5 w-full lg:w-[30%] xl:w-[40%] flex flex-col items-center justify-center gap-3 bg-white drop-shadow-md
                         border dark:bg-[#1a1a1a] dark:border-[#535353] rounded-xl"
            >
              <h1 className="font-medium text-2xl text-neutral-800 dark:text-white">
                Departments
              </h1>
              <DepartmentChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Department;
