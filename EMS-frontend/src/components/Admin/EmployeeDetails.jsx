import React from 'react'

const EmployeeDetails = ({adminData}) => {
  if (!adminData || !adminData.summary) {
    return <div>Loading...</div>;  
  }

  return (
    <div  className='bg-white drop-shadow-md p-5 mt-5 rounded-xl relative  max-w-full border border-zinc-300 dark:bg-[#1a1a1a]
                 dark:border-[#535353] '>

    <h1 className='font-medium text-2xl text-neutral-800 dark:text-white'>Employee Details</h1>

    <div className='overflow-x-auto'>
 
        <div className='mt-5 mb-2 py-2 px-4 flex items-center justify-between gap-6 lg:gap-2 rounded w-fit md:w-full bg-emerald-500'>
     
           <h2 className='text-base font-light w-32 lg:w-1/5'>Employee</h2>
           <h3 className= 'text-base font-light w-32 lg:w-1/5'>Position</h3>
           <h5  className= 'text-base font-light w-32 lg:w-1/5'>Department</h5>
           <h5  className= 'text-base font-light w-32 lg:w-1/5'>Working Type</h5>
           
          
         </div>
  
         <div className='overflow-y-auto w-fit md:w-full max-h-[30vh]'>
          {
          adminData.summary.map((employee,index)=>(
            
        <div key={index} className='border-2 border-emerald-600 mb-2 py-2 px-4 flex gap-6 lg:gap-2 items-center justify-between rounded'>
        
       
        <div className='w-32 lg:w-1/5 flex gap-2 items-center'><img src={employee.image}
        className='w-12 h-12  rounded-full' alt="" />

       <h2 className='text-base lg:text-lg font-light w-28 lg:w-1/5'> {employee.employeeName.firstName} {employee.employeeName.lastName}</h2>
     </div>
 
    <h3 className= 'text-base  font-light w-32 lg:w-1/5 text-blue-400 px-2'>{employee.position}</h3>
    <h3 className= 'text-base  font-light w-32 lg:w-1/5 text-blue-400 px-2'>{employee.department}</h3>
    <h3 className= 'text-base  font-light w-32 lg:w-1/5 text-blue-400 px-2'>{employee.workingType}</h3>

   </div>
          ))
        } 
    
        </div>
        </div>

   </div>

  )
}

export default EmployeeDetails