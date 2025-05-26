const adminModel = require('../models/adminModel')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const employeeModel = require('../models/EmployeeModel')
const cloudinary = require('cloudinary').v2
const taskModel = require('../models/taskModel')
const departmentModel = require('../models/DepartmentModel')
const mongoose = require('mongoose')
const LeaveModel = require('../models/LeaveModel')


// api for register admin:
module.exports.registerAdmin = async(req,res)=>{
  try {
      
      const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
   }

      const {firstName,lastName,email,password,dob,gender,phone,address} = req.body
      console.log(req.body)

      if(!firstName || !email || !password){
         return res.status(400).json({success:false, message:"Missing Fields"})
      }
        
  
      const isAdminAlreadyExists = await adminModel.findOne({email})
      if(isAdminAlreadyExists){
          return res.status(400).json({success:false, message:"User already exists"})
      }
      
      // hashed password:
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password,salt)

      const AdminData = {
        fullName: {
          firstName,
          lastName,
        },
        email,
        password: hashedPassword,
        dob,
        gender,
        phone,
        address
      }

      const newAdmin = new adminModel(AdminData)
      const admin = await newAdmin.save()

      // generate token

      const token = jwt.sign({id:admin._id},process.env.JWT_SECRET)
       return res.status(200).json({success:true, message:'Successfully created your account',token})


  } catch (error) {
    console.log(error)
    res.status(500).json({success:false, message:error.message})
  }
}

// api for login admin:
module.exports.loginAdmin = async(req,res)=>{
  try {
    const errors = validationResult(req)
 if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
 }

 const {email,password} = req.body

 const admin = await adminModel.findOne({email})

 if(!admin){
     return res.status(400).json({success:false, message:"Invalid Email or Password"})
 }

 const isMatch = bcrypt.compare(password,admin.password)

  if(isMatch){
    const token = jwt.sign({id:admin._id},process.env.JWT_SECRET)
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

// api for logout admin:
module.exports.logoutAdmin = async(req,res)=>{
    res.clearCookie('token')
    return res.status(200).json({success:true,message:'Logged Out!'})
}

// api for get the profile:
module.exports.getProfile = async(req,res)=>{
  try {
    const adminId = req.adminId
    const admin = await adminModel.findById(adminId).select('-password') 
    return res.status(200).json({success:true, admin})
 } catch (error) {
     console.log(error)
     res.status(500).json({success:false,message:error.message})
 }
}

// api for update the profile:
module.exports.updateProfile = async(req,res)=>{
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    }

    const adminId = req.adminId
    const{firstName, lastName, phone, address, dob , gender,email } = req.body
    const imageFile = req.file
  
    const admin = await adminModel.findById(adminId);

    if (!admin) {
      return res.status(404).json({success:false, message: 'Something went wrong!' });
    }

      // Update employee details
    const updatedAdminData = {
      'fullName.firstName': firstName,
      'fullName.lastName': lastName,
      email: email,
      dob: dob,
      gender: gender,
      address: address,
      phone: phone,
    }; 

    const updatedAdmin = await adminModel.findByIdAndUpdate(
      adminId,          
      { $set: updatedAdminData }, 
      { new: true }    
    );

    if (!updatedAdmin) {
      return res.status(404).json({success:false, message: 'Something Went Wrong!' });
    }


      if(imageFile){
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
        const imageUrl = imageUpload.secure_url
        await adminModel.findByIdAndUpdate(adminId,{image:imageUrl})
      }
      return res.status(200).json({success:true, message:"Profie Updated Successfully",updatedAdmin})
     
  } catch (error) {
    console.log(error)
    return res.status(500).json({success:false,message:error.message})
  }

}

// api to delete profile:
module.exports.deleteProfile = async(req,res)=>{
  try {
    const adminId = req.adminId;

    await employeeModel.deleteMany({ adminId: adminId });

    await departmentModel.deleteMany({ adminId: adminId }); 

    await LeaveModel.deleteMany({ adminId: adminId });

    await adminModel.findByIdAndDelete({_id:adminId});

    res.status(200).json({ success: true, message: 'Delete Your Account Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete account.' });
  }
}

// api for get all emoloyee:
module.exports.getAllEmployee = async(req,res)=>{
       try {
        const adminId = req.adminId
        if (!adminId) {
          return res.status(400).json({ success: false, message: "Something Went Wrong!" });
        }

        const employees = await employeeModel.find({ adminId }).select('-password');
        if (employees.length === 0) {
          return res.status(200).json({ success: true, message: 'No employees found!'});
        }
     
        return res.status(200).json({success:true, employees})
       } catch (error) {
          console.log(error)
          return res.status(500).json({success:false, message:error.message})
       }
}

