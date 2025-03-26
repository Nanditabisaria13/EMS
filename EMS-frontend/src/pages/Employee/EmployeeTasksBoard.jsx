import React, { useContext, useEffect } from "react";
import Sidebar from "../../components/common/Sidebar";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import AcceptTask from "../../components/TaskList/AcceptTask";
import NewTask from "../../components/TaskList/NewTask";
import CompleteTask from "../../components/TaskList/CompleteTask";
import FailedTask from "../../components/TaskList/FailedTask";
import { EmployeeContext } from "../../context/EmployeeContext";

const EmployeeTasksBoard = () => {
  const { profile, getMyProfile } = useContext(EmployeeContext);

  useEffect(() => {
    getMyProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  const activeTasks = profile.tasks.filter((task) => task.active);
  const newTasks = profile.tasks.filter((task) => task.newTask);
  const completedTasks = profile.tasks.filter((task) => task.completed);
  const failedTasks = profile.tasks.filter((task) => task.failed);

  return (
    <div className="max-w-full flex items-start ">
      <Sidebar />
      <div className=" w-full sm:w-[80%] md:w-[73%] lg:w-[75%] xl:w-[80%] sm:ml-[8.5rem] md:ml-[19.6rem] overflow-hidden">
        <EmployeeNavbar />

        <div className="px-4 py-3 w-full bg-slate-50 dark:bg-[#101013] relative">
          <h1 className="font-medium text-2xl text-neutral-800 dark:text-white">
            Task Board
          </h1>

          <div className="mt-4 flex flex-col gap-3 w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-3 w-full">
              <div
                className="bg-white drop-shadow-md border border-zinc-300  flex justify-between items-start  gap-2 p-4 px-4 rounded-xl
                          dark:bg-[#1a1a1a] dark:border-[#535353]"
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-medium leading-tight text-yellow-500">
                    New Tasks
                  </h2>
                  <p className="font-semibold text-3xl text-neutral-800 dark:text-white">
                    {profile.taskNumbers.newTask}
                  </p>
                </div>
                <i className="ri-archive-stack-fill font-medium text-2xl sm:text-3xl text-yellow-500"></i>
              </div>

              <div
                className="bg-white drop-shadow-md border border-zinc-300 flex justify-between items-start  gap-2 p-4 px-4 rounded-xl
                     dark:bg-[#1a1a1a] dark:border-[#535353]"
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-medium leading-tight text-blue-500">
                    Active Tasks
                  </h2>
                  <p className="font-semibold text-3xl text-neutral-800 dark:text-white">
                    {profile.taskNumbers.active}
                  </p>
                </div>
                <i className="ri-timer-2-fill font-medium  text-2xl sm:text-3xl text-blue-500"></i>
              </div>

              <div
                className="bg-white drop-shadow-md border border-zinc-300 flex justify-between items-start  gap-2 p-4 px-4 rounded-xl
                      dark:bg-[#1a1a1a] dark:border-[#535353]"
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-medium leading-tight text-green-500">
                    Completed Tasks
                  </h2>
                  <p className="font-semibold text-3xl text-neutral-800 dark:text-white">
                    {profile.taskNumbers.completed}
                  </p>
                </div>
                <i className="ri-checkbox-multiple-fill font-medium text-2xl sm:text-3xl text-green-500"></i>
              </div>

              <div
                className="bg-white drop-shadow-md border border-zinc-300 flex justify-between items-start  gap-2 p-4 px-4 rounded-xl
                             dark:bg-[#1a1a1a] dark:border-[#535353]"
              >
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-medium leading-tight text-red-500">
                    Failed Tasks
                  </h2>
                  <p className="font-semibold text-3xl text-neutral-800 dark:text-white">
                    {profile.taskNumbers.failed}
                  </p>
                </div>
                <i className="ri-calendar-close-fill font-medium text-2xl sm:text-3xl text-red-500"></i>
              </div>
            </div>

            <div id="tasklist" className=" py-5 flex-1 mt-5 w-full">
              <div className="flex gap-3  overflow-x-auto w-[100%]">
                {profile.taskNumbers.newTask > 0 && (
                  <div className="flex flex-col gap-2 h-screen p-3">
                    <div
                      className="w-full flex gap-3 items-center justify-between py-3 px-2 bg-white drop-shadow-md border-zinc-300
              dark:bg-[#1a1a1a] border dark:border-[#535353] rounded-lg"
                    >
                      <h1 className="font-medium text-2xl text-yellow-500">
                        New Tasks
                      </h1>
                      <div className="w-7 h-7 flex items-center justify-center text-white bg-yellow-300 dark:text-neutral-800 rounded-full ">
                        {profile.taskNumbers.newTask}
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-4 flex-1 bg-transparent overflow-y-auto w-full p-3">
                      {newTasks.map((task, index) => (
                        <NewTask key={index} data={task} />
                      ))}
                    </div>
                  </div>
                )}

                {profile.taskNumbers.active > 0 && (
                  <div className="flex flex-col  h-screen gap-2 p-3">
                    <div
                      className="w-full flex gap-3 items-center justify-between py-3 px-2 bg-white drop-shadow-md border-zinc-300
           dark:bg-[#1a1a1a] border dark:border-[#535353] rounded-lg"
                    >
                      <h1 className="font-medium text-2xl text-blue-500">
                        Active Tasks
                      </h1>
                      <div className="w-7 h-7 flex items-center justify-center  bg-blue-300 text-neutral-800 rounded-full ">
                        {profile.taskNumbers.active}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-start gap-4 flex-1 bg-transparent overflow-y-auto w-full p-3">
                      {activeTasks.map((task, index) => (
                        <AcceptTask key={index} data={task} />
                      ))}
                    </div>
                  </div>
                )}

                {profile.taskNumbers.completed > 0 && (
                  <div className="flex flex-col h-screen gap-2  p-3">
                    <div
                      className="w-full flex gap-3 items-center justify-between py-3 px-2 bg-white drop-shadow-md border-zinc-300
             dark:bg-[#1a1a1a] border dark:border-[#535353] rounded-lg"
                    >
                      <h1 className="font-medium text-2xl text-emerald-500 ">
                        Completed Tasks
                      </h1>
                      <div className="w-7 h-7 flex items-center justify-center text-white bg-green-300 dark:text-neutral-800 rounded-full ">
                        {profile.taskNumbers.completed}
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-start gap-4 flex-1 bg-transparent  w-full p-3 overflow-y-auto">
                      {completedTasks.map((task, index) => (
                        <CompleteTask key={index} data={task} />
                      ))}
                    </div>
                  </div>
                )}

                {profile.taskNumbers.failed > 0 && (
                  <div className="flex flex-col h-screen gap-2 p-3">
                    <div
                      className="w-full flex gap-3 items-center justify-between py-3 px-2 bg-white drop-shadow-md border-zinc-300
           dark:bg-[#1a1a1a] border dark:border-[#535353] rounded-lg"
                    >
                      <h1 className="font-medium text-2xl text-red-500">
                        Failed Tasks
                      </h1>
                      <div className="w-7 h-7 flex items-center justify-center  text-white bg-red-300 dark:text-neutral-800 rounded-full text-xl">
                        {profile.taskNumbers.failed}
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
    </div>
  );
};

export default EmployeeTasksBoard;
