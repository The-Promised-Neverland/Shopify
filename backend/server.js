import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";



dotenv.config();

const port = process.env.PORT || 5000;
connectDB();
const app = express();

app.get('/', (req, res) => {
    res.send('API is running ....');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find((item) => item._id === id);
    res.json(product);
})

app.listen(port, () => console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.blue.bold
));
