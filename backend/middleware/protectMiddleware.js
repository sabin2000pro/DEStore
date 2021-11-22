const Admin = require('../models/adminModel');
const asyncHandler = require('./asyncHandler');
const jwt = require('jsonwebtoken');
const unauthorized = 401;

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function protect() - Resets the password of the admin.
 * @description: This function verifies the request body before submitting the data
  * @returns next middleware function
 */

module.exports.protectProducts = asyncHandler(async (request, response, next) => { // Middleware function to only grant registered admins the right to create, update and delete products

        let token; // The JSON web token
        const headers = request.headers.authorization; // Extract it from the header

        if(headers && headers.startsWith("Bearer")) { // If the header starts with Bearer
            token = headers.split(' ')[1]; // Split the second index
        }

        // Otherwise use cookies
        else if(request.cookies.token) {
            token = request.cookies.token;
        }
    
        if(!token) { // If no token is found
            return response.status(unauthorized).json("You are not authorized to access this route");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using jwt.verify()
        const admin = await Admin.findById(decoded.id); // Find an admin using that decoded token

        if(!admin) { // If no admin found
            return response.status(unauthorized).json("No admin ID found with that token");
        }

        request.admin = admin;
        return next();
});

module.exports.authorize = (...roles) => {
    return (request, response, next) => {
        if(!roles.includes(request.user.roles)) {

        }
    }
}