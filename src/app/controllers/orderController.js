const orderService = require('../services/orderService');
const validateRequest = require('../../frameworks/middleware/validateRequest');

// Create a new order
exports.createOrder = async (req, res, next) => {
    try {
        const newOrder = await orderService.createOrder(req.body);
        res.status(201).json(newOrder);
    } catch (err) {
        next(err);
    }
};

// Update an order's delivery date
exports.updateOrder = async (req, res, next) => {
    try {
        const updatedOrder = await orderService.updateOrder(req.params.order_id, req.body.delivery_date);
        res.json(updatedOrder);
    } catch (err) {
        next(err);
    }
};

// List all orders for a specific date
exports.listOrders = async (req, res, next) => {
    try {
        const orders = await orderService.listOrders(req.query.date);
        res.json(orders);
    } catch (err) {
        next(err);
    }
};

// Search for a specific order by ID
exports.searchOrder = async (req, res, next) => {
    try {
        const order = await orderService.searchOrder(req.query.order_id);
        res.json(order);
    } catch (err) {
        next(err);
    }
};

// Delete an order by ID
exports.deleteOrder = async (req, res, next) => {
    try {
        await orderService.deleteOrder(req.params.order_id);
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        next(err);
    }
};
