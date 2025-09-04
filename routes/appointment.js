import express from "express";
const router = express.Router();
import Appointment from '../models/appointmentSchema.js';
import auth from "../auth/middlware.js";
router.post('/createAppointment',auth(),async(req,res)=>{
    try{
        const{doctor,date,reason} = req.body
        if(!doctor||!date||!reason){
            return res.status(400).send({message:"all fields must be filled"})
        }
        const appointment = await Appointment.create({
            user:req.user.id,
            doctor,
            date,
            reason
        })
        res.status(201).send(appointment)


    }catch(error){
        console.error(error)
        res.status(500).send({message:error})

    }
})
router.get("/myAppointments", auth(), async(req,res)=>{
    const appointments = await Appointment.find({user:req.user.id}).populate("doctor")
    res.json(appointments);
})


router.post("/deleteAppointment/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting appointment with ID:', id); // Add this for debugging
        
        const appointment = await Appointment.findByIdAndDelete(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});








export default router;