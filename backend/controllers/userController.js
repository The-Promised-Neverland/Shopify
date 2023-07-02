import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc    Auth user & get token
// @route  POST/api/users/login
//@access  Public
const authUser = asyncHandler(async (req, res) => {
    res.send('auth user');
});

// @desc    Register User
// @route   POST/api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
   res.send('register user');
});


// @desc    Logout User / clear cookies
// @route   POST/api/users/logout
//@access   Private
const logoutUser = asyncHandler(async (req, res) => {
    res.send('logout user');
});


// @desc    Get User profile
// @route   GET/api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile');
});


// @desc    Update User profile
// @route   GET/api/users/profile
//@access   Private/Admin
const UpdateUserProfile = asyncHandler(async (req, res) => {
    res.send('get users');
});



// @desc    Get User 
// @route   GET/api/users
//@access   Private/Admin
const getUser = asyncHandler(async (req, res) => {
    res.send('get user');
});


// @desc     Delete User profile
// @route   DELETE/api/users/:id
//@access   Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
});
