import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminDashboard from './pages/Admin/AdminDashboard'
import 'remixicon/fonts/remixicon.css'
import AllEmployees from './pages/Admin/AllEmployees'
import CreateEmployee from './pages/Admin/CreateEmployee'
import TaskBoard from './pages/Admin/TaskBoard'
import LeaveStats from './pages/Admin/LeaveStats'
import Profile from './pages/Admin/Profile'
import EmployeeProfile from './pages/Admin/EmployeeProfile'
import Department from './pages/Admin/Department'
import { AdminContext } from './context/AdminContext';
import GetEmployeeTasks from './pages/Admin/GetEmployeeTasks';
import { EmployeeContext } from './context/EmployeeContext';
import EmployeeDashboard from './pages/Employee/EmployeeDashboard';
import EmployeeTasksBoard from './pages/Employee/EmployeeTasksBoard';
import EmployeeLeaves from './pages/Employee/EmployeeLeaves';
import MyProfile from './pages/Employee/MyProfile';
import { DarkModeContext } from './context/DarkModeContext';


const App = () => {
  const {aToken} = useContext(AdminContext)
  const {token} = useContext(EmployeeContext)
   
  const { darkMode } = useContext(DarkModeContext);

  // Apply dark mode to the body tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

return (
<div className=' dark:bg-[#101013] dark:text-white min-h-screen'>
<ToastContainer 
 position="top-right"
 autoClose={5000}
 hideProgressBar={false}
 newestOnTop={false}
 closeOnClick={false}
 rtl={false}
 pauseOnFocusLoss
 draggable
 pauseOnHover
 theme={darkMode ? 'dark' : 'light'}

/>

<Routes>
  {/* Route for non-logged-in users */}
  <Route path="/" element={aToken || token ? (aToken ? <AdminDashboard /> : <EmployeeDashboard />) : <Home />} />
  
 
  
  {/* Routes for Admin */}
  {aToken && (
    <>
      <Route path='/admin-dashboard' element={<AdminDashboard />} />
      <Route path='/all-employees' element={<AllEmployees />} />
      <Route path='/add-employee' element={<CreateEmployee />} />
      <Route path='/task-board' element={<TaskBoard />} />
      <Route path='/leave' element={<LeaveStats />} />
      <Route path='/admin-profile' element={<Profile />} />
      <Route path='/employee-profile/:employeeId' element={<EmployeeProfile />} />
      <Route path='/get-employee-tasks/:employeeId' element={<GetEmployeeTasks />} />
      <Route path='/departments' element={<Department />} />
    </>
  )}

  {/* Routes for Employee */}
  {token && (
    <>
      <Route path='/employee-dashboard' element={<EmployeeDashboard />} />
      <Route path='/employee-tasks' element={<EmployeeTasksBoard />} />
      <Route path='/employee-leaves' element={<EmployeeLeaves />} />
      <Route path='/employee-profile' element={<MyProfile />} />
    </>
  )}
  
  {/* Public routes for unauthenticated users */}
  <Route path='/login' element={<Login />} />
  <Route path='/signup' element={<Signup />} />
</Routes>
</div>

) 
}

export default App