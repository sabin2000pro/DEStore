const express = require('express');
const productRoutes = express.Router();
const productController = require('../controllers/productsController');

productRoutes.route('/').get(productController.getAllProducts)
productRoutes.route('/:id')


module.exports = productRoutes;