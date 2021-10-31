const express = require('express');
const paymentRoutes = express.Router();
const paymentController = require('../controllers/paymentController');

paymentRoutes.route('/createPayment').post(paymentController.createPayment);

module.exports = paymentRoutes;