const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const validateRequest = require('../../frameworks/middleware/validateRequest');
const { createOrderSchema, updateOrderSchema, searchOrderSchema, orderIdParamSchema, listOrdersQuerySchema } = require('../validators/orderValidator');

router.post('/create', validateRequest(createOrderSchema), orderController.createOrder);
router.put('/update/:order_id', validateRequest(updateOrderSchema), validateRequest(orderIdParamSchema, true), orderController.updateOrder);
router.get('/list', validateRequest(listOrdersQuerySchema, false, true), orderController.listOrders);
router.get('/search', validateRequest(searchOrderSchema, false, true), orderController.searchOrder);
router.delete('/delete/:order_id', validateRequest(orderIdParamSchema, true), orderController.deleteOrder);

module.exports = router;
