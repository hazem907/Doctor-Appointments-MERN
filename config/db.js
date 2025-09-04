import mongoose from "mongoose";

const connectDB = async()=>{
    // mongoose.connect("mongodb://127.0.0.1:27017/test")
   await mongoose.connect(process.env.MONGO_URI)
    console.log("connected successfully")

}
export default connectDB;