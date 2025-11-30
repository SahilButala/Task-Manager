import { catchAsync } from "../utils/catchAsync.js"
import User from "../models/User_Model.js"
import Task from "../models/Task_model.js"
import { ApiRes } from "../utils/ApiRes.js"




const getUsers = catchAsync(async (req , res)=>{
      const users = await User.find({role : "member"}).select("-password")

      console.log(users)

      // here we getting task details of each user (count of) like status pending , completed , progress etc 
      const userWithTaskCounts = await Promise.all(users.map(async (user)=>{
           const pendingTask = await Task.countDocuments({assignedTo : user?._id , status : "Pending"})

           const inprogressTask = await Task.countDocuments({assignedTo : user?._id  , status : "In Progress"})

           const CompleteTask = await Task.countDocuments({assignedTo : user?._id  , status : "Completed"})

           return {
            ...user?._doc,
            pendingTask,
            inprogressTask,
            CompleteTask
           }
      }))

      res.status(200).json(new ApiRes(true , 'data' , userWithTaskCounts))
})

const getUserByid = catchAsync(async (req , res)=>{
          const {id} = req.params

          const user = await User.findById(id).select("-password")

          if(!user){
            return res.status(404).json(new ApiRes(false , "user not found"))
          }

          res.status(200).json(new ApiRes(true , "User fetch successfully.." , user))
})



export {getUserByid , getUsers , }

