const express = require('express');
const authRoutes = express.Router();
const authController = require('../controllers/authController');
const rateLimit = require('express-rate-limit');
const windowMs = 1000 * 60 * 1000;
const maxRequests = 2;

const limiter = rateLimit({ // Options for rate limiting
    windowMs,
    maxRequests,
    message: `Too many requests Try again after ${windowMs} MS. You can only make a maximum of ${maxRequests} to prevent DOS attacks`
 });

authRoutes.route('/register').post(limiter, authController.register);
authRoutes.route('/login').post(authController.login);

module.exports = authRoutes;