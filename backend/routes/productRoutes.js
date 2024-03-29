import express from "express";
const router = express.Router();
import { getProducts, getProductsById, createProduct, updateProducts, deleteProduct, createProductReview } from "../controllers/productController.js";
import { protect, admin } from '../middleware/authMiddleware.js';


router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductsById).put(protect, admin, updateProducts).delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);


export default router;