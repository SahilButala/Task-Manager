import { Request, Response } from "express";
import Notification from "../models/Notification";
import { catchAsync } from "../utils/catchAsync";
import { ApiRes } from "../utils/ApiRes";
import { ApiError } from "../utils/ApiError";

// ===============================
// Get My Notifications
// ===============================
export const getMyNotifications = catchAsync(
  async (req: Request, res: Response) => {
    if (!req.user?._id) {
      throw new ApiError(401, "Unauthorized");
    }

    const notifications = await Notification.find({
      userId: req.user._id,
    })
      .sort({ createdAt: -1 })
      .populate("taskId", "title status priority");

    res
      .status(200)
      .json(new ApiRes(true, "Notifications fetched", notifications));
  }
);

// ===============================
// Mark Notification as Read
// ===============================
export const markAsRead = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      throw new ApiError(404, "Notification not found");
    }

    res
      .status(200)
      .json(new ApiRes(true, "Notification marked as read", notification));
  }
);
