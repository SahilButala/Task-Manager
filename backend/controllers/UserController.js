import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../models/User_Model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiRes.js";

const jwtSignin =  (id, role) => {
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

  let token =  jwtSignin(user?._id, user?.role)

  res .status(201).json(
      new ApiRes(true, "Register successfully..", {
        ...user?._doc,
        token
      })
    );
});
// login controller
const LoginUser = catchAsync(async (req, res) => {});
//  get user profile
const getuserProfile = catchAsync(async (req, res) => {});
// update this url
const updateUserprofile = catchAsync(async (req, res) => {});
export { RegisterUser, LoginUser, getuserProfile, updateUserprofile };
