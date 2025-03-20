import axios from "axios"
import React, { useContext } from "react"
import { EmployeeContext } from "../../context/EmployeeContext"
import { toast } from "react-toastify"
import { AdminContext } from "../../context/AdminContext"


const NewTask = ({data}) => {
   
   const {token,backendUrl,setProfile} = useContext(EmployeeContext)
  const {aToken} = useContext(AdminContext)

   const taskdata = {taskId : data.taskId}

   const acceptTask = async()=>{
       try {
         const {data} = await axios.post(backendUrl + '/api/employee/accept-task',taskdata, {headers:{token}})
         if(data.success){
            toast.success(data.message)
            setProfile(data.employee)
        }else{
            toast.error(data.message)
         }
       } catch (error) {
         toast.error(error.message)
       }
   }

 
  return (
    <div className='flex flex-col justify-between flex-shrink-0 w-[300px] p-5  bg-white drop-shadow-md border
     border-zinc-300 dark:bg-[#1a1a1a] dark:border-[#535353] rounded-xl'>
              <div className='flex justify-between items-center '>
              <h3 className='bg-yellow-500 text-sm px-3 py-1 rounded'>{data.category}</h3>
              <h4 className='text-sm'>{data.date}</h4>
              </div>
              <h2 className='mt-5 text-xl font-semibold'>  {data.title}</h2>
              <p className='text-sm mt-2'>{data.description}</p>
              
              {aToken &&  <div className='mt-4'>
                    <button onClick={acceptTask} className='bg-blue-500 py-1 w-full text-md'>Not Accepted</button>
                 </div>
            }

             {token &&  <div className='mt-4'>
                    <button onClick={acceptTask} className='bg-blue-500 py-1 w-full text-md'>Accept Task</button>
                 </div>
            }
      </div>
   
  )
}

export default NewTask
