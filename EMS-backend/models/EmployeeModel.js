const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String, required:true, minlength:[3,'First name must have at least 3 characters long']
        },
        lastName:{
            type:String,  minlength:[3,'Last name must have at least 3 characters long']
        },
        },

    email:{type:String,required:true, unique:true, minlength:[5,'email must have at least 5 characters long']},
    password:{type:String,required:true},
    image:{type:String,default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRowqmOkEC3VKpAxaZLa8ipGd6cqIEr2-BWmw&s'},
    dob:{type:String, default:"Not Selected"},
    gender:{type:String, default:"Not Selected"},
    phone:{type:String, default:"0000000000"},
    position:{type:String, default:"Not Selected"},
    department:{type: String,  required: true},
    address:{type:String},
    salary:{type:Number, requried:true},
    joiningDate:{type:String, requried:true},
    leaves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Leave' }],
    workingType:{type:String,enum: ['Onsite', 'Remote', 'Hybrid'], default: 'Onsite' },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admin' },
    tasks:[],
    taskNumbers:{
        active:{type:Number,default:0},
        newTask:{type:Number,default:0},
        completed:{type:Number,default:0},
        failed:{type:Number,default:0},
        
    }

})

const employeeModel = mongoose.models.employee || mongoose.model('employee',employeeSchema)

module.exports = employeeModel;