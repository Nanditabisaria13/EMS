import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import { AdminContext } from "../../context/AdminContext";
import { useParams } from "react-router-dom";
import AcceptTask from "../../components/TaskList/AcceptTask";
import NewTask from "../../components/TaskList/NewTask";
import CompleteTask from "../../components/TaskList/CompleteTask";
import FailedTask from "../../components/TaskList/FailedTask";

const GetEmployeeTasks = () => {
  const { getSpecificEmployee, employee } = useContext(AdminContext);
  const { employeeId } = useParams();

  useEffect(() => {
    getSpecificEmployee(employeeId);
  }, [employeeId]);

  if (!employee) return <p>Loading...</p>;

  const activeTasks = employee.tasks.filter((task) => task.active);
  const newTasks = employee.tasks.filter((task) => task.newTask);
  const completedTasks = employee.tasks.filter((task) => task.completed);
  const failedTasks = employee.tasks.filter((task) => task.failed);

  return (
    <div className="w-full flex items-start">
      <Sidebar />
      <div className="w-full sm:w-[calc(100%-8rem)] md:w-[calc(100%-18rem)]  sm:ml-[8rem] md:ml-[18rem] cursor-pointer overflow-hidden">
        <AdminNavbar />
        <div className="px-4 py-3 pt-28 w-full bg-slate-50 dark:bg-[#101013]">
          <h1 className="font-medium text-2xl text-neutral-800 dark:text-white">
            Employee Tasks
      
          </h1>

          <div id="tasklist" className="py-5 flex-1 mt-5 w-full">
            <div className="flex gap-3  overflow-x-auto w-[100%]">
              {/* New Tasks */}
              {employee.taskNumbers.newTask > 0 && (
                <div className="flex flex-col gap-2 h-screen p-3">
                  <div
                    className="w-full flex gap-3 items-center justify-between py-3 px-2 bg-white drop-shadow-md border-zinc-300
            dark:bg-[#1a1a1a] border dark:border-[#535353] rounded-lg"
                  >
                    <h1 className="font-medium text-2xl text-yellow-500">
                      New Tasks
                    </h1>
                    <div className="w-7 h-7 flex items-center justify-center  bg-yellow-300 text-neutral-800 rounded-full ">
                      {employee.taskNumbers.newTask}
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-4 flex-1 bg-transparent overflow-y-auto w-full p-3">
                    {newTasks.map((task, index) => (
                      <NewTask key={index} data={task} />
                    ))}
                  </div>
                </div>
              )}

              {/* Active Tasks */}
              {employee.taskNumbers.active > 0 && (
                <div className="flex flex-col  h-screen gap-2 p-3">
                  <div
                    className="w-full flex gap-3 items-center justify-between py-3 px-2 bg-white drop-shadow-md border-zinc-300
         dark:bg-[#1a1a1a] border dark:border-[#535353] rounded-lg"
                  >
                    <h1 className="font-medium text-2xl text-blue-500">
                      Active Tasks
                    </h1>
                    <div className="w-7 h-7 flex items-center justify-center bg-blue-300 text-neutral-800 rounded-full ">
                      {employee.taskNumbers.active}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-start gap-4 flex-1 bg-transparent overflow-y-auto w-full p-3">
                    {activeTasks.map((task, index) => (
                      <AcceptTask key={index} data={task} />
                    ))}
                  </div>
                </div>
              )}

              {/* Completed Tasks */}
              {employee.taskNumbers.completed > 0 && (
                <div className="flex flex-col h-screen gap-2  p-3">
                  <div
                    className="w-full flex gap-3 items-center justify-between py-3 px-2 bg-white drop-shadow-md border-zinc-300
           dark:bg-[#1a1a1a] border dark:border-[#535353] rounded-lg"
                  >
                    <h1 className="font-medium text-2xl text-emerald-500 ">
                      Completed Tasks
                    </h1>
                    <div className="w-7 h-7 flex items-center justify-center  bg-green-300 text-neutral-800 rounded-full ">
                      {employee.taskNumbers.completed}
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-start gap-4 flex-1 bg-transparent  w-full p-3 overflow-y-auto">
                    {completedTasks.map((task, index) => (
                      <CompleteTask key={index} data={task} />
                    ))}
                  </div>
                </div>
              )}

              {/* Failed Tasks */}
              {employee.taskNumbers.failed > 0 && (
                <div className="flex flex-col h-screen gap-2 p-3">
                  <div
                    className="w-full flex gap-3 items-center justify-between py-3 px-2 bg-white drop-shadow-md border-zinc-300
         dark:bg-[#1a1a1a] border dark:border-[#535353] rounded-lg"
                  >
                    <h1 className="font-medium text-2xl text-red-500">
                      Failed Tasks
                    </h1>
                    <div className="w-7 h-7 flex items-center justify-center  bg-red-300 text-neutral-800 rounded-full text-xl">
                      {employee.taskNumbers.failed}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-start gap-4 flex-1 bg-transparent overflow-y-auto w-full p-3">
                    {failedTasks.map((task, index) => (
                      <FailedTask key={index} data={task} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetEmployeeTasks;
