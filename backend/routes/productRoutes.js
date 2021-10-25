const express = require('express');
const productRoutes = express.Router();
const productController = require('../controllers/productsController');

productRoutes.param('/', productController.verifyBody);
productRoutes.param('/', productController.verifyQuantity);

productRoutes.route('/').get(productController.getAllProducts).post(productController.createProduct)
productRoutes.route('/:id').get(productController.getProduct).put(productController.editProduct).delete(productController.deleteProduct);

module.exports = productRoutes;