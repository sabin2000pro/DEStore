const express = require('express');
const productRoutes = express.Router();
const productController = require('../controllers/productsController');

productRoutes.route('/').get(productController.verifyQuantity, productController.getAllProducts).post(productController.verifyBody, productController.createProduct)
productRoutes.route('/:id').get(productController.getProduct).put(productController.editProduct).delete(productController.deleteProduct);

module.exports = productRoutes;