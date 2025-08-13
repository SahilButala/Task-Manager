import express from "express";
import { adminMiddleware, protect } from "../middlewares/authmiddleware.js";
import { getUserByid, getUsers } from "../controllers/UserController.js";
const router = express.Router();

router.get("/", protect, adminMiddleware, getUsers); // admin only
router.get("/:id", protect, getUserByid); // admin only

export default router;
