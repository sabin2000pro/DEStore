const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');

module.exports.protectProducts = async (request, response, next) => { // Middleware function to only grant registered admins the right to create, update and delete products
    let token;
    const headers = request.headers.authorization; // Get the auth headers;

    if(headers && headers.startsWith("Bearer")) {
        token = headers.split(",")[1]; // Split the token header -> Bearer AAFJAFJ
    }

    if(!token) {

    }


};