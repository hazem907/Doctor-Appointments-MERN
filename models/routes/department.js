import express from "express";
const router = express.Router();
import Department from "../models/doctorSchema.js";
import multer from "multer";
import auth from "../auth/middlware.js";
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
  router.post("/addDepartments", auth("admin") ,upload.single('image'), async(req,res)=>{
//    if(req.user.role!== "admin"){
//     return  res.status(403).json({ message: "Not authorized" });
//    }
   const { name, description } = req.body;
     const image = req.file ? req.file.filename : null
 if (!name) return res.status(400).json({ message: "Name is required" });

 const department = await Department.create({ name, description, image:req.file?.filename })
  res.status(201).json(department);

})

router.get("/allDepartments", async(req,res)=>{
    try {
      const departments = await Department.find({})

      res.json(departments);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch departments" });
    }
})
router.delete("/:id", async(req,res)=>{
    try {
        const department = await Department.findByIdAndDelete(req.params.id);
        
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        res.json({ 
            message: "Department deleted successfully", 
            department 
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete department" });
    }
});

router.get('/count',async(req,res)=>{
  try{
    const count = await Department.countDocuments()
    res.json({count})

  }catch(error){
    if(error){
      console.error(error)
      return res.status(500).send({message:"can not get count"})
    }

  }
})














  export default router;