import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/common/Sidebar'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import LeaveData from '../../components/Admin/LeaveData'
import { AdminContext } from '../../context/AdminContext'


const LeaveStats = () => {

  const{getLeaveRequests,leaveData } = useContext(AdminContext)

  const pendingRequest = leaveData.filter(item=>item.status==='pending').length
  const approvedRequest = leaveData.filter(item=>item.status==='approved').length
  const rejectedRequest = leaveData.filter(item=>item.status==='rejected').length

   
  useEffect(()=>{   
     getLeaveRequests()
  },[])

 
  return (
    <div  className='w-full flex'>
    <Sidebar/>
      <div className='w-full sm:ml-[10rem] md:ml-[19.6rem]'>
       <AdminNavbar/>
       <div className='px-3 py-3 w-full bg-slate-50 dark:bg-[#101013] dark:text-white'>
       <h1 className='font-medium text-2xl text-neutral-800 dark:text-white mt-2'>Leave Stats</h1>

      <div className='mt-1 flex flex-col gap-3'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>

          <div className='bg-emerald-400 flex justify-between items-start  gap-2 p-4 px-4 rounded-xl'>
          <div className='flex flex-col gap-2'>
          <h2 className='text-lg font-medium leading-tight text-neutral-900'>Total Request</h2>
          <p className='font-semibold text-3xl text-neutral-800'>{leaveData.length}</p>
          </div>
          <i className="ri-archive-stack-fill font-medium text-2xl sm:text-3xl text-neutral-900"></i>
          </div>
          
          <div className='bg-emerald-400 flex justify-between items-start  gap-2 p-4 px-4 rounded-xl'>
          <div className='flex flex-col gap-2'>       
          <h2 className='text-lg font-medium leading-tight text-neutral-900'>Pending Request</h2>
          <p className='font-semibold text-3xl text-neutral-800'>{pendingRequest}</p>
          </div>
          <i className="ri-timer-2-fill font-medium text-2xl sm:text-3xl text-neutral-900"></i>
          </div>

          <div className='bg-emerald-400 flex justify-between items-start  gap-2 p-4 px-4 rounded-xl'>
          <div className='flex flex-col gap-2'>
          <h2 className='text-lg font-medium leading-tight text-neutral-900'>Approved Request</h2>
          <p className='font-semibold text-3xl text-neutral-800'>{approvedRequest}</p>
          </div>
          <i className="ri-checkbox-multiple-fill font-medium text-2xl sm:text-3xl text-neutral-900"></i>
          </div>

          <div className='bg-emerald-400 flex justify-between items-start  gap-2 p-4 px-4 rounded-xl'>
          <div className='flex flex-col gap-2'>
          <h2 className='text-lg font-medium leading-tight text-neutral-900'>Rejected Request</h2>
          <p className='font-semibold text-3xl text-neutral-800'>{rejectedRequest}</p>
          </div>
          <i className="ri-calendar-close-fill font-medium text-2xl sm:text-3xl text-neutral-900"></i>
          </div>
         
          </div>
        <LeaveData/>
       </div>
     
       </div>
       </div>
  </div>
  )
}

export default LeaveStats