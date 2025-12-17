import express from "express";
import { protect } from "../middlewares/authmiddleware";
import {
  getMyNotifications,
  markAsRead,
} from "../controllers/Notification";

const router = express.Router();

router.use(protect);

// get logged-in user's notifications
router.get("/", getMyNotifications);

// mark single notification as read
router.patch("/:id/read", markAsRead);

export default router;
