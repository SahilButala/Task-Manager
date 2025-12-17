import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/User_Model";
import { catchAsync } from "../utils/catchAsync";
import { ApiError } from "../utils/ApiError";
import { ApiRes } from "../utils/ApiRes";
import jwt from "jsonwebtoken"


const jwtSignin = (id: string, role: string): string => {
  const secret = process.env.JWT_SECRET as string;

  return jwt.sign({ _id: id, role }, secret, {
    expiresIn: "1d",
  });
}; 

// =====================
// Login User
// =====================
 const LoginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    console.log(email , password , "sahil")

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPassCorrect = await bcryptjs.compare(password, user.password);

    if (!isPassCorrect) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = jwtSignin(user._id.toString(), user.role);

    const userData = user.toObject();


    res.status(200).json(
      new ApiRes(true, "Login successful", {
        ...userData,
        token,
      })
    );
  }
);

// =====================
// Get User Profile
// =====================
 const getUserProfile = catchAsync(
  async (req: Request, res: Response) => {
    if (!req.user?._id) {
      throw new ApiError(401, "Unauthorized");
    }

    const user = await User.findById(req.user._id).select("-password -__v");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res
      .status(200)
      .json(new ApiRes(true, "User profile fetched successfully", user));
  }
);

// =====================
// Update User Profile
// =====================
 const updateUserProfile = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).select("+password");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res.status(200).json(
      new ApiRes(true, "User updated successfully", user)
    );
  }
);

const RegisterUser = catchAsync(async (req : Request, res : Response) => {
  const { name, email, password, profileImageUrl, adminInviteToken } = req.body;
  // checking user is already exsist
  const userExsist = await User.findOne({ email });

  if (userExsist) {
    throw new ApiError(404, "User already exsist");
  }

  let role = "member";
  if (adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
    role = "admin";
  }

  // hash password
  const hashpassword = await bcryptjs.hash(password, 10);
  const user = await User.create({
    name,
    password: hashpassword,
    profileImageUrl,
    email,
    role,
  });

  let token = jwtSignin(user?._id?.toString(), user?.role);

  res.status(201).json(
    new ApiRes(true, "Register successfully..", {
      ...user?.toObject(),
      token,
    })
  );
});

export {
  updateUserProfile,
  getUserProfile,
  LoginUser,
RegisterUser
}
