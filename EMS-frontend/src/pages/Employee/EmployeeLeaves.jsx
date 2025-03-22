import React, { useContext, useEffect, useState } from "react";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import Sidebar from "../../components/common/Sidebar";
import axios from "axios";
import { EmployeeContext } from "../../context/EmployeeContext";
import { toast } from "react-toastify";

const EmployeeLeaves = () => {
  const { backendUrl, token, getEmployeeLeaveData, leaveData } =
    useContext(EmployeeContext);
  // State to control the modal visibility
  const [showModal, setShowModal] = useState(false);

  const pendingRequest = leaveData.filter(
    (item) => item.status === "pending"
  ).length;
  const approvedRequest = leaveData.filter(
    (item) => item.status === "approved"
  ).length;
  const rejectedRequest = leaveData.filter(
    (item) => item.status === "rejected"
  ).length;

  // State for the form fields
  const [leaveDetails, setLeaveDetails] = useState({
    leaveType: "",
    reason: "",
    duration: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    getEmployeeLeaveData();
  }, []);

  const handleChange = (e) => {
    setLeaveDetails({ ...leaveDetails, [e.target.name]: e.target.value });
  };

  // Submit the leave request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/leave/apply-leave",
        leaveDetails,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        setShowModal(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error.message);
    }
  };

  return (
    <div className="w-full flex items-start">
      <Sidebar />
      <div className="w-full  sm:ml-[8.5rem] md:ml-[19.6rem]">
        <EmployeeNavbar />

        <div className="px-4 py-3 w-full bg-slate-50 dark:bg-[#101013]">
          <h1 className="mt-1 font-medium text-2xl text-neutral-800 dark:text-white">
            Leave Stats
          </h1>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-3 mt-3">
            {/* Leave Stats Cards */}
            <div className="bg-emerald-400 flex justify-between items-start gap-2 p-4 px-4 rounded-xl">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-medium leading-tight text-neutral-900">
                  Total Request
                </h2>
                <p className="font-semibold text-3xl text-neutral-800">
                  {leaveData.length}
                </p>
              </div>
              <i className="ri-archive-stack-fill font-medium text-2xl sm:text-3xl text-neutral-900"></i>
            </div>

            <div className="bg-emerald-400 flex justify-between items-start gap-2 p-4 px-4 rounded-xl">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-medium leading-tight text-neutral-900">
                  Pending Request
                </h2>
                <p className="font-semibold text-3xl text-neutral-800">
                  {pendingRequest}
                </p>
              </div>
              <i className="ri-timer-2-fill font-medium text-2xl sm:text-3xl text-neutral-900"></i>
            </div>

            <div className="bg-emerald-400 flex justify-between items-start gap-2 p-4 px-4 rounded-xl">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-medium leading-tight text-neutral-900">
                  Approved Request
                </h2>
                <p className="font-semibold text-3xl text-neutral-800">
                  {approvedRequest}
                </p>
              </div>
              <i className="ri-checkbox-multiple-fill font-medium text-2xl sm:text-3xl text-neutral-900"></i>
            </div>

            <div className="bg-emerald-400 flex justify-between items-start gap-2 p-4 px-4 rounded-xl">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-medium leading-tight text-neutral-900">
                  Rejected Request
                </h2>
                <p className="font-semibold text-3xl text-neutral-800">
                  {rejectedRequest}
                </p>
              </div>
              <i className="ri-calendar-close-fill font-medium text-2xl sm:text-3xl text-neutral-900"></i>
            </div>
          </div>

          {/* Apply Leave Button */}
          <div className="flex justify-end">
            <button
              className="mt-5 bg-emerald-500 text-white dark:text-neutral-900 px-6 py-2 rounded-lg"
              onClick={() => setShowModal(true)}
            >
              {" "}
              Apply Leave{" "}
            </button>
          </div>

          {/* Apply Leave Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg w-96">
                <h2 className="text-2xl font-semibold mb-4">Apply for Leave</h2>
                <form onSubmit={handleSubmit}>
                  {/* Leave Type */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                      Leave Type
                    </label>
                    <div className="flex gap-4 overflow-auto">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="leaveType"
                          value="Casual"
                          checked={leaveDetails.leaveType === "Casual"}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        Casual
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="leaveType"
                          value="Compensatory"
                          checked={leaveDetails.leaveType === "Compensatory"}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        Compensatory
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="leaveType"
                          value="Sick Leave"
                          checked={leaveDetails.leaveType === "Sick Leave"}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        Sick Leave
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="leaveType"
                          value="Loss of Pay"
                          checked={leaveDetails.leaveType === "Loss of Pay"}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        Loss of Pay
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="leaveType"
                          value="Paternity/Maternity"
                          checked={
                            leaveDetails.leaveType === "Paternity/Maternity"
                          }
                          onChange={handleChange}
                          className="mr-2"
                        />
                        Paternity/Maternity
                      </label>
                    </div>
                  </div>

                  {/* Half Day Leave Option */}
                  <div className="mb-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="isHalfDay"
                        checked={leaveDetails.isHalfDay}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Half Day Leave
                    </label>
                  </div>

                  {/* Reason */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                      Reason
                    </label>
                    <textarea
                      name="reason"
                      value={leaveDetails.reason}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:border-[#535353] dark:bg-transparent"
                    ></textarea>
                  </div>

                  {/* Duration */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={leaveDetails.duration}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:border-[#535353] dark:bg-transparent"
                    />
                  </div>

                  {/* Start Date */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={leaveDetails.startDate}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:border-[#535353] dark:bg-transparent"
                    />
                  </div>

                  {/* End Date */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={leaveDetails.endDate}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:border-[#535353] dark:bg-transparent"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-emerald-500 text-white px-6 py-2 rounded-lg"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="ml-2 bg-red-500 text-white px-6 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div
            id="leaveStatus"
            className="bg-white drop-shadow-md p-5 mt-5 rounded relative border dark:bg-[#1a1a1a] 
                         dark:border-[#535353]  max-w-full "
          >
            <h1 className="font-medium text-2xl text-neutral-800 dark:text-white">
              Leave Details
            </h1>

            <div className="overflow-x-auto">
              <div className="mt-5 mb-2 py-2 px-4 flex items-center justify-between gap-6 lg:gap-1 rounded w-fit md:w-full bg-emerald-500">
                <h3 className="text-lg font-base w-32 lg:w-1/5">Leave Type</h3>
                <h5 className="text-lg font-base w-32 lg:w-1/5">Duration</h5>
                <h5 className="text-lg font-base w-32 lg:w-1/5">
                  Requested On
                </h5>
                <h5 className="text-lg font-base w-32 lg:w-1/5">Status</h5>
              </div>

              <div className="overflow-y-auto w-fit md:w-full max-h-[50vh] lg:max-h-[40vh]">
                {leaveData.map((item, index) => (
                  <div
                    key={index}
                    className="border border-emerald-600 mb-2 py-2 px-4 flex gap-6 lg:gap-1 items-center justify-between rounded "
                  >
                    <h5 className="text-lg font-normal w-32 lg:w-1/5 text-neutral-900-400">
                      {item.leaveType}
                    </h5>
                    <h3 className="text-lg font-normal w-32 lg:w-1/5 text-blue-400">
                      {item.duration}
                    </h3>
                    <h5 className="  text-lg font-normal w-32 lg:w-1/5 text-blue-500">
                      {item.startDate}
                    </h5>
                    <h5 className="  text-lg font-normal w-32 lg:w-1/5 text-neutral-800 dark:text-white ">
                      {item.status}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeaves;
