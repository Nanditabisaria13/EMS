const express = require('express')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config()
const cookieParser = require('cookie-parser')
const connectDB = require('./config/mongodb')
const connectCloudinary = require('./config/cloudinary')
const employeeRoutes = require('./routes/employeeRoutes')
const adminRoutes = require('./routes/adminRoutes')
const leaveRoutes = require('./routes/leaveRoutes');
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.get('/',(req,res)=>{
    res.send('Api Working')
})

// api endpoints:

app.use('/api/employee',employeeRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/leave', leaveRoutes);

app.listen(port,()=>{
    console.log("Server Started")
})