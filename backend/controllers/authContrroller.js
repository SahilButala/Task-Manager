import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../models/User_Model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiRes.js";

const jwtSignin = (id, role) => {
  console.log(id, "sasasasasasa", role, "++++++++++++++++++++++++++++++++");
  return jwt.sign({ _id: id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Register controller
const RegisterUser = catchAsync(async (req, res) => {
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

  let token = jwtSignin(user?._id, user?.role);

  res.status(201).json(
    new ApiRes(true, "Register successfully..", {
      ...user?._doc,
      token,
    })
  );
});
// login controller
const LoginUser = catchAsync(async (req, res ,next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next((new ApiError(404, "invalid credentials")));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ApiError(404, "User is not exists"));
  }

  const isPassCorrect = await bcryptjs.compare(password, user?.password);

  if (!isPassCorrect) {
    return next(new ApiError(404, "invalid password"));
  }

  const token = jwtSignin(user?._id, user?.role);

  const { password: _, ...userData } = user?._doc; //extracting password from user data

  res.status(200).json(
    new ApiRes(true, "login successfully...", {
      ...userData,
      token,
    })
  );
});
//  get user profile
const getuserProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req?.user?._id).select("-password -__v");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .json(new ApiRes(true, "User profile fetched successfully", user));
});
// update this url
const updateUserprofile = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runvalidators: true,
  }).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(
    new ApiRes(true, "User updated successfully..", {
      ...user?._doc,
    })
  );
});
export { RegisterUser, LoginUser, getuserProfile, updateUserprofile };
