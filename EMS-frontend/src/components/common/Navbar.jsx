import React from 'react'
import { useNavigate } from 'react-router-dom'
import DarkModeToggler from './DarkModeToggler'


const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='sticky top-0 left-0 w-full flex items-start justify-between z-50 p-5 bg-white drop-shadow-md border-b
                    border-zinc-300 dark:bg-[#1a1a1a] dark:border-[#535353] '>
      
      <div className='logo'>
       <h1 onClick={()=>navigate('/')} className='text-emerald-800 font-semibold text-3xl dark:text-emerald-500 cursor-pointer'>
        E.M.S.</h1>
      </div>

      <div className='flex items-center justify-between gap-3 sm:gap-5'>
        <DarkModeToggler/>
        <button onClick={()=>navigate('/signup')} className='text-white bg-emerald-800 rounded-full font-medium text-xl py-2 px-6 hidden sm:block dark:bg-emerald-600'>Sign up</button>
        <i onClick={()=>navigate('/signup')} className="ri-account-box-line text-2xl text-neutral-800 dark:text-white block sm:hidden"></i>
        <button onClick={()=>navigate('/login')} className='text-white bg-emerald-800 rounded-full font-medium text-xl py-2 px-6 hidden sm:block dark:bg-emerald-600'>Login</button>
        <i  onClick={()=>navigate('/login')} className="ri-login-box-line text-2xl text-neutral-800 dark:text-white block sm:hidden"></i>
      </div>
      </div>
  
  )
}

export default Navbar

