import express from "express"
import AuthRoute from "./Auth.js"
import UserRoute from "./User.js"
import TaskRoute from "./Task.js"
import ReportRoute from "./Report.js"

const router = express.Router()

// all routes
router.use("/auth" , AuthRoute) // route for auth
router.use("/user" , UserRoute) // get users for admin side that we show only admin part
router.use("/task" , TaskRoute) 
router.use("/report" , ReportRoute )




export default router