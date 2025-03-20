import React from 'react'

const FailedTask = ({data}) => {
  return (
    <div className='flex flex-col justify-between flex-shrink-0 w-[300px] p-5 bg-white drop-shadow-md border
     border-zinc-300 dark:bg-[#1a1a1a] dark:border-[#535353] rounded-xl'>
              <div className='flex justify-between items-center '>
              <h3 className='bg-yellow-500 text-sm px-3 py-1 rounded'>{data.category}</h3>
              <h4 className='text-sm'>{data.date}</h4>
              </div>
              <h2 className='mt-5 text-xl font-semibold'>  {data.title}</h2>
              <p className='text-sm mt-2'>{data.description}</p>

                   <div className='mt-2'>
                    <button  className='w-full bg-red-500 py-1 px-2 text-sm'>Failed</button>
                   </div>

      </div>

    
  )
}

export default FailedTask