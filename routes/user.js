import express from "express"
const router = express.Router()
import User from "../models/userSchema.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
router.post('/register', async(req,res)=>{
    const {name,email,password,role} = req.body;
    if(!name||!email||!password){
        return res.status(400).send({message:"all fields must be filled"})
    }
    const userExist = await User.findOne({email});
    if(userExist){
        return res .status(400).send({message:"user is already exist"})
    }
    const hashedPassword =  await bcrypt.hash(password,10)
    const newUser = await User.create({
        name,
        email,
        password:hashedPassword,
        role
    })
 const token = jwt.sign({ email, id: newUser._id,role:newUser.role }, process.env.SECRET_KEY, { expiresIn: "1w" })
    return res.status(200).send({message:"successfully registered",token,user:{
        name: newUser.name,
        email:newUser.email,
        id:newUser._id,
        role:newUser.role
    }})

})
router.post("/signin",async(req,res)=>{
    const {email,password} = req.body;
    if(!email||!password){
        return res.status(400).send("wrong email or password")
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).send("wrong email or password")
    }
    const isMatch = await bcrypt.compare(password,user.password)
     if (!isMatch) {
        return res.status(400).send({ message: "Wrong email or password" });
    }
    const token = jwt.sign({ email, id: user._id,role:user.role }, process.env.SECRET_KEY, { expiresIn: "1w" })
   
    return res.status(200).send({message:"you are signed in successfully",token,user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role


    }})
})
export default router;