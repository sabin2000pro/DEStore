// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A

const Admin = require('../models/adminModel');
const ok = 200;
const created = 201;
const deleted = 204;
const badRequest = 400;
const notFound = 404;
const serverError = 500;

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next - Calls next middleware function in the chain
 * @function register()
 * @description: This middleware function allows admins to register an account with their username, email and password.
  * @returns next middleware function
 */
module.exports.register = async (request, response, next) => { // Register a new Admin
    try {
        const {username, email, password} = request.body; // Extract Username, Email and Password From the body

        if(!username || !email || !password) { // If there is no username, email or password provided
            return response.status(badRequest).json({message: 'Please make sure you provide the correct details before registering'});
        }

        const newAdmin = new Admin({username, email, password}); // Create a new admin
        await newAdmin.save(); // Save it to the database

        return sendToken(newAdmin, created, response); // Generate and send JWT
    } 
    
    catch(error) {

        if(error) {
            return response.status(serverError).json({message: error.toString()});
        }
    }
};

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function login()
 * @description: This function logs in a user to the application
  * @returns next middleware function
 */

module.exports.login = async (request, response, next) => {
    try {
        const {email, password} = request.body; // Extract E-mail and Password from the body

        if(!email || !password) {
            return response.status(notFound).json({message: "Please provide your e-mail and password before logging in"});
        }

        const admin = await Admin.findOne({email}).select('+password'); // Find an admin by the e-mail

        if(!admin) {
            return response.status(notFound).json({message: 'No admin found with that e-mail address'});
        }

        const isPasswordMatch = await admin.comparePasswords(password); // Returns true or false if passwords match or not

        if(!isPasswordMatch) { // If passwords don't match
            return response.status(notFound).json({message: "Passwords do not match. Check your entries"});
        }

        return sendToken(admin, ok, response); // Send back JSON token. Used to log in the user
    } 
    
    catch(error) {

        if(error) {
            return response.status(serverError).json({message: error.toString()});
        }

    }
};

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function forgotPassword()
 * @description: This function verifies the request body before submitting the data
  * @returns next middleware function
 */

module.exports.forgotPassword = async (request, response, next) => { // Forgot Password Function
    try {
        const {email} = request.body; // Extract the e-mail from the body
        const admin = await Admin.findOne({email}); // Find an admin by the e-mail address

        if(!email) {
            return response.status(notFound).json({message: 'E-mail could not be sent. No admin found with that e-mail address'});
        }

        // Get the reset token
        const resetToken = admin.getResetPasswordToken(); // Extract the password reset token
        await admin.save();

        const resetURL = `http://localhost:3000/passwordreset/${resetToken}`; // The Reset Password URL LINK

        const resetMessage = `<h1> You have requested a new password reset</h1>
            <p> Please go to this link to reset your password </p>
            <a href = ${resetPasswordURL} clicktracking = off>${resetURL}</a>`

        
        // Send E-mail using Nodemailer

        return response.status(ok).json({success: true, data: "E-mail sent"});
    } 
    
    catch(error) {

        if(error) {
            return response.status(badRequest).json({message: error.toString()});
        }

    }
}

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function verifyBody()
 * @description: This function verifies the request body before submitting the data
  * @returns next middleware function
 */

module.exports.resetPassword = async (request, response, next) => { // Middleware function to reset the Admin Password
    try {
        // Reset password here
        const {email} = request.body; // Get user e-mail
    } 
    
    catch(error) {
        if(error) {
            return response.status(badRequest).json({message: error.toString()});
        }
    }
}

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function verifyBody()
 * @description: This function verifies the request body before submitting the data
  * @returns next middleware function
 */

module.exports.editAdmin = async (request, response, next) => {
    try {
        const id = request.params.id;

        if(!id) { // If no ID is specified
            return response.status(notFound).json("Admin ID invalid - Please check your entry");
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(id, request.body).exec(); // Updated admin
        return response.status(ok).json(updatedAdmin);
    } 
    
    catch(error) {
        
        if(error) {
            return response.status(badRequest).json({message: error.toString()});
        }

    }
}

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function verifyBody()
 * @description: This function verifies the request body before submitting the data
  * @returns next middleware function
 */

module.exports.getSingleAdmin = async (request, response, next) => { // Middleware function to get a single admin
    try {
        const id = request.params.id;
        const admin = await Admin.findById(id).exec();

        return response.status(ok).json(admin);
    } 
    
    catch(error) {

        if(error) {
            return response.status(badRequest).json({message: error.toString()});
        }

    }
}

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function deleteAdmin()
 * @description: This function deletes a single admin from the system
  * @returns next middleware function
 */

module.exports.deleteAdmin = async (request, response, next) => { // Middleware function to delete a single admin
    try {
        const id = request.params.id;
        await Admin.findByIdAndDelete(id);

        return response.status(deleted).json({message: 'Admin Deleted'});
    } 
    
    catch(error) {
        if(error) {
            return response.status(badRequest).json({message: error.toString()});
        }
    }
}

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function verifyBody()
 * @description: This function verifies the request body before submitting the data
  * @returns next middleware function
 */

const sendToken = (admin, statusCode, response) => { // Sends back the JSON Web Token
    const token = admin.getSignedToken(); // Get the signed token from the admin model
    return response.status(statusCode).json({success: true, token});
}