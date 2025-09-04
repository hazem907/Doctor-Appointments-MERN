import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema({
    name:{
        type:String

    },
  speciality:{
    type:String

  },
  experienceYears:{
    type:Number
  },
  description:{
    type:String
  },
  image:String

  
})
const Doctor = mongoose.model("Doctor",doctorSchema)
export default Doctor;