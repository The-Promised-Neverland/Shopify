import express from "express";
import { authUser, getUserProfile, registerUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile); // the next() function in protect middleware will pass control to getUserProfile
router.route("/").post(registerUser);

export default router;

