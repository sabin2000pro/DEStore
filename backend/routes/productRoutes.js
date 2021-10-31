// Copyright: All Rights Reserved - Sabin Constantin Lungu Edinburgh Napier University
// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 27/10/2021 @ 09:53
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

productRoutes.route('/').get(productController.getAllProducts).post(productController.verifyBody, productController.validateQuantity, limiter, productController.createProduct);
productRoutes.route('/sortByPrice').get(productController.sortByPrice);
productRoutes.route('/:id').get(productController.getProduct).put(productController.editProduct).delete(productController.deleteProduct);
productRoutes.route('/verifyStock/:id').post(productController.verifyStock);

module.exports = productRoutes; // Export the product routes