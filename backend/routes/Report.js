import express from "express"
import { adminMiddleware, protect } from "../middlewares/authmiddleware.js"
import { exportTaskReport, exportUserReport } from "../controllers/ReportController.js"


const router = express.Router()

router.get("/export/tasks" , protect  , adminMiddleware , exportTaskReport) // exporting all task as excel / pdf
router.get("/export/user" , protect  , adminMiddleware , exportUserReport) // export user task-report



export default router