const Order = require('../models/Order');

exports.createOrder = async (orderData) => {
    const { order_id, item_name, cost, order_date, delivery_date } = orderData;
    const existingOrder = await Order.findOne({ order_id });
    if (existingOrder) {
        throw new Error('Order with this ID already exists.');
    }

    const newOrder = new Order({
        order_id,
        item_name,
        cost,
        order_date: new Date(order_date),
        delivery_date: new Date(delivery_date)
    });

    return await newOrder.save();
};

exports.updateOrder = async (order_id, delivery_date) => {
    const updatedOrder = await Order.findOneAndUpdate(
        { order_id },
        { delivery_date: new Date(delivery_date) },
        { new: true }
    );

    if (!updatedOrder) {
        throw new Error('Order not found');
    }

    return updatedOrder;
};

exports.listOrders = async (date) => {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    return await Order.find({
        order_date: {
            $gte: startDate,
            $lt: endDate
        }
    });
};

exports.searchOrder = async (order_id) => {
    const order = await Order.findOne({ order_id });
    if (!order) {
        throw new Error('Order not found');
    }
    return order;
};

exports.deleteOrder = async (order_id) => {
    const deletedOrder = await Order.findOneAndDelete({ order_id });
    if (!deletedOrder) {
        throw new Error('Order not found');
    }
};
