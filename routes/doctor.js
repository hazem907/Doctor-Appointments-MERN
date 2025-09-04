import express from "express";
const router = express.Router();
import Doctor from "../models/doctorSchema.js";
import multer from "multer";
 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  });

  const upload = multer({ storage: storage });
router.post("/addDoctors",upload.single('image'), async (req, res) => {
 try{
     const { name, speciality, experienceYears, description} = req.body;
  if ((!name || !speciality || !experienceYears|| !description ||!image)) {
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
router.get("/:id", async(req,res)=> {
    const doctor = await Doctor.findById(req.params.id)
    if(!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.json(doctor);

})
export default router;
