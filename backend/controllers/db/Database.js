
import mongoose from "mongoose"

export const DatabaseConnection = async (req,res)=>{
     try {
         await mongoose.connect(process.env.MONGODB_URL).then(console.log("------ DataBase connected ------"))
     } catch (error) {
          console.log(error)
           res.status(500).json({
            success : false,
            message : error?.message
           })
     }
}