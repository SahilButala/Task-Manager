import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError";

export const errorhandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = "Something went wrong";

  // Custom  errors
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Mongoose errors
  if ((err as any).name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }


  if (
    (err as any).name === "JsonWebTokenError" ||
    (err as any).name === "TokenExpiredError"
  ) {
    statusCode = 401;
    message = "Invalid or expired token";
  }

  if (process.env.NODE_ENV === "development") {
    console.error(" ERROR:", err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
