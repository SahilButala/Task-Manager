import express from "express"
import { getuserProfile, LoginUser, RegisterUser, updateUserprofile } from "../controllers/UserController.js"
import { protect } from "../middlewares/authmiddleware.js"


const router = express.Router()

router.post("/register" , RegisterUser)
router.post("/login" , LoginUser)
router.get("/profile" , protect , getuserProfile)
router.post("/:id" , protect , updateUserprofile)


export default router