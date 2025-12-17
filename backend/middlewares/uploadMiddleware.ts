import multer, { FileFilterCallback } from "multer";
import { ApiError } from "../utils/ApiError";
import { Request , Response } from "express";

// Multer Storage

const storage = multer.diskStorage({
  destination: (req : Request, file , cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File Filter

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const allowedFormats = ["image/jpg", "image/jpeg", "image/png"];

  if (allowedFormats.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Invalid image format"));
  }
};

// Upload Middleware

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
