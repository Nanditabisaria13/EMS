import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const PerformanceChart = ({ tasksData }) => {
     
     if(!tasksData){
      return <div></div>
     }  

  const data = [
    {
      name: 'Tasks',
      Active: tasksData.activeTasks,
      Completed: tasksData.completedTasks,
      Failed: tasksData.failedTasks,
    },
  ]
  
 
  return (
     
      <div className='w-full p-5 md:w-[48%] bg-white drop-shadow-md border rounded-xl dark:bg-[#1a1a1a] dark:border-[#535353]'>

      <ResponsiveContainer height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Active" fill="#8884d8"  barSize={40}  />
        <Bar dataKey="Completed" fill="#82ca9d" barSize={40} />
        <Bar dataKey="Failed" fill="#ff6666" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
    
    </div>
  )
  
  
}


export default PerformanceChart
