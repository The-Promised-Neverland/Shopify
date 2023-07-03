import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";



// @desc    Auth user & get token
// @route  POST/api/users/login
//@access  Public

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        //Set JWT as HTTP- Only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
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
    res.send('update user profile');
});



// @desc    Get User 
// @route   GET/api/users
//@access   Private/Admin
const getUser = asyncHandler(async (req, res) => {
    res.send('get user');
});

// @desc    Get User by ID
// @route   GET/api/users/:id
//@access   Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('get user by id');
});

// @desc     Delete User profile
// @route   DELETE/api/users/:id
//@access   Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
});


// @desc     Update User
// @route   PUT/api/users/:id
//@access   Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user');
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    UpdateUserProfile,
    getUser,
    updateUser,
    deleteUser,
    getUserById
}

