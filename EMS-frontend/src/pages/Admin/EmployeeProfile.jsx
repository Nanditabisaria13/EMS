import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/common/Sidebar'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import {useParams } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';


const EmployeeProfile = () => {
   
  const { employee, setEmployee, getSpecificEmployee,backendUrl,aToken } = useContext(AdminContext);
  const { employeeId } = useParams();

            const[isEdit,setIsEdit] = useState(false)
            const[image,setImage] = useState(null)

            useEffect(() => {
              getSpecificEmployee(employeeId); // Fetch the employee details when component mounts
            }, [employeeId]);
          
            if (!employee) return <p>Loading...</p>;
          
            const updateEmployeeProfileData = async (employeeId) => {
              try {
                const formData = new FormData()
    
                formData.append('firstName', employee.fullName.firstName);
                formData.append('lastName', employee.fullName.lastName);
                formData.append('email',employee.email)
                formData.append('password',employee.password)
                formData.append('dob',employee.dob)
                formData.append('phone',employee.phone)
                formData.append('gender',employee.gender)
                formData.append('position',employee.position)
                formData.append('salary',employee.salary)
                formData.append('address',employee.address)
                formData.append('joiningDate',employee.joiningDate)
                formData.append('department',employee.department)
                image && formData.append('image',image)
      
                const {data} = await axios.post(backendUrl + `/api/admin/update-employee-profile/${employeeId}`,formData,{headers:{aToken}})
                if(data.success){
                  setEmployee(data.updatedEmployee)
                  toast.success(data.message)
                  setIsEdit(false)
                  setImage(null)
                } else{
                  toast.error(data.message)
                }
               } catch (error) {
                console.log(error)
                toast.error(error.message)
               }
            };
           
  return (
    <div className='w-full flex'>
    <Sidebar/>
      <div className='w-full  sm:ml-[10rem] md:ml-[19.6rem]'>
       <AdminNavbar/>
       
       <div className='flex flex-col lg:flex-row text-sm items-center justify-center gap-10  w-full bg-white drop-shadow-md 
        mt-20 dark:bg-[#101013] px-4 py-3'>
          <div className='flex flex-col gap-2 items-center'>
            {isEdit ? (
              <label htmlFor='image'>
                <div className='inline-block relative cursor-pointer'>
                  <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : assets.uploadImage} alt="profile" />
                </div>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
              </label>
            ) : (
              <img className='w-72 h-68 rounded-lg' src={employee.image || assets.uploadImage} alt="" />
            )}

            <div className='flex gap-2'>

              {isEdit ? (
              <input className='bg-gray-50 dark:bg-transparent text-3xl font-medium  max-w-24 mt-4' type="text"  value={employee.fullName.firstName}
              onChange={(e) => setEmployee((prev) => ({ ...prev, fullName: { ...prev.fullName, firstName: e.target.value } }))} />
              ) : (
                <p className='font-medium text-3xl text-neutral-800 dark:text-white mt-4'>{employee.fullName.firstName}</p>
              )}

              {isEdit?(
                <input className='bg-gray-50 dark:bg-transparent text-3xl font-medium  max-w-28 mt-4' type="text" value={employee.fullName.lastName} 
                onChange={(e) => setEmployee((prev) => ({ ...prev, fullName: { ...prev.fullName, lastName: e.target.value } }))} />
              ) : (
                <p className='font-medium text-3xl text-neutral-800 dark:text-white mt-4'>{employee.fullName.lastName}</p>
              )}
            </div>

            <div className='flex flex-col gap-1 items-center mt-2'>
              <div className='px-4 py-1 bg-white drop-shadow-md border border-zinc-300 dark:bg-[#1a1a1a] dark:border-[#535353]
               rounded-lg w-full'>
                <p className='text-neutral-700 dark:text-neutral-500 font-medium text-base'>Email</p>
                {isEdit ? (
                  <input className='bg-gray-50 text-xl dark:bg-transparent font-medium max-w-60 mt-4' type="text" value={employee.email} 
                  onChange={(e) => setEmployee(prev=>({...prev,email:e.target.value}))} />
                ) : (
                  <p className='font-medium text-lg text-neutral-800 dark:text-white'>{employee.email}</p>
                )}
              </div>

              <div className='px-4 py-1 bg-white drop-shadow-md border border-zinc-300 dark:bg-[#1a1a1a] dark:border-[#535353] 
              rounded-lg w-full'>
                <p className='text-neutral-700 dark:text-neutral-500 font-medium text-base'>Position</p>
                {isEdit ? (
                  <input className='bg-gray-50 dark:bg-transparent text-xl font-medium max-w-60 mt-4' type="text" value={employee.position} 
                  onChange={(e) =>setEmployee(prev=>({...prev,position:e.target.value}))} />
                ) : (
                  <p className='font-medium text-lg text-neutral-800 dark:text-white'>{employee.position}</p>
                )}
              </div>

              <div className='px-4 py-1 bg-white drop-shadow-md border border-zinc-300 dark:bg-[#1a1a1a] dark:border-[#535353]
               rounded-lg w-full'>
                <p className='text-neutral-700 dark:text-neutral-500 font-medium text-base'>Department</p>
                {isEdit ? (
                  <input className='bg-gray-50 text-xl font-medium max-w-60 mt-4 dark:bg-transparent' type="text" value={employee.department} 
                  onChange={(e) => setEmployee(prev=>({...prev,department:e.target.value}))} />
                ) : (
                  <p className='font-medium text-lg text-neutral-800 dark:text-white'>{employee.department}</p>
                )}
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-5'>
         <div className='flex flex-col bg-white drop-shadow-md rounded-lg p-5 border border-zinc-300 dark:bg-[#1a1a1a]
          dark:border-[#535353]'>
              <p className='text-neutral-900 text-lg underline mt-3 dark:text-white'>BASIC INFORMATION</p>
              <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-500 '>
                <p className='font-medium text-base text-neutral-700 dark:text-neutral-300'>Gender:</p>
                {isEdit ? (
                  <select className='max-w-20 bg-gray-100 dark:bg-transparent' value={employee.gender} 
                  onChange={(e) => setEmployee(prev=>({...prev,lastName:e.target.value}))}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p className='text-gray-600 dark:text-gray-200 text-base'>{employee.gender}</p>
                )}

                <p className='font-medium text-base text-neutral-700 dark:text-neutral-300'>DOB:</p>
                {isEdit ? (
                  <input className='max-w-28 bg-gray-100 dark:bg-transparent' type="date" value={employee.dob} 
                  onChange={(e) => setEmployee(prev=>({...prev,dob:e.target.value}))} />
                ) : (
                  <p className='text-gray-600 dark:text-gray-200 text-base'>{employee.dob}</p>
                )}

                <p className='font-medium text-base text-neutral-700 dark:text-neutral-300'>Salary:</p>
                {isEdit ? (
                  <input className='max-w-28 bg-gray-100 dark:bg-transparent' type="number" value={employee.salary} 
                  onChange={(e) =>setEmployee(prev=>({...prev,salary:e.target.value}))} />
                ) : (
                  <p className='text-gray-600 dark:text-gray-200 text-base'>{employee.salary}</p>
                )}

               <p className='font-medium text-base text-neutral-700 dark:text-neutral-300'>Working Type:</p>
                {isEdit ? (
                  <input className='max-w-28 bg-gray-100 dark:bg-transparent' type="number" value={employee.workingType} 
                  onChange={(e) =>setEmployee(prev=>({...prev,workingType:e.target.value}))} />
                ) : (
                  <p className='text-gray-600 dark:text-gray-200 text-base'>{employee.workingType}</p>
                )}

                <p className='font-medium text-base text-neutral-700 dark:text-neutral-300'>Joining Date:</p>
                <p className='text-gray-600 dark:text-gray-200 text-base'>{employee.joiningDate}</p>
              </div>
            </div>

            <div className='flex flex-col bg-white drop-shadow-md rounded-lg p-5 border border-zinc-300 dark:bg-[#1a1a1a]
             dark:border-[#535353]'>
              <p className='text-neutral-900 dark:text-white text-lg underline mt-3'>CONTACT INFORMATION</p>
              <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-500'>
                <p className='font-medium text-base text-neutral-700 dark:text-neutral-300'>Phone:</p>
                {isEdit ? (
                  <input className='bg-gray-100 max-w-52 dark:bg-transparent' type="text" value={employee.phone} 
                  onChange={(e) =>setEmployee(prev=>({...prev,phone:e.target.value}))} />
                ) : (
                  <p className='text-blue-400 text-base'>{employee.phone}</p>
                )}

                <p className='font-medium text-base text-neutral-700 dark:text-neutral-300'>Address:</p>
                {isEdit ? (
                  <input className='bg-gray-50 dark:bg-transparent' type="text" value={employee.address} 
                  onChange={(e) =>setEmployee(prev=>({...prev,address:e.target.value}))} />
                ) : (
                  <p className='text-gray-500 dark:text-gray-200 text-base'>{employee.address}</p>
                )}
              </div>
            </div>

            <div className='mt-10 flex gap-2'>
              {isEdit ? (
                <button className='border border-primary px-10 py-2 rounded-full bg-green-500 hover:bg-emerald-800
                 hover:text-white transition-all text-xl font-medium' onClick={()=>updateEmployeeProfileData(employee._id) }>
                  Save Information
                </button>
              ) : (
                <button className='border border-primary px-10 py-2 rounded-lg bg-green-500 hover:bg-green-800
                 hover:text-white transition-all text-xl font-medium' onClick={() => setIsEdit(true)}>
                  Edit
                </button>
              )}
              <button className='border border-primary px-10 py-2 rounded-lg bg-red-500 hover:bg-red-800
               hover:text-white transition-all text-lg font-normal'>
                Delete Employee
              </button>
            </div>
          </div>
        </div>

   </div>
       </div>
  )
}

export default EmployeeProfile