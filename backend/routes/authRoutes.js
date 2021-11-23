// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A

const express = require('express');
const authRoutes = express.Router();
const authController = require('../controllers/authController'); // Import Controller Functions

authRoutes.route('/register').post(authController.register); // Route for -> /api/v1/auth/register: Sends a POST request to register a new admin
authRoutes.route('/login').post(authController.login); // Route for -> /api/v1/auth/login: Sends a POST request to Login an admin.
authRoutes.get('/logout', authController.logout); // Route for -> /api/v1/auth/logout: Logs out an admin by sending a GET request to the route.
authRoutes.route('/getAdmins').get(authController.getAllAdmins);
authRoutes.route('/deleteAdmin/:id').delete(authController.deleteAdmin);
authRoutes.route('/deleteAdmins').delete(authController.deleteAdmins);

authRoutes.route('/forgotpassword').post(authController.forgotPassword); // Route for /api/v1/auth/forgotpassword -> Sends a POST request which sends an e-mail to the admin to reset their password
authRoutes.route('/resetpassword/:resetToken').put(authController.resetPassword);
authRoutes.route('/editAdmin/:id').put(authController.editAdmin); // Route for /api/v1/auth/editAdmin/:id -> Sends a PUT request to update the details of an admin.

module.exports = authRoutes; // Export authentication routes