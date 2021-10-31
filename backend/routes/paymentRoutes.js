const express = require('express');
const paymentRoutes = express.Router();
const paymentController = require('../controllers/paymentController');

paymentRoutes.route('/getAllPayments').get(paymentController.getAllPayments);
paymentRoutes.route('/getSinglePayment/:id').get(paymentController.getSinglePayment);
paymentRoutes.route('/editPayment/:id').put(paymentController.editPayment);
paymentRoutes.route('/createPayment').post(paymentController.createPayment);
paymentRoutes.route('/deletePayment/:id').delete(paymentController.deletePayment);

module.exports = paymentRoutes;