import express from "express";
import { adminMiddleware, protect } from "../middlewares/authmiddleware.js";
import { createUser, getUserByid, getUsers } from "../controllers/UserController.js";
const router = express.Router();

router.get("/", protect, adminMiddleware, getUsers); // admin only
router.get("/:id", protect, getUserByid); // admin only
router.post("/create" , protect , createUser)

export default router;
