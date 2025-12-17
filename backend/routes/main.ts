import express from "express";

import AuthRoute from "./Auth";
import UserRoute from "./User";
import TaskRoute from "./Task";
import ReportRoute from "./Report";
import NotificationRoute from "./Notification"

const router = express.Router();
 
// ===============================
// All Routes  
// ===============================
router.use("/auth", AuthRoute);    // auth routes
router.use("/user", UserRoute);    // admin/user routes
router.use("/task", TaskRoute);    // task routes
router.use("/notification",NotificationRoute)   

router.use("/report", ReportRoute);// report routes

export default router;
