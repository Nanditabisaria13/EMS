import axios from "axios";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { EmployeeContext } from "../../context/EmployeeContext";

const AcceptTask = ({ data }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [category, setCategory] = useState(data.category);
  const [date, setDate] = useState(data.date);
  const [deadline, setDeadline] = useState(data.deadline);

  const { employeeId } = useParams();
  const { backendUrl, aToken, getSpecificEmployee, setEmployee } =
    useContext(AdminContext);
  const { token, setProfile } = useContext(EmployeeContext);

  const taskCompleted = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/employee/task-completed",
        taskdata,
        { headers: { token } }
      );
      if (data.success) {
        setProfile(data.updatedEmployee);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const taskFailed = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/employee/task-failed",
        taskdata,
        { headers: { token } }
      );
      if (data.success) {
        setProfile(data.updateEmployee);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateEmployeeTask = async (taskId) => {
    try {
      const updatedTask = {
        employeeId,
        taskId,
        title,
        description,
        category,
        date,
        deadline,
      };

      const { data } = await axios.put(
        backendUrl + "/api/admin/update-task",
        updatedTask,
        { headers: { aToken } }
      );
      if (data.success) {
        setEmployee(data.updatedEmployee);
        toast.success(data.message);
        await getSpecificEmployee(employeeId);
        setIsUpdate(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteEmployeeTask = async (taskId) => {
    try {
      const deleteTask = {
        employeeId,
        taskId,
      };

      const { data } = await axios.put(
        backendUrl + "/api/admin/delete-task",
        deleteTask,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        await getSpecificEmployee(employeeId);
        setEmployee(data.updatedEmployee);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Calculate the remaining time for the task's deadline
  const getDeadlineReminder = () => {
    const now = new Date();
    const deadline = new Date(data.deadline);
    const timeDiff = deadline - now;

    // If the deadline is in the past or within the next 24 hours
    if (timeDiff <= 0) {
      return "Deadline has passed!";
    } else if (timeDiff <= 86400000) {
      return deadline;
    } else {
      return null;
    }
  };

  // Hook to handle deadline reminder
  const reminderMessage = getDeadlineReminder();

  return (
    <div
      className="flex flex-col justify-between flex-shrink-0 w-[300px] p-5  bg-white border border-zinc-300 
         drop-shadow-md dark:bg-[#1a1a1a] dark:border-[#535353] rounded-xl"
    >
      {aToken && (
        <div
          className=" text-md font-base max-w-60 flex items-center justify-between bg-red-600 text-white px-2 py-1
              rounded-lg"
        >
          <h1>Deadline:</h1>
          {isUpdate ? (
            <input
              className="bg-gray-50 text-sm max-w-28  dark:bg-transparent dark:text-white"
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          ) : (
            <h4 className=" text-sm dark:bg-transparent dark:text-white">
              {data.deadline}
            </h4>
          )}
        </div>
      )}

      {/* Display the deadline reminder for employee */}
      {token && reminderMessage ? (
        <div
          className=" text-md font-base max-w-60 flex items-center justify-between bg-red-600 text-white px-2 py-1
              rounded-lg"
        >
          <h1>Deadline:</h1>
          <h2>{data.deadline}</h2>
        </div>
      ) : (
        ""
      )}

      <div className="flex justify-between items-center mt-4">
        {isUpdate ? (
          <input
            className="bg-yellow-500 text-sm max-w-28 mt-4 text-white px-3 py-1 rounded"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        ) : (
          <h3 className="bg-yellow-500 text-sm px-3 py-1 rounded">
            {data.category}
          </h3>
        )}

        {isUpdate ? (
          <input
            className="bg-gray-50 text-sm max-w-28 mt-4 dark:bg-transparent dark:text-white"
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        ) : (
          <h4 className=" text-sm dark:bg-transparent dark:text-white">
            {data.date}
          </h4>
        )}
      </div>

      {isUpdate ? (
        <input
          className="bg-gray-50 text-xl font-medium max-w-60 mt-4 dark:bg-transparent dark:text-white"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <h2 className="mt-5 text-xl font-semibold dark:bg-transparent dark:text-white">
          {" "}
          {data.title}
        </h2>
      )}

      {isUpdate ? (
        <input
          className="bg-gray-50 text-base  max-w-60 mt-4 dark:bg-transparent dark:text-white"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      ) : (
        <p className="text-base mt-2 dark:bg-transparent dark:text-white">
          {data.description}
        </p>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={taskCompleted}
          className="bg-green-500 py-2 px-2 text-sm"
        >
          {" "}
          Mark as Completed{" "}
        </button>
        <button onClick={taskFailed} className="bg-red-500 py-2 px-2 text-sm">
          {" "}
          Mark as Failed{" "}
        </button>
      </div>

      {aToken && (
        <div className="flex gap-3 items-center justify-center mt-3">
          {isUpdate ? (
            <button
              onClick={() => updateEmployeeTask(data.taskId)}
              className="px-3 py-1 bg-yellow-400 hover:bg-yellow-600 text-neutral-900 text-lg rounded-sm"
            >
              Save Task
            </button>
          ) : (
            <button
              onClick={() => setIsUpdate(true)}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-700 text-neutral-900 text-lg rounded-sm"
            >
              Update Task
            </button>
          )}

          <button
            onClick={() => deleteEmployeeTask(data.taskId)}
            className="px-3 py-1 bg-red-600 text-neutral-900 text-lg rounded-sm"
          >
            Delete Task
          </button>
        </div>
      )}
    </div>
  );
};

export default AcceptTask;
