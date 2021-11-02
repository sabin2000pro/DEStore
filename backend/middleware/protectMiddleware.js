const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const unauthorized = 401;

module.exports.protectProducts = async (request, response, next) => { // Middleware function to only grant registered admins the right to create, update and delete products

    try {
        let token;
        const headers = request.headers.authorization;

        if(headers && headers.startsWith("Bearer")) {
            token = headers.split(' ')[1];
        }
    
        if(!token) { // If no token is found
            return response.status(unauthorized).json("You are not authorized to access this route");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using jwt.verify()
        const admin = await Admin.findById(decoded.id); // Find an admin using that decoded token

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