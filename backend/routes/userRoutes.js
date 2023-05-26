import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile); // the next() function in protect middleware will pass control to getUserProfile
router.route("/profile").put(protect, updateUserProfile); // after verying the token, the user will be allowed to update the details
router.route("/").post(registerUser);

export default router;
