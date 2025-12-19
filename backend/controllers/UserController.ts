import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import User, { IUser } from "../models/User_Model";
import Task from "../models/Task_model";
import { ApiRes } from "../utils/ApiRes";
import { ApiError } from "../utils/ApiError";
import Tenant from "../models/Tenant";
import { Types } from "mongoose";
import bcryptjs from "bcryptjs";

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

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, profileImageUrl } = req.body;

    // 1️⃣ Find tenant properly
    const tenant = await Tenant.findById(req.tenantId);

    if (!tenant) {
      return next(new ApiError(404, "Unauthorized or invalid tenant"));
    }

    // 2️⃣ Check existing user under same tenant
    const existingUser = await User.findOne({
      email,
      tenantId: tenant._id,
    });

    if (existingUser) {
      return next(
        new ApiError(400, "User already exists under this tenant")
      );
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcryptjs.hash(password, 12);

    // 4️⃣ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
      tenantId: tenant._id,
    });

    // 5️⃣ Response
    res.status(201).json({
      sucess: true,
      message: "User created successfully",
      user,
    });
  }
);



export {
  getUserByid,
  getUsers,
  createUser
}
 