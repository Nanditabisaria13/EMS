import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col gap-1 mt-3 p-2 cursor-pointer'>
    <div className='flex flex-col justify-between items-center md:flex-row py-3 border-b border-neutral-400 p-3 gap-3'>
    <div className='logo w-full md:w-[30%] text-center md:text-left'>
  
       <h1  className='text-emerald-800 font-semibold text-3xl dark:text-emerald-500'>E.M.S.</h1>
      </div>

      <div className='flex flex-col gap-3 items-center '>
        <h1 className='text-lg font-base text-neutral-900 dark:text-neutral-200'>Contact With Us:</h1>
        <div className='flex gap-5'>       
        <div className='flex gap-2 w-full md:w-[30%]'>
        <i className="ri-phone-fill text-lg font-base"></i>
          <h3 className='text-blue-500 text-lg font-base'>123457890</h3>
        </div>
        <div className='flex gap-2 w-full md:w-[30%]'>
        <i className="ri-mail-unread-fill text-lg font-base"></i>
          <h3 className='text-blue-500 text-lg font-base'>ems_work@email.com</h3>
        </div>
        </div>
      </div>

      <div className='flex gap-2 w-full md:w-[30%] '>
      <i className="ri-map-pin-fill text-lg font-base"></i>
        <h3 className='text-neutral-900 text-lg font-base dark:text-neutral-200'> 3rd floor, Near Charch Road, Civil Lines, New Delhi</h3>
      </div>
    </div> 

    <div className='flex items-center justify-center gap-4 py-3 border-b border-neutral-400 p-3'>
    <i className="ri-linkedin-box-fill text-3xl font-semibold"></i>
    <i className="ri-instagram-fill text-3xl font-semibold"></i>
    <i className="ri-youtube-fill text-3xl font-semibold"></i>
    <i className="ri-facebook-circle-fill text-3xl font-semibold"></i>
    </div>

    <div className='flex items-center justify-center p-3'>
    <p className='text-lg text-neutral-800 font-base dark:text-neutral-200'>© 2024 All rights Reserved  Pvt. Ltd. • Privacy • Terms• EULA • Cancellation & Refund • Corporate Information</p>
    </div>
   
    </div>
  )
}

export default Footer