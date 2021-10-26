// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A

const express = require('express');
const productRoutes = express.Router();
const ip = require('ip');
const productController = require('../controllers/productsController');
const protect = require('../middleware/protectMiddleware');

const rateLimit = require('express-rate-limit');
const windowMs = 1 * 60 * 1000;
const maxRequests = 4;

const limiter = rateLimit({ // Options for rate limiting
    windowMs,
    maxRequests,
    message: `Too many requests coming from the IP: ${ip.address()}. Try again after ${windowMs} MS. You can only make a maximum of ${maxRequests} to prevent DOS attacks`
 });

productRoutes.route('/').get(productController.getAllProducts).post(protect.protectProducts, productController.verifyBody, productController.validateQuantity, limiter, productController.createProduct)
productRoutes.route('/:id').get(protect.protectProducts, productController.verifyQuantity, productController.getProduct).patch(protect.protectProducts, productController.editProduct).delete(protect.protectProducts, productController.deleteProduct);

module.exports = productRoutes; // Export the product routes