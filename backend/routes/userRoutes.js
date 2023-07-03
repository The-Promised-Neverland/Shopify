import express from "express";
const router = express.Router();
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    UpdateUserProfile,
    getUser,
    updateUser,
    deleteUser,
    getUserById } from "../controllers/userController.js";

router.route('/').post(registerUser).get(getUser);
router.post('/logout', logoutUser);
router.post('/login', authUser);
router.route('/profile').get(getUserProfile).put(UpdateUserProfile);
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser);


export default router;