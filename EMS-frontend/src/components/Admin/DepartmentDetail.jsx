import React, { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const DepartmentDetail = ({ deleteDepartment }) => {
  const { departments } = useContext(AdminContext);

  if (!departments) {
    return <div>Loading..</div>;
  }

  return (
    <div className="bg-white drop-shadow-md p-5 mt-5 rounded-xl relative border max-w-full dark:bg-[#1a1a1a] dark:border-[#535353]">
      <h1 className="font-medium text-2xl text-neutral-800 dark:text-white">
        Department Details
      </h1>

      <div className="overflow-x-auto">
        <div className="mt-5 mb-2 py-2 px-4 flex items-center justify-between gap-6 lg:gap-1 rounded w-fit md:w-full bg-emerald-500">
          <h2 className="text-lg font-base w-32 lg:w-1/5">S.NO.</h2>
          <h3 className="text-lg font-base w-32 lg:w-1/5">Department Name</h3>
          <h5 className="text-lg font-base w-32 lg:w-1/5">Employees</h5>
          <h5 className="text-lg font-base w-32 lg:w-1/5">Delete Department</h5>
        </div>

        <div className="overflow-y-auto w-fit md:w-full max-h-[50vh] lg:max-h-[40vh]">
          {departments.map((department, index) => (
            <div
              key={index}
              className="border border-emerald-600 mb-2 py-2 px-4 flex gap-6 lg:gap-1 items-center justify-between
                rounded "
            >
              <h5 className="text-lg font-normal w-32 lg:w-1/5 text-neutral-900 dark:text-white">
                {index + 1}
              </h5>
              <h3 className="text-lg font-normal w-32 lg:w-1/5 text-blue-400">
                {department.departmentName}
              </h3>
              <h5 className="  text-lg font-normal w-32 lg:w-1/5 text-yellow-400">
                {department.employeeCount}
              </h5>
              <div className="flex gap-2 w-32 lg:w-1/5">
                <i
                  onClick={() => deleteDepartment(department.departmentName)}
                  class="ri-delete-bin-6-fill text-red-500 text-2xl font-semibold"
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;
