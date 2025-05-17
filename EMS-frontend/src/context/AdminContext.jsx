import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const navigate = useNavigate();

  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [adminData, setAdminData] = useState(false);
  const [adminProfile, setAdminProfile] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [allEmployees, setAllEmployees] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/admin-dashboard",
        { headers: { aToken } }
      );
      if (data.success) {
        setAdminData(data.adminDashboard);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllEmployees = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/get-all-employees",
        { headers: { aToken } }
      );
      if (data.success) {
        setAllEmployees(data.employees);
        console.log("Updated employees:", data.employees);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getLeaveRequests = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/leave/getLeaveData", {
        headers: { aToken },
      });
      if (data.success) {
        setLeaveData(data.leaveData);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something Went Wrong!");
    }
  };

  const getAdminProfile = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/profile", {
        headers: { aToken },
      });
      if (data.success) {
        setAdminProfile(data.admin);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      toast.error(err.message);
      console.error("Error fetching admin profile:", err);
    }
  };

  const getSpecificEmployee = async (employeeId) => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/admin/get-specific-employee/${employeeId}`,
        { headers: { aToken } }
      );
      if (data.success) {
        setEmployee(data.employee);
        console.log(data.employee);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.error("Error fetching employee profile:", err);
    }
  };
  

  const filterEmployees = async (taskStatus) => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/admin/filter-employees?taskStatus=${taskStatus}`,
        { headers: { aToken } }
      );
      if (data.success) {
        setFilteredEmployees(data.filteredEmployees);
        toast.success(data.message);
      } else {
        setFilteredEmployees([]);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error filtering employees:", error);
      return { success: false, message: "Failed to filter employees" };
    }
  };

  const fetchDepartments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/get-departments-with-count",
        { headers: { aToken } }
      );
      if (data.success) {
        setDepartments(data.departments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error fetching departments");
    }
  };

  const handleSearchChange = async (searchTerm) => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/admin/search-employees?name=${searchTerm}`,
        { headers: { aToken } }
      );
      if (data.success) {
        setSearchResults(data.searchEmployees);
        navigate("/all-employees");
      } else {
        toast.error("No employees found!");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching employees:", error);
    }
  };
  
  
  const value = {
    aToken,
    setAToken,
    backendUrl,
    darkMode,
    setDarkMode,
    toggleDarkMode,
    adminData,
    getDashData,
    getAdminProfile,
    adminProfile,
    setAdminProfile,
    allEmployees,
    setAllEmployees,
    getAllEmployees,
    employee,
    setEmployee,
    getSpecificEmployee,
    filterEmployees,
    filteredEmployees,
    getLeaveRequests,
    leaveData,
    setLeaveData,
    fetchDepartments,
    departments,
    setDepartments,
    isSidebarOpen,
    setIsSidebarOpen,
    toggleSidebar,
    handleSearchChange,
    searchResults,
    setSearchResults,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
