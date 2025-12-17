import express from "express";

import { Request , Response } from "express";

import { protect } from "../middlewares/authmiddleware.js";
import { catchAsync } from "../utils/catchAsync.js";
import { ApiRes } from "../utils/ApiRes.js";
import uploads from "../middlewares/uploadMiddleware.js";
import { getUserProfile, LoginUser, RegisterUser, updateUserProfile } from "../controllers/authContrroller.js";
import { validate } from "../middlewares/validate.js";
import { loginDto, updateProfileDto } from "../types/auth.dto.js";

const router = express.Router();



router.post("/register", RegisterUser);
router.post("/login", validate(loginDto) , LoginUser);
router.get("/profile", protect, getUserProfile);
router.patch("/:id", protect, validate(updateProfileDto) , updateUserProfile);


// upload image 

router.post(
  "/upload-image",
  uploads.single("file"),
  catchAsync(async (req : Request , res : Response) => {
    if (!req?.file) {
      return res.status(404).json(new ApiRes(true, "No file uploaded"));
    }
    const imageurl = `${req.protocol}://${req.get("host")}/uploads/${
      req?.file?.filename
    }`;
    res.status(200).json({ imageurl });
  })
);

export default router;
