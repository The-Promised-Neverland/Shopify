// @controller module to control the routes

import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc        Fetch all products
// @route       GET /api/products
// @access      Public (Anyone can access this domain)
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}); // this results all products
  res.send(products);
});

// @desc        Fetch single products, clicked ones
// @route       GET /api/products/:id
// @access      Public (Anyone can access this domain)
//  In the context of MongoDB and Mongoose, ObjectId refers to a specific data type used for unique identifiers of documents within a collection.It is a 12 - byte identifier typically represented as a 24 - character hexadecimal string
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) { // if there is a product
    res.send(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/****************************************ADMIN ACCESS********************************* */

// @desc        Delete Product by Admin
// @route       DELETE /api/products/delete/:ProductID
// @access      Private (Only Admins can access this domain)
const deleteProductByAdmin = asyncHandler(async (req, res) => {
  const Deletedproduct = await Product.findByIdAndDelete(req.params.id);
  if (Deletedproduct) {
    res.send({ message: "Product deleted!" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc        Create Product by Admin
// @route       POST /api/products
// @access      Private (Only Admins can access this domain)
const createProductByAdmin = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/samples.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201);
  res.send(createdProduct);
});

// @desc        Update Product by Admin
// @route       PUT /api/products/:productId
// @access      Private (Only Admins can access this domain)
const updateProductByAdmin = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;

    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201);
    res.send(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

// @desc        Create new Review
// @route       PUT /api/products/:productId/reviews
// @access      Private (Only Admins can access this domain)
// Future prospects:- Only customers who got the product delivered can review, i.e. review after product delivery
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // checking if the customer already reviewed the product
    const alreadyReviewed = product.reviews.find(
      (eachUser) => eachUser.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product Already Reviewed!");
    } 
    else {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce(
          (acc, eachReview) => eachReview.rating + acc,
          0
        ) / product.reviews.length;
      await product.save();
      res.status(201);
      res.send({ message: "Review added successfully!" });
    }
  }
  else{
    res.status(400);
    throw new Error('Product Not found')
  }
});


export {
  getProducts,
  getProductById,
  deleteProductByAdmin,
  createProductByAdmin,
  updateProductByAdmin,
  createReview
};
