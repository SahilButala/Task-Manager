import express from "express"
import AuthRoute from "./Auth.js"

const router = express.Router()

// all routes
router.use("/auth" , AuthRoute)


export default router