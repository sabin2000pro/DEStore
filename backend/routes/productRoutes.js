const express = require('express');
const productRoutes = express.Router();
const productController = require('../controllers/productsController');

const rateLimit = require('express-rate-limit');
const windowMs = 1 * 60 * 1000;
const maxRequests = 4;

const limiter = rateLimit({ // Options for rate limiting
    windowMs,
    maxRequests,
    message: `Too many requests coming from the IP: ${ip.address()}. Try again after ${windowMs} MS. You can only make a maximum of ${maxRequests} to prevent DOS attacks`
 });


productRoutes.route('/').get(productController.getAllProducts).post(productController.verifyBody, productController.validateQuantity, productController.createProduct)
productRoutes.route('/:id').get(productController.verifyQuantity, productController.getProduct).patch(productController.editProduct).delete(productController.deleteProduct);

module.exports = productRoutes;