import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// next() passes control to the next middleware or route handler.

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // split and get the second index, i.e the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //   In reality, the req object doesn't have a property named user by default. You can use any property name you prefer when adding data to the req object,
      //   and it will be passed to the next middleware, and it will be able to access it. As in this case, this req.user can be acccessed by getuserProfile controller
      
      req.user = await User.findById(decoded.id).select("-password");

      //   select('-password') is used in the Mongoose query to specify which fields should be included or excluded from the query result.
      //   In this case, select('-password') is used to exclude the password field from the query result. By using this, the password field
      //   of the User model will not be returned when querying for the user based on the decoded.id.hyphen (-) is needed in this context
      //   to exclude the password field from the query result.

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Token Failed!");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error(
      "No token, no party! Unauthorized access? Nope, not on my watch!"
    );
  }
});

export { protect };
