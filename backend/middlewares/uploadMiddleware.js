import multer from "multer"
import { ApiRes } from "../utils/ApiRes.js"


// configure multer


const storage = multer.diskStorage({
    destination : (req,file , cb)=>{
         cb(null , "uploads/")
    },
    filename : (req,file , cb)=>{
   cb(null ,  `${Date.now()}-${file.originalname}`)
    }
})

// filter filter
const filefilter = (req , file , cb)=>{
    const allowfileFormat = ["image/jpg" , "image/png" , "image/jpeg"]

    if(allowfileFormat.includes(file.mimetype)){
          cb(null , true)
    }else{
         return res.status(404).json(new ApiRes(false , "invalid format of image"))
    }
}


const uploads = multer({storage , fileFilter : filefilter})

export default uploads