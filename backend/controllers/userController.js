import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import checkPassword from "../utils/passwordChecker.js";
import encryptPassword from "../utils/encrypter.js";



// @desc        Auth User and get Token
// @route       POST /api/users/login
// @access      Public (Anyone can access this domain)
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // parsing the data sent by user as credentials

  const user = await User.findOne({ email: email }); // find the user with this email

  if (user && (await checkPassword(user, password))) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});



// @desc        Get user profile
// @route       GET /api/users/profile
// @access      Private (Only user can access this domain)
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // getting it from previous middleware, protect middleware

  if (user) {
    // if user exists
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});



// @desc        Register new user
// @route       POST /api/users
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // parsing the data sent by user as credentials while registering

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are required");
  }

  const userExists = await User.findOne({ email: email }); // check if exists

  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }
  
  const encryptedPassword = await encryptPassword(password); // Encrypt the password
  
  //  Model.create() method is used to create a new document in MongoDB based on the defined schema.
  //  It simplifies the process of creating a new document by allowing you to pass an object with the
  //  desired field values as an argument.
  const user = await User.create({
    // creating the user
    name: name,
    email: email,
    password: encryptedPassword, // save this encrypted password
  });

  if (user) {
    // if user is successfully created
    res.status(401);
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export { authUser, getUserProfile, registerUser };
