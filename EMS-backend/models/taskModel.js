const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
      employeeId:{type:mongoose.Schema.Types.ObjectId, ref:'employee', required:true},
      taskId:{type:Number},
      title:{type:String, required:true},
      description:{type:String, required:true},
      date:{type:String, required:true,default:Date.now()},
      category:{type:String, required:true},
      deadline: { type: Date, required: true },
      active:{type:Boolean, default:false},
      newTask:{type:Boolean, default:false},
      completed:{type:Boolean, default:false},
      failed:{type:Boolean, default:false},
      isReminderSent: { type: Boolean, default: false },
})

const taskModel = mongoose.models.task || mongoose.model('task',taskSchema)

module.exports = taskModel;