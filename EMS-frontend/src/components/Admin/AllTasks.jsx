import React from "react";
import { useNavigate } from "react-router-dom";

const AllTasks = ({ allEmployees }) => {
  const navigate = useNavigate();

  if (!allEmployees) {
    return <div></div>;
  }
  return (
    <div className="bg-white drop-shadow-md  p-5 mt-5 rounded relative border dark:bg-[#1a1a1a] dark:border-[#535353] max-w-full ">
      <h1 className="font-medium text-2xl text-neutral-800 dark:text-white cursor-pointer">
        Employee Tasks
      </h1>

      <div className="overflow-x-auto">
        <div className="mt-5 mb-2 py-2 px-4 flex items-center justify-between gap-6 lg:gap-1 rounded w-fit lg:w-full bg-emerald-500">
          <h2 className="text-lg font-base w-32">Employee</h2>
          <h3 className="text-lg font-base w-32">New Task</h3>
          <h5 className="text-lg font-base w-32">Active Task</h5>
          <h5 className="text-lg font-base w-32">Completed</h5>
          <h5 className="text-lg font-base w-32">Failed</h5>
        </div>

        <div className="overflow-y-auto w-fit lg:w-full max-h-[50vh]">
          {allEmployees.map((employee, index) => (
            <div
              key={index}
              onClick={() => navigate(`/get-employee-tasks/${employee._id}`)}
              className="border-2 border-emerald-600 mb-2 py-2 px-4 flex gap-6 lg:gap-1 items-center justify-between rounded "
            >
              <div className="w-32 flex items-center gap-2">
                <img
                  src={employee.image}
                  className="w-12 h-12  rounded-full"
                  alt=""
                />

                <h2 className="text-lg fotn-medium w-32">
                  {employee.fullName.firstName} {employee.fullName.lastName}
                </h2>
              </div>

              <h5 className="text-lg font-medium w-32 text-yellow-400">
                {employee.taskNumbers.newTask}
              </h5>
              <h3 className="text-lg font-medium w-32 text-blue-400">
                {employee.taskNumbers.active}
              </h3>
              <h5 className="text-lg font-medium w-32 text-green-400">
                {employee.taskNumbers.completed}
              </h5>
              <h5 className="text-lg font-medium w-32 text-red-500">
                {employee.taskNumbers.failed}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTasks;
