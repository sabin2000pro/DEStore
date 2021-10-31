// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A

const express = require('express');
const authRoutes = express.Router();
const authController = require('../controllers/authController');
const rateLimit = require('express-rate-limit');
const windowMs = 1000 * 60 * 1000;
const maxRequests = 3;

const limiter = rateLimit({ // Options for rate limiting
    windowMs,
    maxRequests,
    message: `Too many requests Try again after ${windowMs} MS. You can only make a maximum of ${maxRequests} to prevent DOS attacks`
 });

authRoutes.route('/register').post(limiter, authController.register);
authRoutes.route('/login').post(limiter, authController.login);
authRoutes.route('/getAdmins').get(authController.getAllAdmins);
authRoutes.route('/deleteAdmin/:id').delete(authController.deleteAdmin);

authRoutes.route('/forgotpassword').post(authController.forgotPassword); // Authentication Route for Forgot Password
authRoutes.route('/resetpassword/:resetToken').put(authController.resetPassword); // Authentication Route to reset the password.
authRoutes.route('/editAdmin/:id').put(authController.editAdmin);

module.exports = authRoutes; // Export authentication routes