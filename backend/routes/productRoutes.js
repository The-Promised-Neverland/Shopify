import express from "express";
import {
  getProductById,
  getProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

/*{
    The code router.route('/').get(getProducts) is used to define a route handler for a specific HTTP method and path in a server application.
    Let's break it down:
        1) router: This refers to an instance of a router object, which is typically provided by a framework like Express
                   js.The router object allows you to define routes and their corresponding handlers.

        2) route('/'): This sets up a route for a specific path, in this case, the root path("/").You can specify any
                       desired path here, such as "/users" or "/products", depending on your application's needs.

        3) .get(getProducts): This specifies that the route handler should be triggered when an HTTP GET request is made
                              to the specified path.It associates the getProducts function as the handler for the GET method on that path.

        4)  getProducts: This is the handler function that will be called when a GET request is made to the specified
                         path.It contains the logic to handle the request and send a response back to the client.
}*/

export default router;

// -------------------------

// import express from 'express'
// import Product from '../models/productModel.js'
// import asyncHandler from 'express-async-handler'

// const router = express.Router()

// // @desc        Fetch all products
// // @route       GET /api/products
// // @access      Public (Anyone can access this domain)
// router.get('/', asyncHandler(async (req, res) => {
//     const products = await Product.find({}) // this results all products
//     res.json(products)
// }))

// // @desc        Fetch single products, clicked ones
// // @route       GET /api/products/:id
// // @access      Public (Anyone can access this domain)

// //  In the context of MongoDB and Mongoose, ObjectId refers to a specific data type used for unique identifiers of documents within a collection.It is a 12 - byte identifier typically represented as a 24 - character hexadecimal string
// router.get('/:id', asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id)
//     // The `catch` method handles errors in promises. It invokes a callback function if an error occurs, allowing custom error handling. Example: `const result = await promise.catch(error => handle(error));` const product can hold a false, if error, or the Products from the server
//     if (product) { // if there is a producut
//         res.json(product)
//     }
//     else {
//         res.status(404)
//         throw new Error('Product not found')
//     }
// }))

// export default router
