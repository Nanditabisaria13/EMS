const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
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
    image:{type:String,default:'https://cdn-icons-png.freepik.com/256/10987/10987751.png?ga=GA1.1.1367734566.1715677570&semt=ais_hybrid'},
    dob:{type:String, default:"Not Selected"},
    gender:{type:String, default:"Not Selected"},
    phone:{type:String, default:"0000000000"},
    address:{type:String},
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'employee' }],
    departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'department' }],
    
})

const adminModel = mongoose.models.admin || mongoose.model('admin',adminSchema)

module.exports = adminModel;