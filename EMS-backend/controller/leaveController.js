// controllers/leaveController.js
const LeaveModel = require('../models/LeaveModel');
const employeeModel = require('../models/EmployeeModel');
const adminModel = require('../models/adminModel');

// Apply for leave:
module.exports.applyLeave = async (req, res) => {
  try {
    const { employeeId, leaveType, reason, duration, startDate, endDate } = req.body;

    if (!leaveType || !reason || !duration || !startDate || !endDate) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Find the employee
    const employee = await employeeModel.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found.' });
    }

    // Create leave request
    const newLeaveRequest = new LeaveModel({
      employeeId,
      leaveType,
      reason,
      duration,
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
      const leaveData = await LeaveModel.find({employeeId}).populate('employeeId').exec()
       
      if (!employeeId) {
        return res.status(400).json({ success: false, message: "Employee not authorized!" });
      }
        
      if (!leaveData || leaveData.length === 0) {
        return res.status(404).json({ success: false, message: 'No leave data found!' });
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


// View leave status:
module.exports.viewLeaveStatus = async (req, res) => {
  try {
    const { employeeId } = req.body;

    const employee = await employeeModel.findById(employeeId).populate('leaves');
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found.' });
    }

    return res.status(200).json({ success: true, leaves: employee.leaves });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin approve/reject leave:
module.exports.manageLeave = async (req, res) => {
  try {
    const { leaveId, status, rejectionReason } = req.body;
    const { adminId } = req.params; // Admin ID passed in route parameters

    if (!status || !['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }

    const leaveRequest = await LeaveModel.findById(leaveId);
    if (!leaveRequest) {
      return res.status(404).json({ success: false, message: 'Leave request not found.' });
    }

    // Ensure the leave status is pending before changing it
    if (leaveRequest.status !== 'pending') {
      return res.status(400).json({ success: false, message: 'Leave request has already been processed.' });
    }

    // Update leave status
    leaveRequest.status = status;
    leaveRequest.rejectionReason = status === 'rejected' ? rejectionReason : null;
    leaveRequest.approvedBy = status === 'approved' ? adminId : null;

    await leaveRequest.save();

    // Update employee's leave record
    const employee = await employeeModel.findById(leaveRequest.employeeId);
    if (employee) {
      const leaveIndex = employee.leaves.indexOf(leaveId);
      if (leaveIndex !== -1) {
        employee.leaves[leaveIndex] = leaveRequest._id;
        await employee.save();
      }
    }

    return res.status(200).json({ success: true, message: `Leave request ${status} successfully.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
