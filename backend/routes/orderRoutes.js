const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');

orderRouter.route('/').get(orderController.getOrders);
orderRouter.route('/:id').get(orderController.getOrderByID).delete(orderController.deleteOrder);

module.exports = orderRouter;