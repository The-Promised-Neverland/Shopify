import express from "express";
import {
    addOrderItems, getOrderById
} from "../controllers/orderController.js";
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route("/").post(protect,addOrderItems);  //verify token and then pass user to addOrderItems
router.route("/:id").get(protect,getOrderById)

export default router;