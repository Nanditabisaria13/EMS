import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import Navbar from '../components/common/Navbar'
import { assets } from '../assets/assets'

const Signup = () => {

  const{backendUrl,setAToken } = useContext(AdminContext)
  const [passwordVisible, setPasswordVisible] = useState(false)

    const[firstName,setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[email,setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[dob, setDob] = useState('1 Year')
    const[phone, setPhone] = useState('')
    const[gender, setGender] = useState('')
    const[address, setAddress] = useState('')
     
      const onSubmitHandler = async(e)=>{
        e.preventDefault()
       console.log('signup')
        try {
      
      const {data} = await axios.post(backendUrl +'/api/admin/register' ,{firstName,lastName,email,password,dob,gender,phone,address})
    
           if(data.success){
             toast.success('Successfully Registered Your Account')
              localStorage.setItem('aToken', data.token)
              setAToken(data.token)
            
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setDob('')
            setPhone('')
            setGender('')
            setAddress('')
           } else{
            toast.error('error')
           }
        } catch(error) {
          toast.error('Something went wrong!')
          console.log(error.message)
        }
      }
  

  return (
    <div className='w-full h-full'>
    <Navbar/> 

    <div className='p-4 py-5 flex items-center justify-between gap-20 w-full'>
    <form className='p-10 bg-white border drop-shadow-md flex flex-col items-center justify-between gap-5 rounded-xl m-auto 
                  dark:bg-[#1a1a1a] dark:border-[#535353] lg:w-[50%]'
           onSubmit={onSubmitHandler}>
       
          <h1 className='font-medium text-3xl text-emerald-800 dark:text-emerald-400'>Want's to join us, please Sing up</h1>
         <div className='flex flex-col sm:flex-row items-start justify-between gap-4 w-full'>
              <div className='flex flex-col gap-2 w-full'>
              <h3 className='text-lg text-zinc-800 font-medium dark:text-zinc-200'>FirstName</h3>
            <input type="text" value={firstName} placeholder='firstName' onChange={(e)=>setFirstName(e.target.value)} 
               className='bg-[#eeeeee] border border-zinc-300 text-lg placeholder:text-base rounded-lg w-full  px-2 py-2
                          dark:bg-transparent'  />
              </div>

              <div className='flex flex-col gap-2 w-full'>
              <h3 className='text-lg text-zinc-800 font-medium dark:text-zinc-200'>LastName</h3>
            <input type="text" value={lastName} placeholder='lastName' onChange={(e)=>setLastName(e.target.value)} 
                 className='bg-[#eeeeee] border border-zinc-300 text-lg placeholder:text-base rounded-lg w-full  px-2 py-2
                             dark:bg-transparent '  />
              </div>
         </div>
      
         <div className='flex flex-col sm:flex-row items-start justify-between gap-4 w-full'>
         <div className='flex flex-col gap-2 w-full'>
              <h3 className='text-lg text-zinc-800 font-medium dark:text-zinc-200'>Email</h3>
            <input type="email" value={email} placeholder='email' onChange={(e)=>setEmail(e.target.value)} 
               className='bg-[#eeeeee] border border-zinc-300 text-lg placeholder:text-base rounded-lg w-full  px-2 py-2
                    dark:bg-transparent '  />
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
     </div> 
     

     <div className='flex flex-col sm:flex-row items-start justify-between gap-4 w-full'>
         <div className='flex flex-col gap-2 w-full'>
              <h3 className='text-lg text-zinc-800 font-medium dark:text-zinc-200'>Phone</h3>
            <input type="text" value={phone} placeholder='phone' onChange={(e)=>setPhone(e.target.value)} 
                className='bg-[#eeeeee] border border-zinc-300 text-lg placeholder:text-base rounded-lg w-full  px-2 py-2
                         dark:bg-transparent'  />
         </div>

              <div className='flex flex-col gap-2 w-full'>
              <h3 className='text-lg text-zinc-800 font-medium dark:text-white '>Address</h3>
            <input type="text" value={address} placeholder='Enter address' onChange={(e)=>setAddress(e.target.value)} 
                 className='bg-zinc-100  border border-zinc-300 text-lg placeholder:text-base rounded-lg w-full px-4 py-2 
                    dark:bg-transparent'  />
              </div>

         </div>

         <div className='flex flex-col sm:flex-row items-start justify-between gap-4 w-full'>
              <div className='flex flex-col gap-2 w-full'>
              <h3 className='text-lg text-zinc-800 font-medium dark:text-white '>Dob</h3>
            <input type="date" value={dob} placeholder='dob' onChange={(e)=>setDob(e.target.value)} 
                className='bg-zinc-100 border border-zinc-300 text-lg placeholder:text-base rounded-lg w-full px-4 py-2 
                   dark:bg-transparent'  />
              </div>

              <div className='flex flex-col gap-2 w-full'>
              <h3 className='text-lg text-zinc-800 font-medium dark:text-white '>Gender</h3>
            <input type="text" value={gender} placeholder='gender' onChange={(e)=>setGender(e.target.value)} 
              className='bg-zinc-100 border border-zinc-300 text-lg placeholder:text-base rounded-lg w-full px-4 py-2 
                   dark:bg-transparent'  />
              </div>
         </div>

                       
         <button type='submit' className='bg-emerald-600 text-white px-4 py-2 w-full text-lg font-light rounded-lg'>Create Account</button>

         <p className='text-base font-normal text-zinc-900 dark:text-zinc-200'>Already have an Account? 
         <Link to='/login' className='text-emerald-600 font-medium text-xl underline cursor-pointer'>Login here</Link>
        </p>
    </form>

    <div className='hidden lg:block w-[45%] ' >
       <img src={assets.signupImage} alt="" className='w-full h-full'/>
    </div>
  </div>

  </div>
  )
}

export default Signup
