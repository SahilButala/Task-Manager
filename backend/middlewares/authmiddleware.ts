import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync";
import { ApiError } from "../utils/ApiError";
import User from "../models/User_Model";

interface DecodedToken extends JwtPayload {
  _id: string;
}

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }



    if (!token) {
      throw new ApiError(401, "Not authorized, token missing");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new ApiError(500, "JWT secret not configured");
    }

    const decoded = jwt.verify(token, secret) as DecodedToken;

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      throw new ApiError(401, "User no longer exists");
    }

    console.log(token)

    req.user = user;
    next();
  }
);

export const adminMiddleware = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === "admin") {
      return next();
    }

    throw new ApiError(403, "Access denied, admin only");
  }
);
