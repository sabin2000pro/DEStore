const express = require('express');
const productRoutes = express.Router();
const productController = require('../controllers/productsController');
const rateLimit = require('express-rate-limit');


productRoutes.route('/').get(productController.getAllProducts).post(productController.verifyBody, productController.validateQuantity, productController.createProduct)
productRoutes.route('/:id').get(productController.verifyQuantity, productController.getProduct).patch(productController.editProduct).delete(productController.deleteProduct);

module.exports = productRoutes;