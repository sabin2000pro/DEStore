const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const unauthorized = 401;

module.exports.protectProducts = async (request, response, next) => { // Middleware function to only grant registered admins the right to create, update and delete products

    try {
        let token; // Get the token
        const headers = request.headers.authorization; // Get the auth headers;
    
        if(headers && headers.startsWith("Bearer")) { // If the header starts with Bearer
            token = headers.split(' ')[1]; // Split the token header to include the full token -> Bearer AAFJAFJ
        }
    
        if(!token) { // If no token is found
            return response.status(unauthorized).json("You are not authorized to access this route");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);

        if(!admin) {
            return response.status(unauthorized).json("No admin ID found with that token");
        }

        request.admin = admin;
        return next();
    }
    
    catch(error) {

        if(error) {
            return response.status(unauthorized).json("You are not authorized to reach this route");
        }
    }
};