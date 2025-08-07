
import jwt from "jsonwebtoken"
import bcryptjs from 'bcryptjs'

import User from "../models/User_Model.js"
import { catchAsync } from "../utils/catchAsync.js"

const jwtSignin = async (id , user)=>{
      await jwt.sign({id , user} , process.env.JWT_SECRET ,{
        expiresIn : "1d"
      })
}


// Register controller
const RegisterUser = catchAsync(async(req , res)=>{
       
    const {name , password , profileImageUrl} = req.body
})

// login controller
const LoginUser = catchAsync(async (req,res)=>{

})


export {RegisterUser , LoginUser}


