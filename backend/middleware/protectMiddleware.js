const Admin = require('../models/adminModel');
const asyncHandler = require('./asyncHandler');
const jwt = require('jsonwebtoken');
const unauthorized = 401;

module.exports.protectProducts = asyncHandler(async (request, response, next) => { // Middleware function to only grant registered admins the right to create, update and delete products

        let token; // The JSON web token
        const headers = request.headers.authorization; // Extract it from the header

        if(headers && headers.startsWith("Bearer")) { // If the header starts with Bearer
            token = headers.split(' ')[1]; // Split the second index
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