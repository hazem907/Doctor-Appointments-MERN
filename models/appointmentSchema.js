import mongoose from "mongoose";
const appointmentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:"User"
    },
     doctor:{
        type:mongoose.Schema.Types.ObjectId,ref:"Doctor"
    },
    date:{
        type:Date
    },
    reason:{
        type:String
    }
})
const Appointment = mongoose.model("Appointment",appointmentSchema)
export default Appointment;