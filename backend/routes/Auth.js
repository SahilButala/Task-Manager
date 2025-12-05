import express from "express";
import {
  getuserProfile,
  LoginUser,
  RegisterUser,
  updateUserprofile,
} from "../controllers/authContrroller.js";
import { protect } from "../middlewares/authmiddleware.js";
import { catchAsync } from "../utils/catchAsync.js";
import { ApiRes } from "../utils/ApiRes.js";
import uploads from "../middlewares/uploadMiddleware.js";

const router = express.Router();



router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/profile", protect, getuserProfile);
router.patch("/:id", protect, updateUserprofile);

// upload image

router.post(
  "/upload-image",
  uploads.single("file"),
  catchAsync(async (req, res) => {
    if (!req.file) {
      return res.status(404).json(new ApiRes(true, "No file uploaded"));
    }
    const imageurl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    res.status(200).json({ imageurl });
  })
);

export default router;
