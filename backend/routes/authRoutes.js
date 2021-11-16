// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A

const express = require('express');
const authRoutes = express.Router();
const authController = require('../controllers/authController');

authRoutes.route('/register').post(authController.register);
authRoutes.route('/login').post(authController.login);
authRoutes.get('/logout', authController.logout);
authRoutes.route('/getAdmins').get(authController.getAllAdmins);
authRoutes.route('/deleteAdmin/:id').delete(authController.deleteAdmin);

authRoutes.route('/forgotpassword').post(authController.forgotPassword);
authRoutes.route('/resetpassword/:resetToken').put(authController.resetPassword); 
authRoutes.route('/editAdmin/:id').put(authController.editAdmin);

module.exports = authRoutes; // Export authentication routes