const employeeModel = require('../models/EmployeeModel')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2

module.exports.registerEmployee = async(req,res)=>{
    try {
        
        const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
     }

        const {fullName,email,password} = req.body

        if(!fullName || !email || !password){
           return res.status(400).json({success:false, message:"Missing Fields"})
        }
          
    
        const isEmployeeAlreadyExists = await employeeModel.findOne({email})
        if(isEmployeeAlreadyExists){
            return res.status(400).json({success:false, message:"Employee already exists"})
        }
        
        // hashed password:
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const employeeData = {
            fullName:fullName,
            email:email,
            password:hashedPassword,
        }

        const newEmployee = new employeeModel(employeeData)
        const employee = await newEmployee.save()

        // generate token

        const token = jwt.sign({id:employee._id},process.env.JWT_SECRET)
         return res.status(200).json({success:true,token})


    } catch (error) {
      console.log(error)
      res.status(500).json({success:false, message:error.message})
    }
}

module.exports.loginEmployee = async(req,res)=>{
     try {
        const errors = validationResult(req)
     if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
     }

     const {email,password} = req.body

     const employee = await employeeModel.findOne({email})

     if(!employee){
         return res.status(400).json({success:false, message:"Invalid Email or Password"})
     }

     const isMatch = bcrypt.compare(password,employee.password)

      if(isMatch){
        const token = jwt.sign({id:employee._id},process.env.JWT_SECRET)
        res.cookie('token',token)
        return res.status(200).json({success:true,token})
      }else{
        return res.status(400).json({success:false,message:'Invalid Credentials'})
      }
     } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message})
     }
}

module.exports.getEmployee = async(req,res)=>{
    try {
       const {employeeId} = req.body
       const employee = await employeeModel.findById(employeeId).select('-password') 
       return res.status(200).json({success:true, employee})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}

module.exports.logoutEmployee = async(req,res)=>{
  res.clearCookie('token')
  return res.status(200).json({success:true,message:'Logged Out!'})
}

module.exports.updateProfile = async(req,res)=>{
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    }

    const{employeeId,firstName, lastName, phone, address, dob , gender,email,position,department,salary } = req.body
    const imageFile = req.file
  
    const employee = await employeeModel.findById(employeeId);

    if (!employee) {
      return res.status(404).json({success:false, message: 'Something went wrong!' });
    }

      // Update employee details
    const updatedEmployeeData = {
      'fullName.firstName': firstName,
      'fullName.lastName': lastName,
      email: email,
      dob: dob,
      gender: gender,
      address: address,
      phone: phone,
      position: position,
      department: department,
      salary: salary,
    }; 

    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      employeeId,          
      { $set: updatedEmployeeData }, 
      { new: true }    
    );

    if (!updatedEmployee) {
      return res.status(404).json({success:false, message: 'Something Went Wrong!' });
    }


      if(imageFile){
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
        const imageUrl = imageUpload.secure_url
        await employeeModel.findByIdAndUpdate(employeeId,{image:imageUrl})
      }
      return res.status(200).json({success:true, message:"Profie Updated Successfully",updatedEmployee})
     
  } catch (error) {
    console.log(error)
    return res.status(500).json({success:false,message:error.message})
  }
}

module.exports.acceptTask = async(req,res)=>{
  try {
      const {employeeId,taskId} = req.body
      const employee = await employeeModel.findOneAndUpdate(
        {_id:employeeId, "tasks.taskId":parseInt(taskId)},
        {
          $set:{
              "tasks.$.active":true,
              "tasks.$.newTask":false,
          }
        },
        {new:true}
      )  
      if(!employee){
        return res.status(400).json({success:false, message:"Something went wrong!"})
      }
  
      employee.taskNumbers.active += 1
      employee.taskNumbers.newTask -= 1
       
      await employee.save()
      return res.status(200).json({success:true,employee})
  
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({success:false, message:error.message})
  }
}

module.exports.markTaskCompleted = async(req,res)=>{
  try {
    const {employeeId,taskId} = req.body
    const employee = await employeeModel.findOneAndUpdate(
      {_id:employeeId, "tasks.taskId":parseInt(taskId)},
      {
        $set:{
            "tasks.$.completed":true,
            "tasks.$.active":false,
          
        }
      },
      {new:true}
    )  
    if(!employee){
      return res.status(400).json({success:false, message:"Something went wrong!"})
    }

    employee.taskNumbers.completed += 1
    employee.taskNumbers.active -= 1
     
    const updatedEmployee = await employee.save()
    return res.status(200).json({success:true,message:'Task Completed',updatedEmployee}) 

  } catch (error) {
    console.log(error)
    return res.status(500).json({success:false, message:error.message})
  }
}

module.exports.markTaskFailed = async(req,res)=>{
   try {
     const {employeeId,taskId} = req.body
    const employee = await employeeModel.findOneAndUpdate(
      {_id:employeeId, "tasks.taskId":parseInt(taskId)},
      {
        $set:{
            "tasks.$.failed":true,
            "tasks.$.active":false,
          
        }
      },
      {new:true}
    )  
    if(!employee){
      return res.status(400).json({success:false, message:"Something went wrong!"})
    }

    employee.taskNumbers.failed += 1
    employee.taskNumbers.active -= 1
     
    const updatedEmployee = await employee.save()
    return res.status(200).json({success:true,message:'Task Failed',updatedEmployee}) 
      
   } catch (error) {
    console.log(error)
    return res.status(500).json({success:false, message:error.message})
   }
}

module.exports.employeeDashboard = async(req,res)=>{
  try {
    const {employeeId} = req.body
     const employee = await employeeModel.findById(employeeId)
     
     if(!employee){
      return res.status(400).json({success:false, message:"Something went wrong!"})
     }

    const EmployeeDashData ={
      employee:employee.fullName,
      name: employee.fullName.firstName,
      totalTask:employee.tasks,
      activeTasks: employee.taskNumbers.active,
      newTasks:employee.taskNumbers.newTask,
      completedTasks:employee.taskNumbers.completed,
      failedTasks:employee.taskNumbers.failed,
      leaveData:employee.leaves
    }
  

    return res.status(200).json({success:true, EmployeeDashData})


  } catch (error) {
    console.log(error)
    return res.status(500).json({success:false, message:error.message})
  }
}



