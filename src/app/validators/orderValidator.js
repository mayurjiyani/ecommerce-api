const Joi = require('joi');

// Validation schema for creating a new order
const createOrderSchema = Joi.object({
    order_id: Joi.string().required(),
    item_name: Joi.string().required(),
    cost: Joi.number().required(),
    order_date: Joi.string()
        .pattern(/^\d{4}\/\d{2}\/\d{2}$/) // Matches yyyy/mm/dd format
        .required(),
    delivery_date: Joi.string()
        .pattern(/^\d{4}\/\d{2}\/\d{2}$/) // Matches yyyy/mm/dd format
        .required()
});

// Validation schema for updating an order
const updateOrderSchema = Joi.object({
    delivery_date: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/) // Matches yyyy-mm-dd format
        .required()
});

// Validation schema for searching an order
const searchOrderSchema = Joi.object({
    order_id: Joi.string().required(),
});

// Schema for validating order_id in path parameters
const orderIdParamSchema = Joi.object({
    order_id: Joi.string().required()
});

// Schema for validating date query parameter
const listOrdersQuerySchema = Joi.object({
    date: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/) // Matches yyyy-mm-dd format
        .required()
});

module.exports = {
    createOrderSchema,
    updateOrderSchema,
    searchOrderSchema,
    orderIdParamSchema,
    listOrdersQuerySchema
};
