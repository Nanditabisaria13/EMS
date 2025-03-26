const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'employee', required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admin',required:true },
  leaveType: { type: String, required: true }, 
  reason: { type: String, required: true },
  duration: { type: String, required: true }, 
  durationType: { type: String, required: true }, 
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'admin', default: null },
  rejectionReason: { type: String, default: null },
  appliedOn: { type: Date, default: Date.now },
});

const LeaveModel = mongoose.models.leave || mongoose.model('Leave', leaveSchema);

module.exports = LeaveModel;
