import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import User, { IUser } from "../models/User_Model";
import Task from "../models/Task_model";
import { ApiRes } from "../utils/ApiRes";
import { ApiError } from "../utils/ApiError";

// ===============================
// Get All Users (Admin)
// ===============================
 const getUsers = catchAsync(
  async (req: Request, res: Response) => {
    const tenantId = req?.tenantId
    const users = await User.find({ role: "member"  , tenantId}).select("-password");

    const userWithTaskCounts = await Promise.all(
      users.map(async (user: IUser) => {
        const pendingTask = await Task.countDocuments({
          assignedTo: user._id,
          status: "Pending",
          tenantId
        });

        const inprogressTask = await Task.countDocuments({
          assignedTo: user._id,
          status: "In Progress",
          tenantId
        });

        const CompleteTask = await Task.countDocuments({
          assignedTo: user._id,
          status: "Completed",
          tenantId
        });

        return {
          ...user.toObject(), // 🔴 TS-safe replacement for _doc
          pendingTask,
          inprogressTask,
          CompleteTask,
        };
      })
    );

    res
      .status(200)
      .json(new ApiRes(true, "data", userWithTaskCounts));
  }
);

// ===============================
// Get User By ID
// ===============================
 const getUserByid = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res
      .status(200)
      .json(new ApiRes(true, "User fetch successfully..", user));
  }
);

export {
  getUserByid,
  getUsers
}
 