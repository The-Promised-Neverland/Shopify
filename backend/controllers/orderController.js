import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

// @desc        Create new order
// @route       POST /api/orders
// @access      Private 
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems,  // this is any array of order Items
        shippingAddress,
        paymentGateway,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No products in order!')
    }
    else {
        const order = new Order({
            orderItems,
            user: req.user._id, // getting this from protect middleware after token verification
            shippingAddress,
            paymentGateway,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save()

        res.status(201);
        res.send(createdOrder); //send the createdOrder response to client
    }
});


// @desc        Get order by ID
// @route       GET /api/order/id
// @access      Private 
const getOrderById = asyncHandler(async (req, res) => {

    /*
     * Populates the referenced field(s) in the document with the actual data from another collection.
     *
     * @param {String} path - The field to populate.
     * @param {String|Object} [select] - Optional. The fields to include or exclude from the populated document(s).
     * @returns {Query} The query object with the populated field(s).
     *
     * Example usage:
     * const order = await Order.findById(req.params.id).populate('user', 'name email');
     *
     * This populates the 'user' field of the order document with the associated user document,
     * including only the 'name' and 'email' fields. Writing only 'user' will result in all of the user schema members 
     *
     * Multiple fields can be populated by chaining multiple `populate()` calls.
     * The referenced field(s) must have a reference defined in the schema.
     */

    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
        res.send(order)
    }
    else {
        res.status(404)
        throw new Error('Order not found!')
    }

});

export { addOrderItems, getOrderById }