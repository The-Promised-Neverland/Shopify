import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js"; 
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import orderRoutes from './routes/orderRoutes.js';


dotenv.config();

const port = process.env.PORT || 5000;
connectDB();
const app = express();

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//Cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('API is running ....');
});

app.use('/api/products',productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}
else {
    app.get('/', (req, res) => {
        res.send('API is running ....');
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.blue.bold
));
