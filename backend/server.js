import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// The express.json() function is a built-in middleware function in Express.
// It parses incoming requests with JSON payloads and is based on body-parser.
// In short, this allows us to use req.body to extract json data
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Mount the 'productRoutes' middleware at the '/api/products' base path
// This allows handling routes related to products under the '/api/products' URL
// For example, '/api/products' will be the main page, and additional routes can be added
// The 'productRoutes' module contains the specific routes and their corresponding handlers
// This modular approach helps organize and manage product-related routes in the application
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// PAYPAL DOCUMENTATION
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// to handle express error(middlewares)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
//The app.listen function in Express is used to start the server and make it listen for incoming HTTP requests. It takes a port number and an optional callback function as arguments.
