import { catchAsync } from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import User from "../models/User_Model.js";

export const protect = catchAsync(async (req, res) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1]; // extracting token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findByid(decoded.id).select("-password");
    next();
  } else {
    res.status(401).json({
      message: "Not authorized , not token",
    });
  }
});



export const adminMiddleware = catchAsync( async (req , res , next) =>{
       if(req.user && req.user.role === "admin"){
             next()
       }else{
                  res.status(404).json({
                     message : "Access denied  , admin only"
                  })
       }
})