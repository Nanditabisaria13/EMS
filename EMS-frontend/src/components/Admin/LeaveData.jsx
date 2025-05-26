import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const LeaveData = () => {
  const { backendUrl, aToken, leaveData, setLeaveData } =
    useContext(AdminContext);

  const approvedRequest = async (leaveId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/leave/approved-request",
        { leaveId },
        { headers: { aToken } }
      );
      if (data.success) {
        setLeaveData((prevLeaveData) =>
          prevLeaveData.map((item) =>
            item._id === leaveId ? { ...item, status: "approved" } : item
          )
        );
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong!");
    }
      console.log(error.message);
    }
  };

  const cancelRequest = async (leaveId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/leave/cancel-request",
        { leaveId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setLeaveData((prevLeaveData) =>
          prevLeaveData.map((item) =>
            item._id === leaveId ? { ...item, status: "rejected" } : item
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
     if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong!");
    }
      console.log(error.message);
    }
  };

  if (!leaveData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      id="leaveStatus"
      className="bg-white drop-shadow-md p-5 mt-5 rounded-xl relative border dark:bg-[#1a1a1a]
    dark:border-[#535353] max-w-full cursor-pointer"
    >
      <h1 className="font-medium text-2xl text-neutral-800 dark:text-white">
        Leave Requests
      </h1>

      <div className="overflow-x-auto ">
        <div className="mt-5 mb-2 py-2 px-4 flex items-center justify-between gap-6 lg:gap-1 rounded w-fit xl:w-full bg-emerald-500">
          <h2 className="text-lg font-base w-32">Employee</h2>
          <h3 className="text-lg font-base w-32">Leave Type</h3>
          <h5 className="text-lg font-base w-32">Duration</h5>
          <h5 className="text-lg font-base w-32">Reason</h5>
          <h5 className="text-lg font-base w-32">Requested On</h5>
          <h5 className="text-lg font-base w-32">Status</h5>
          <h5 className="text-lg font-base w-32">Action</h5>
        </div>

        <div className="overflow-y-auto w-fit xl:w-full max-h-[50vh] lg:max-h-[40vh]">
          {leaveData.map((item, index) => (
            <div
              key={index}
              className="border border-emerald-600 mb-2 py-2 px-4 flex gap-6 lg:gap-1 items-center justify-between rounded"
            >
              <div className="w-32 flex gap-2 items-center">
                <img
                  src={item.employeeId?.image}
                  className="w-12 h-12 rounded-full"
                  alt=""
                />

                <h2 className="text-lg fotn-medium w-32">
                  {item.employeeId?.fullName?.firstName}{" "}
                  {item.employeeId?.fullName?.lastName}
                </h2>
              </div>

              <h5 className="text-lg font-normal w-32 text-neutral-800 dark:text-white">
                {item?.leaveType}
              </h5>
              <h3 className="text-lg font-normal w-32 text-blue-400">
                {item?.duration} {item?.durationType}
              </h3>
              <h3 className="text-lg font-normal w-32 text-yellow-400">
                {item?.reason} 
              </h3>
              <h3 className="text-lg font-normal w-32 text-blue-400">
                {item?.startDate}
              </h3>
              <h5 className="text-lg font-normal w-32 text-neutral-800 dark:dark:text-white">
                {item?.status}
              </h5>
              <div className="flex gap-2 w-32">
                <i
                  className="ri-checkbox-circle-fill text-green-600 hover:text-green-400 text-3xl font-semibold"
                  onClick={() => approvedRequest(item._id)}
                ></i>
                <i
                  className="ri-close-circle-fill text-red-700 hover:text-red-400 text-3xl font-semibold"
                  onClick={() => cancelRequest(item._id)}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveData;
