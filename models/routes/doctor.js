import express from "express";
const router = express.Router();
import Doctor from "../models/doctorSchema.js";
import multer from "multer";
 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      const ext = file.originalname.split('.').pop()

      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix +"." + ext);
    },
  });

  const upload = multer({ storage: storage });
router.post("/addDoctors",upload.single('image'), async (req, res) => {
 try{
     const { name, speciality, experienceYears, description} = req.body;
  if ((!name || !speciality || !experienceYears|| !description ||!req.file)) {
    return res.status(400).send({ message: "all fields must be filled" });
  }
 
  const newDoctor = new Doctor({
    name,
    speciality,
    experienceYears,
    description,
    image:req.file?.filename
  });
  const savedDoctors = await newDoctor.save()
  return res.status(201).send(savedDoctors)

 }catch(error){
     console.error(error);
    res.status(500).json({ message:error  });


 }
});
router.get("/allDoctors", async(req,res)=> {
    const doctors = await Doctor.find()

    res.json(doctors);
})
router.delete('/deleteDoctors',async(req,res)=>{
  const deleteDoctors = await Doctor.deleteMany({})
  res.json({message:"all doctors are deleted",deleteDoctors})

})
router.delete("/:id", async(req,res)=>{
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json({ 
            message: "Doctor deleted successfully", 
            doctor 
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete doctor" });
    }
});
router.get('/count',async(req,res)=>{
  try{
    const count = await Doctor.countDocuments()
    res.json({count})

  }catch(error){
    if(error){
      console.error(error)
      return res.status(500).send({message:"can not get count"})
    }

  }
})
router.get('/doctor/byspeciality/:speciality',async(req,res)=>{
try{
  const {speciality} = req.params
  console.log("searching for speciality",speciality)
  const doctors = await Doctor.find({
    speciality:{$regex:new RegExp(speciality,'i')}
  })
    console.log('found doctors:',doctors.length)
    res.json(doctors)


}catch(error){
  console.error("error:",error)
  res.status(500).json({message:error.message})

}
})
router.get("/:id", async(req,res)=> {
    const doctor = await Doctor.findById(req.params.id)
    if(!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.json(doctor);

})
export default router;

//////////////////////////////////////////////////////