// api for get specific employee:
module.exports.getSpecificEmployee = async(req,res)=>{
    try {
        const {employeeId} = req.params
        const employee = await employeeModel.findById(employeeId).select('-password')
      
        if(!employee){
            return res.status(400).json({success:false, message:"Employee not found"})
        }
      
        return res.status(200).json({success:true, employee})
       
    } catch (error) {
          console.log(error)
          return res.status(500).json({success:false, message:error.message})
    }
}

// api for add a new employee:
module.exports.createEmployee = async(req,res)=>{
  
    try {
      const adminId = req.adminId; 
        const{fullName,email,password,dob,position,gender,phone,salary,department,joiningDate,address,workingType} = req.body
       const imageFile = req.file
    
       
  if(!fullName || !email ||!password || !dob || !position || !gender || !phone || !department || !salary || !joiningDate || !address ||!workingType||!adminId ){
            return res.status(400).json({success:false, message:"Missing Details!"})
        }
     
         // Check if department exists for this admin
    const departmentExists = await departmentModel.findOne({
      departmentName: department,
      adminId: adminId,
    });

    if (!departmentExists) {
      return res.status(404).json({ success: false, message: "Department not found!" });
    }

      
        // hashing password:
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
      
        
    let imageUrl = 'https://cdn-icons-png.freepik.com/256/10987/10987751.png?ga=GA1.1.1367734566.1715677570&semt=ais_hybrid'; // Default image

        // upload image to cloudinary:

         if(imageFile){
          const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
           imageUrl = imageUpload.secure_url 
         }
        

        const employeeData = {
            fullName,
            email,
            password:hashedPassword,
            dob,
            position,
            gender,
            phone,
            salary,
            department,
            address,
            joiningDate,
            workingType,
            adminId,
            image:imageUrl 
        }
       
      
        const newEmployee = new employeeModel(employeeData)
         await newEmployee.save()

         await adminModel.findByIdAndUpdate(adminId, {
          $push: { employees: newEmployee._id },
        });
      
         return res.status(200).json({success:true, message:'Employee Added Successfully'})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:error.message})
    }
}


// api to update user profile:
module.exports.updateEmployeeProfile = async (req,res)=>{
  try {
    const { employeeId } = req.params;
    const { firstName, lastName, phone, address, dob , gender,email,position,department,salary} = req.body
    const imageFile = req.file 
    
    const employee = await employeeModel.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
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
      department:department,
      salary: salary,
    }; 

    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      employeeId,          
      { $set: updatedEmployeeData }, 
      { new: true }    
    );

    if (!updatedEmployee) {
      return res.status(404).json({success:false, message: 'Employee not found' });
    }

    if(imageFile){

      // upload image to cloudinary:
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})
      const imageUrl = imageUpload.secure_url

      await employeeModel.findByIdAndUpdate(employeeId, {image:imageUrl})
    }
    res.status(200).json({success:true,message: 'Employee profile updated successfully', updatedEmployee });
  
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

// api for delete the employee:
module.exports.deleteEmployee = async(req,res)=>{
  try {
    const adminId = req.adminId
    const { employeeId } = req.params;

    if (!employeeId) {
      return res.status(404).json({ message: 'Something went wrong!' });
    }

    await adminModel.findByIdAndUpdate(adminId, {
      $pull: { employees: employeeId }, 
    });

  
    await LeaveModel.deleteMany({ employeeId});
    await employeeModel.findByIdAndDelete({_id:employeeId});
    res.status(200).json({success:true, message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({success:false,  message: 'Failed to delete employee' });
  }
}

// api for add a newTask to the employee:
module.exports.addNewTask = async(req,res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()})
        }

        const {employeeEmail, title, description, date, category,deadline} = req.body;


         const employee = await employeeModel.findOne({email:employeeEmail})

         if(!employee){
            return res.status(400).json({success:false, message:"Employee Not Found!"})
         }
        
          //  Check if deadline is in the future
       const currentDate = new Date();
       const deadlineDate = new Date(deadline);

      if (isNaN(deadlineDate.getTime())) {
       return res.status(400).json({ success: false, message: "Invalid deadline date format!" });
      }

      if (deadlineDate <= currentDate) {
       return res.status(400).json({
        success: false,
        message: "Deadline must be a future date!",
       });
    }


         const newTask = {
            taskId:employee.tasks.length,
            title,
            description,
            date,
            category,
            deadline,
            active:false,
            newTask:true,
            completed:false,
            failed:false
         }
         
         employee.tasks.push(newTask)
         employee.taskNumbers.newTask +=1
         await employee.save()

         return res.status(200).json({success:true, employee,message:"Successfully assign newTask to Employee"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:error.message})
    }
}

