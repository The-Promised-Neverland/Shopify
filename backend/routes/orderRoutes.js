import express from "express";
import {
    createOrder,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid,
    getUserOrders,
    deleteOrders
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";



const router = express.Router();

// protect is token verification middleware and admin middleware is to check if the user is an Admin

router.route('/').post(protect, createOrder).get(protect, admin, getOrders);
router.route('/myOrders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
router.route('/orderDelete').delete(protect , admin , deleteOrders);

export default router;