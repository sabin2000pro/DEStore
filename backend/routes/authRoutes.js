const express = require('express');
const authRoutes = express.Router();
const authController = require('../controllers/authController');

authRoutes.route('/register').post(authController.register);
authRoutes.route('/login').post(authController.login);

module.exports = authRoutes;