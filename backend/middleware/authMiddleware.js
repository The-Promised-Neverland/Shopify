import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'


// next() passes control to the next middleware or route handler.

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split('')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            console.log(decoded)
            next()
        } catch (error) {

        }
    }
    if (!token) {
        res.status(401)
        throw new Error("No token, no party! Unauthorized access? Nope, not on my watch!")
    }
    next()
})

export { protect }