const express = require('express');
const productRoutes = express.Router();
const productController = require('../controllers/productsController');

productRoutes.route('/').get(productController.getAllProducts).post(productController.verifyBody, productController.validateQuantity, productController.createProduct)
productRoutes.route('/:id').get(productController.verifyQuantity, productController.getProduct).put(productController.editProduct).delete(productController.deleteProduct);

module.exports = productRoutes;