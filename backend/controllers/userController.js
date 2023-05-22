import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'


const checkPassword = async (user, enteredPassword) => { // validates the password
    return await bcrypt.compare(enteredPassword, user.password)
}

// @desc        Auth User and get Token
// @route       POST /api/users/login
// @access      Public (Anyone can access this domain)
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body // parsing the data sent by user as credentials

    const user = await User.findOne({ email: email }) // find the user with this email

    if (user && (await checkPassword(user, password))) {
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc        Get user profile
// @route       POST /api/users/profile
// @access      Private (Only user can access this domain)
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('Success')
})

export { authUser, getUserProfile }