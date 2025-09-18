import express from 'express'
import User from './routes/user.js'
import connectDB from './config/db.js'
import Doctor from './routes/doctor.js'
// import Appointment from './routes/appointment.js'
import cors from 'cors'
import dotenv from 'dotenv'
import Appointment from './routes/appointment.js';
import Department from './routes/department.js'
dotenv.config()


const app = express()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("hello")
})
app.use('/users',User)
app.use('/doctors',Doctor)
app.use('/appointments',Appointment)
app.use('/departments',Department)
app.use("/uploads", express.static("uploads"));

connectDB()
const PORT = process.env.PORT ||3000
app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`)
})