import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LeaveChart = ({leavedata}) => {

    if(!leavedata){
      return <div></div>
    }
    
    const data = [
        { name: 'Pending', value: leavedata.pendingRequest},
        { name: 'Approved', value: leavedata.approvedRequest},
        { name: 'Rejected', value: leavedata.rejectedRequest},
      ];

  return (
    <div className='w-full p-5 md:w-[48%] bg-white drop-shadow-md border rounded-xl dark:bg-[#1a1a1a] dark:border-[#535353]'>
    <ResponsiveContainer  height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="value" fill="#82ca9d" stroke="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
  )
}

export default LeaveChart