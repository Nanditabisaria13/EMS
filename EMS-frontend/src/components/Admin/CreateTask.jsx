import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const CreateTask = () => {
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [deadline, setDeadline] = useState('')
    const [employeeName, setEmployeeName] = useState('')
    const [employeeEmail, setEmployeeEmail] = useState('')
    const [category, setCategory] = useState('' )
    
    const{backendUrl, aToken,getAllEmployees} = useContext(AdminContext)

         const submitHandler = async(e)=>{
         e.preventDefault();
   
        try {
    
          const dataToSend = {
            title,
            description,
            date,
            employeeName,
            employeeEmail,
            category,
            deadline
          };
          const {data} = await axios.put( backendUrl +'/api/admin/add-newTask' ,dataToSend, {headers:{aToken}})
    
          if(data.success){
             toast.success(data.message)
             getAllEmployees()

             setTitle('')
             setDescription('')
             setDate('')
             setEmployeeName('')
             setEmployeeEmail('')
             setCategory('')
             setDeadline('')
    
          }else{
            toast.error("request not send")
          }
        } catch (error) {
          toast.error("Bad request")
          console.log(error.message)
        }
     }

  return (
    <div className='p-5 bg-white drop-shadow-md dark:bg-[#1a1a1a] border relative  dark:border-[#535353] rounded max-w-full'>
    <h1 className='font-medium text-2xl text-neutral-800 dark:text-white'>Create a New Task</h1>
         <form
          onSubmit={submitHandler}
         className='flex flex-col gap-8 mt-3 md:grid grid-cols-2 '>
             <div className='w-full '>
             <div className='flex flex-col gap-2 w-full '>
             <h3 className='text-base text-gray-900 mb-0.5 dark:text-white' >Task Title</h3>
             <input className='text-sm py-1 px-2 w-full rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
              type="text" placeholder='Make a UI design' 
              value={title} 
              onChange={(e)=>setTitle(e.target.value)}/>
             </div>

             <div className='flex flex-col gap-2 w-full'>
               <h3 className='text-base text-gray-900 mb-0.5 dark:text-white'>Date</h3>
               <input  className='text-sm py-1 px-2 w-full rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                type="date"
                value={date} 
                onChange={(e)=>setDate(e.target.value)} />
               </div>

               <div className='flex flex-col gap-2 w-full'>
                <h3 className='text-base text-gray-900 mb-0.5 dark:text-white'>Assign To</h3>
                <input className='text-sm py-1 px-2  w-full rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                value={employeeName} 
                onChange={(e)=>setEmployeeName(e.target.value)} 
                 type="text" placeholder='Employee Name'/>

                <input className='text-sm py-1 px-2 w-full rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                value={employeeEmail} 
                onChange={(e)=>setEmployeeEmail(e.target.value)} 
                 type="text" placeholder='Employee Email'/>
                 
                </div>
                

                <div className='flex flex-col gap-2 w-full'>
                <h3 className='text-base text-gray-900 mb-0.5 dark:text-white'>Catagory</h3>
                <input 
                value={category} 
                onChange={(e)=>setCategory(e.target.value)}
                className='text-base py-1 px-2 w-full rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                 type="text" placeholder='design,dev,etc' />
                </div>

             

             </div>
             
             <div className='glex flex-col gap-4'>
             <div className='flex flex-col gap-2 w-full'>
               <h3 className='text-base text-gray-900 mb-0.5 dark:text-white'>Deadline</h3>
               <input  className='text-sm py-1 px-2 w-full rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                type="date"
                value={deadline} 
                onChange={(e)=>setDeadline(e.target.value)} />
               </div>
             <div className=' flex flex-col gap-2'>
             <h3 className='text-base text-gray-900 mb-0.5 dark:text-white'>Description</h3> 
             <textarea className='w-full h-44 text-sm py-2 px-4 bg-transparent rounded outline-none border-[1px] border-gray-600' name="" id=""
              value={description}
             onChange={(e)=>setDescription(e.target.value) }
             ></textarea>
             
              <button type='submit' className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-lg mt-4 w-full'>Create Task</button>
             </div>
             </div>
          
         </form>

     </div>
  )
}

export default CreateTask