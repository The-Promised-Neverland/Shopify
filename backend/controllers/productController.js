import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js";

// getProducts fetches all products by route GET /api/products and access is public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

// getProducts fetches one product by route GET /api/products/:id and access is public
const getProductsById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404);
        throw new Error('Resource not found');
    }

});

export { getProducts, getProductsById };