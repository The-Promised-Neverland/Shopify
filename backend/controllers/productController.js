// @controller module to control the routes

import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// @desc        Fetch all products
// @route       GET /api/products
// @access      Public (Anyone can access this domain)
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}) // this results all products
    res.json(products)
})

// @desc        Fetch single products, clicked ones
// @route       GET /api/products/:id
// @access      Public (Anyone can access this domain)
//  In the context of MongoDB and Mongoose, ObjectId refers to a specific data type used for unique identifiers of documents within a collection.It is a 12 - byte identifier typically represented as a 24 - character hexadecimal string
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) { // if there is a product
        res.json(product)
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export { getProducts, getProductById }