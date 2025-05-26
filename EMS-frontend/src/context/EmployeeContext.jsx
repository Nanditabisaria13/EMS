import axios from "axios";
import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

export const EmployeeContext = createContext();

const EmployeeContextProvider = (props) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [employeeData, setEmployeeData] = useState(false);
  const [profile, setProfile] = useState(null);
  const [leaveData, setLeaveData] = useState([]);

  const getEmployeeDashboard = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/employee/employee-dashboard",
        { headers: { token } }
      );
      if (data.success) {
        setEmployeeData(data.EmployeeDashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong!");
    }
    }
  };

  const getMyProfile = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/employee/profile", {
        headers: { token },
      });
      if (data.success) {
        setProfile(data.employee);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
     if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong!");
    }
      console.error("Error fetching employee profile:", error);
    }
  };

  const getEmployeeLeaveData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/leave/getEmployeeLeaveData",
        { headers: { token } }
      );
      if (data.success) {
        setLeaveData(data.leaveData);
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

  const value = {
    token,
    setToken,
    backendUrl,
    employeeData,
    setEmployeeData,
    getEmployeeDashboard,
    profile,
    setProfile,
    getMyProfile,
    getEmployeeLeaveData,
    leaveData,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {props.children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContextProvider;
