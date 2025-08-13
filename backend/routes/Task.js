import express from "express"
import { adminMiddleware, protect } from "../middlewares/authmiddleware.js"
import { createTask, deleteTask, getDashboardData, getTaks, getTaskById, getuserDashboardData, updateTask, updateTaskChecklist, updateTaskStatus } from "../controllers/TaskController.js"

const router  = express.Router()


router.get("/dashboard" ,  protect, getDashboardData)
router.get("/user" , protect , getuserDashboardData)
router.get("/" , protect , getTaks) // admin --> all tasks , user --> assigned
router.get("/:id" , getTaskById)
router.post("/" , protect ,adminMiddleware , createTask) // admin only
router.patch("/:id" , protect  , updateTask)
router.delete("/:id" , protect , adminMiddleware , deleteTask)
router.patch("/:id/status" , protect , updateTaskStatus)
router.patch("/:id/todo" , protect , updateTaskChecklist)





export default router