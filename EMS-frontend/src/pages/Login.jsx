import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { EmployeeContext } from '../context/EmployeeContext'
import Navbar from '../components/common/Navbar'
import { assets } from '../assets/assets'

const Login = () => {
    
    const[state,setState] = useState('Admin')
    const[email,setEmail] = useState('')
    const[password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)

    const {setAToken,backendUrl} = useContext(AdminContext)  
    const {setToken} = useContext(EmployeeContext)  

    const navigate = useNavigate()
    
    const submitHandler = async(e)=>{
     
      e.preventDefault()
     
      try {
        if(state==='Admin'){
          const{data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
          if(data.success){
            localStorage.setItem('aToken',data.token)
            setAToken(data.token)
            navigate('/admin-dashboard')
          }else{
            toast.error('Invalid Credentials!')
          }}
          if(state==='employee'){
            const{data} = await axios.post(backendUrl + '/api/employee/login',{email,password})
            if(data.success){
              localStorage.setItem('token',data.token)
              setToken(data.token)
              navigate('/employee-dashboard')
          }
          else{
            toast.error('Invalid Credentials!')
          }
        }
      }  catch (error) {
         toast.error('Something went wrong!')
     }
    }

  

  return (
    <div className='w-full h-screen'>

      <Navbar/> 

      <div className='p-4 py-5 flex items-center justify-center gap-20 w-full mt-5'>

    <form className='p-10 bg-white border drop-shadow-md flex flex-col items-center justify-between gap-5 rounded-xl m-auto
                      dark:bg-[#1a1a1a] dark:border-[#535353]'
           onSubmit={submitHandler}>
       
          <h1 className='font-medium text-2xl text-emerald-800 dark:text-emerald-400'>Welcome, Login to your Dashboard</h1>

         <div className='flex flex-col gap-2 w-full'>
              <h3 className='text-lg text-zinc-800 font-medium dark:text-zinc-200'>Email</h3>
            <input type="email" value={email} placeholder='email' onChange={(e)=>setEmail(e.target.value)} 
             className='bg-[#eeeeee] border border-zinc-300 text-lg placeholder:text-base rounded-lg w-full px-2 py-2 
                         dark:bg-transparent'  />
         </div>

      
          <div className='flex flex-col gap-2 w-full relative'>
             <h3 className='text-lg text-zinc-800 font-medium dark:text-zinc-200'>Password</h3>
              <input type={passwordVisible ? 'text' : 'password'} value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)}
                className='bg-[#eeeeee] border border-zinc-300 text-lg placeholder:text-base rounded-lg w-full px-2 py-2 dark:bg-transparent' />
                        
                 {/* Eye icon to toggle password visibility */}
                 <div className="absolute right-2 top-1/2 cursor-pointer"
                   onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? <i className="ri-eye-line text-xl text-zinc-700 dark:text-zinc-300"></i> :
                                       <i className="ri-eye-off-line text-xl text-zinc-700 dark:text-zinc-300"></i>}
                        </div>
                    </div>
       {
        state==='Admin'? <div className='w-full flex flex-col gap-5 items-center'>
          <button type='submit' className='bg-emerald-600 text-white px-4 py-2 w-full text-lg font-light rounded-lg'>
          Sign in</button>
          <p className='text-base font-normal text-zinc-900 dark:text-zinc-200'>Login as an employee? 
            <Link onClick={()=>setState('employee')}
           className='text-emerald-600 font-medium text-xl underline cursor-pointer dark:text-emerald-500'>Login Employee</Link>   </p>
          </div>
          :
         <div  className='w-full flex flex-col gap-5 items-center'>  
        <button type='submit' className='bg-emerald-600 text-white px-4 py-2 w-full text-lg font-light rounded-lg'>
          Login Employee</button>
     <p className='text-base font-normal text-zinc-900 dark:text-zinc-200'>Login as an admin?  
         <Link onClick={()=>setState('Admin')}
         className='text-emerald-600 font-medium text-xl underline cursor-pointer'>Login Admin</Link>  </p>
         </div>
       }
         
    </form>

    <div className='hidden md:block md:w-2/5 m-auto'>
       <img src={assets.loginImage} alt="" className='w-full' />
    </div>
  </div>

  </div>
  )
}

export default Login