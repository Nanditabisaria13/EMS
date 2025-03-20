const mongoose = require('mongoose')

const connectDB = async() =>{
   
     mongoose.connection.on('connected',()=>{
        console.log("Databse Connected")
     })
    await mongoose.connect(`${process.env.MONGODB_URI}/EMS`)
    
}

module.exports = connectDB