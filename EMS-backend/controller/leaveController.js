// controllers/leaveController.js
const LeaveModel = require('../models/LeaveModel');
const employeeModel = require('../models/EmployeeModel');
const adminModel = require('../models/adminModel');

// Apply for leave:
module.exports.applyLeave = async (req, res) => {
  try {
    const { employeeId,leaveType, reason, duration,durationType, startDate, endDate, } = req.body;
  
    if (!leaveType || !reason || !duration || !startDate || !endDate) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Find the employee
    const employee = await employeeModel.findById(employeeId);
    if (!employee) {
      return res.status(401).json({ success: false, message: 'Employee not found.' });
    }

  
    // Create leave request
    const newLeaveRequest = new LeaveModel({
      employeeId,
      leaveType,
      reason,
      duration,
      durationType,
      reason,
      startDate,
      endDate,
      adminId: employee.adminId._id
    });

    // Save the leave request
    await newLeaveRequest.save();
   
    // Add the leave to the employee's leave history
    employee.leaves.push(newLeaveRequest._id);
    await employee.save();
    
    return res.status(200).json({ success: true, message: 'Leave request submitted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// get leave data:
module.exports.getLeaveData = async(req,res)=>{
     try {
      const adminId = req.adminId; 

      if (!adminId) {
        return res.status(400).json({ success: false, message: "Admin not authorized!" });
      }
  
      const leaveData = await LeaveModel.find({adminId}).populate('employeeId').exec();
    
      if(!leaveData){
        return res.status(404).json({success:false, message:'No Leave Data found!'})
      }
      
      return res.status(200).json({success:true,leaveData})
     } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
     }
}

// get leave data for employee:
module.exports.getEmployeeLeaveData = async(req,res)=>{
    try {
      const {employeeId} = req.body
       
      if (!employeeId) {
        return res.status(400).json({ success: false, message: "Employee not authorized!" });
      }
      const leaveData = await LeaveModel.find({employeeId})
        
      if (!leaveData) {
        return res.status(401).json({ success: false, message: 'No leave data found!' });
      }

      return res.status(200).json({ success: true, leaveData });
   
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
    }
}

// approved the leave request:
module.exports.approvedLeaveRequest = async(req,res)=>{
  try {
    const {leaveId} = req.body

   await LeaveModel.findByIdAndUpdate(leaveId,{status:'approved'})
      return res.status(200).json({success:true, message:'Leave request approved successfully'})
   
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  } 
}

// reject the leave request:
module.exports.rejectLeaveRequest = async(req,res)=>{
  try {
    const {leaveId} = req.body
  
      await LeaveModel.findByIdAndUpdate(leaveId,{status:'rejected'})
      return res.status(200).json({success:true, message:'Leave request rejected successfully'})
   
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  } 
}