// mark task as completed:
module.exports.taskCompleted = async(req,res)=>{
  try {
    const adminId = req.adminId
    if(!adminId){
      return res.status(400).json({success:false, message:"Something went wrong!"}) 
    }
    const {employeeId, taskId} = req.body
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

// api for marks the task as delete:
module.exports.taskFailed = async(req,res)=>{
   try {
    const adminId = req.adminId
    if(!adminId){
      return res.status(400).json({success:false, message:"Something went wrong!"}) 
    }
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

// api for update the task:
 module.exports.updateTask = async(req,res)=>{
    try {
        const { title, description, category, date, deadline,employeeId, taskId } = req.body;

         //  Check if deadline is in the future
         const currentDate = new Date();
       const deadlineDate = new Date(deadline);

       if (isNaN(deadlineDate.getTime())) {
        return res.status(400).json({ success: false, message: "Invalid deadline date format!" });
      }

      if (deadlineDate <= currentDate) {
      return res.status(400).json({
        success: false,
        message: "Deadline must be a future date!",
      });
     }


        const updatedEmployee = await employeeModel.findOneAndUpdate(
            { _id: employeeId, "tasks.taskId": parseInt(taskId) },  // Find employee and task by taskId
            {
                $set: {
                    "tasks.$.title": title,
                    "tasks.$.description": description,
                    "tasks.$.category": category,
                    "tasks.$.date": date,
                    "tasks.$.deadline": deadline
                }
            },
            { new: true }  
        );

        if (!updatedEmployee) {
            return res.status(400).json({ success: false, message: "Employee or Task not found!" });
        }
        return res.status(200).json({ success: true, message: "Task Updated Successfully", employee: updatedEmployee });
    } catch (error) {
        console.error('Error updating task:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

// api for delete the task:
module.exports.deleteTask = async(req,res)=>{
    try {
       const {employeeId, taskId} = req.body 
       const employee = await employeeModel.findById(employeeId)
       if(!employee){
        return res.status(400).json({success:false, message:"Employee not found"})
       }
      
       const taskIndex = employee.tasks.findIndex(task=>task.taskId === parseInt(taskId))
       if(taskIndex=== -1){
        return res.status(400).json({success:false,messge:"Task not found!"})
       }

      employee.tasks.splice(taskIndex,1)
      employee.taskNumbers.active -=1

    //   resign the task Id for the remaining task:
    employee.tasks.forEach((task,index)=>{
        task.taskId = index;
    })

    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      employeeId,
      {
        tasks: employee.tasks,
        'taskNumbers.active': employee.taskNumbers.active,  // Update the active task count
      },
      { new: true }  // Return the updated document
    );


      await  employee.save()
     return res.status(200).json({success:true, message:"Task deleted successfully",updatedEmployee})
    } catch (error) {
        
    }
}

// api for admin dashData:
module.exports.adminDashboard = async(req,res)=>{
    try {
      const adminId = req.adminId
      if (!adminId) {
        return res.status(400).json({ success: false, message: "Something Went Wrong!" });
      }

      const employees = await employeeModel.find({ adminId }).select('-password');
      
        const summary = employees.map(employee =>({
          employeeName:employee.fullName,
          position:employee.position,
          department:employee.department,
          workingType:employee.workingType,
          image:employee.image,
          tasks:employee.tasks.length,
          activeTask:employee.taskNumbers.active,
          completedTask:employee.taskNumbers.completed,
          failedTask:employee.taskNumbers.failed,
          newTask:employee.taskNumbers.newTask
        }))

        const adminDashboard = {
            AllEmployees: employees.length,
            summary:summary,
            employess:employees
        }

        return res.status(200).json({success:true, adminDashboard})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:error.message})
    }
}

// api for search and filter the employee by taskStatus:
module.exports.filterEmployee = async(req,res)=>{
     try{
      const adminId = req.adminId
      if (!adminId) {
        return res.status(400).json({ success: false, message: "Something Went Wrong!" });
      }

        const { taskStatus } = req.query; 

        if (!taskStatus || !['all','active', 'completed', 'failed'].includes(taskStatus)) {
          return res.status(400).json({ message: 'Invalid task status. Must be one of: active, completed, failed' });
        }
    

        const employees = await employeeModel.find({ adminId }).select('-password');
        const filteredEmployees = [];

        if (taskStatus === 'all') {
        
          for (const employee of employees) {
            filteredEmployees.push({
              _id: employee._id,
              fullName: employee.fullName,
              position: employee.position,
              image: employee.image,
              taskCount: employee.tasks.length, 
              tasks: employee.tasks
            });
          }
          return res.status(200).json({ success:true, message: 'All Employees',  filteredEmployees, });
        } 
    
        for (const employee of employees) {
          const matchingTasks = employee.tasks.filter(task => task[taskStatus] === true);
    
          if (matchingTasks.length > 0) {
            filteredEmployees.push({
                    _id: employee._id,
                    fullName: employee.fullName,
                    position: employee.position,
                    image: employee.image,
                    taskCount: matchingTasks.length, 
                    tasks: matchingTasks 
            });
          }
        }
    
        if (filteredEmployees.length === 0) { return res.status(200).json({message: `No employees found with ${taskStatus} tasks`,
            data: [],
          });
        }

       return res.status(200).json({ success:true, message: `Employees with ${taskStatus} tasks`,  filteredEmployees, });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:error.message})
    }
} 

// api to add new department:
module.exports.addNewDepartment = async(req, res) => {
  try {
    const { departmentName } = req.body;
    const adminId = req.adminId
   
     if (!departmentName) {
        return res.status(400).json({ success: false, message: 'Department name is required' });
      }
  
     
      // Check if department already exists
    const existingDepartment = await departmentModel.findOne({ departmentName, adminId });
    if (existingDepartment) {
      return res.status(400).json({ success: false, message: 'Department already exists' });
    }

    const newDepartment = new departmentModel({
      departmentName,
      adminId
    });

    await newDepartment.save();
    await adminModel.findByIdAndUpdate(adminId, {
      $push: { departments: newDepartment._id },
    });
    return res.status(200).json({ success: true, message: 'Department created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// api for get department with employee count:
module.exports.getDepartmentsWithEmployeeCount = async(req, res) => {
    try {
      const adminId = req.adminId
      if (!adminId) {
        return res.status(400).json({ success: false, message: "Something Went Wrong!" });
      }
        const departments = await departmentModel.find({adminId});

        const employeeCounts = await employeeModel.aggregate([
          {
            $match: { 
                adminId:new mongoose.Types.ObjectId(adminId) // Ensure you match only the admin's employees
            }
        },
            {
                $group: {
                    _id: "$department",  // Group by department name (which is a string in this case)
                    employeeCount: { $sum: 1 },  // Count the number of employees in each department
                }
            }
        ]);
  

        // Merge the employee count with department data
        const departmentWithCounts = departments.map(department => {
            const employeeCount = employeeCounts.find(count => count._id === department.departmentName);
            return {
                ...department.toObject(),
                employeeCount: employeeCount ? employeeCount.employeeCount : 0,  // If no employees, set count to 0
            };
        });

        return res.status(200).json({
            success: true,
            departments: departmentWithCounts,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// api for delete department:
module.exports.deleteDepartment = async (req, res) => {
    try {
      const { departmentName } = req.body; 
      const adminId = req.adminId
      
      const department = await departmentModel.findOne({ departmentName, adminId });
      if (!department) {
        return res.status(404).json({ success: false, message: 'Department not found' });
      }
  
      const employeesInDepartment = await employeeModel.find({ department: departmentName });
  
      if (employeesInDepartment.length > 0) {
        await employeeModel.updateMany(
          { department: departmentName },
          { $set: { department: 'No Department' } } // Unassign employees from this department
        );
      }
  
      await departmentModel.findOneAndDelete({ departmentName });
  
      return res.status(200).json({ success: true, message:'Department deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({success: false, message: error.message});
    }
  };

// api for serach employees by name:
module.exports.searchEmployeesByName = async (req, res) => {
    try {
      const adminId = req.adminId
      if (!adminId) {
        return res.status(400).json({ success: false, message: "Something Went Wrong!" });
      }

      const { name } = req.query; 
      const employees = await employeeModel.find({
        'fullName.firstName': { $regex: name, $options: 'i' },
        adminId: adminId, 
      });
       
      if(!employees){
       return res.status(400).json({success:false,message:'No data found!'})
      }
      
      const searchEmployees = [];
    
      for (const employee of employees) {
          searchEmployees.push({
                  _id: employee._id,
                  fullName: employee.fullName,
                  position: employee.position,
                  image: employee.image,
          });
        
      }

      if (searchEmployees.length === 0) { return res.status(300).json({message: 'No employees found' }); }
    
     return res.status(200).json({ success:true,  searchEmployees, });
  
    } catch (error) {
      console.error('Error searching employees:', error);
      return res.status(500).json({success:false, message: 'Server error' });
    }
  };
  
