const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
 departmentName:{type:String, required:true},
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admin' },
});

// Create a compound unique index on departmentName and adminId
departmentSchema.index({ departmentName: 1, adminId: 1 }, { unique: true });

const departmentModel = mongoose.models.department || mongoose.model('department', departmentSchema);

module.exports = departmentModel;
