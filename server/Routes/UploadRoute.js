import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,"public/images");
    },
    filename:(req,res,cb)=>{
        cb(null,req.body.name)
    }
})

const upload = multer({storage:storage});

router.post("/",upload.single("file"),(req,res)=>{
    try {
        res.status(200).json("File Uploaded Successfully!")
    } catch (error) {
        res.status(500).json(error)
    }
});
export default router;