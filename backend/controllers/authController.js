// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A

const Admin = require('../models/adminModel');
const sendEmail = require('../utils/sendEmail');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const crypto = require('crypto');
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
module.exports.register = asyncHandler(async (request, response, next) => { // Register a new Admin
    const {username, email, password} = request.body; // Extract Username, Email and Password From the body

    if(!username || !email || !password) { // If there is no username, email or password provided
        return next(new ErrorResponse(`E-mail, Password or Username invalid, please re-enter data`, 400));
     }

     const newAdmin = new Admin({username, email, password}); // Create a new admin
     await newAdmin.save(); // Save it to the database
    
    return sendToken(newAdmin, created, response); // Generate and send JWT
});

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function login()
 * @description: This function logs in a user to the application
  * @returns next middleware function
 */

module.exports.login = asyncHandler(async (request, response, next) => {
     
        const {email, password} = request.body; // Extract E-mail and Password from the body

        if(!email || !password) {
            return response.status(badRequest).json({message: "Please provide your e-mail and password before logging in"});
        }

        const admin = await Admin.findOne({email}).select('+password'); // Find an admin by the e-mail

        if(!admin) {
            return response.status(badRequest).json({message: 'No admin found with that e-mail address'});
        }

        const isPasswordMatch = await admin.comparePasswords(password); // Returns true or false if passwords match or not

        if(!isPasswordMatch) { // If passwords don't match
            return response.status(badRequest).json({message: "Passwords do not match. Check your entries"});
        }

        return sendToken(admin, ok, response); // Send back JSON token. Used to log in the user
});

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function forgotPassword()
 * @description: This function verifies the request body before submitting the data
  * @returns next middleware function
 */

module.exports.forgotPassword = asyncHandler(async (request, response, next) => { // Forgot Password Function
    
       const {email} = request.body; // Extract the e-mail from the body
        const admin = await Admin.findOne({email}); // Find an admin by the e-mail address

        if(!email) { // If no e-mail found in the database
            return response.status(notFound).json({message: 'E-mail could not be sent. No admin found with that e-mail address'});
        }

        const resetToken = admin.getResetPasswordToken(); // Extract the password reset token from the model
        await admin.save();
        const resetURL = `http://localhost:3000/passwordreset/${resetToken}`; // The Reset Password URL LINK

        const resetMessage = `<h1> You have requested a new password reset</h1>
            <p> Please go to this link to reset your password </p>
            <a href = ${resetURL} clicktracking = off>${resetURL}</a>`
        
        // Send E-mail using Nodemailer
        await sendEmail({to: admin.email, subject: "Password Reset Request", text: resetMessage});
        return response.status(ok).json({success: true, data: "E-mail sent"});

});

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function verifyBody()
 * @description: This function verifies the request body before submitting the data
  * @returns next middleware function
 */

module.exports.resetPassword = asyncHandler(async (request, response, next) => { // Middleware function to reset the Admin Password

        const resetToken = request.params.resetToken; // Stores the reset token from the param
        const passwordBody = request.body.password; // The new password
        let passwordReset = false;

        const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest('hex'); // Create reset password token
        const admin = await Admin.findOne({passwordResetToken, passwordResetExpires: {$gt: Date.now()}});

        if(!admin) {
            throw new Error('No Admin Found with that E-mail Address');
        }

        admin.password = passwordBody; // Update the password by setting the admin password to the new password
        admin.passwordResetToken = undefined; // Set the reset token to undefined
        admin.passwordResetExpires = undefined; // Clear out the expiry date of the token - no longer valid

        await admin.save(); // Save the admin to the database
        passwordReset = true;
        return response.status(created).json({success: true, data: "Password Reset Success"});
});

module.exports.logout = asyncHandler(async(request, response, next) => {
     // Take the cookie and set it to null
     response.cookie('token', undefined, {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    return response.status(200).json({success: true, data: {}});
});

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function verifyBody()
 * @description: This function verifies the request body before submitting the data
  * @returns next middleware function
 */

module.exports.editAdmin = asyncHandler(async (request, response, next) => { // Middleware function to edit an admin
    try {
        const newUsername = request.body.newUsername;
        const newEmail = request.body.newEmail;
        const id = request.params.id;

        await Admin.findById(id, (err, updatedAdmin) => {
            updatedAdmin.username = newUsername;
            updatedAdmin.email = newEmail;
            updatedAdmin.save();

            return response.send("Admin Updated");

        }).clone().catch(err => {console.log(err)});
    } 
    
    catch(error) {
        
        if(error) {
            return response.status(badRequest).json({message: error.toString()});
        }
    }
});

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function verifyBody()
 * @description: This function verifies the request body before submitting the data
  * @returns next middleware function
 */

module.exports.getSingleAdmin = asyncHandler(async (request, response, next) => { // Middleware function to get a single admin
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
});

module.exports.getAllAdmins = asyncHandler(async (request, response, next) => {
    try {
        const admins = await Admin.find();

        if(!admins) {
            // Return error message
        }

        return response.status(200).json(admins);
    } 
    
    catch(error) {
        if(error) {
            return response.status(badRequest).json({message: error.toString()});
        }
    }
});

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function deleteAdmin()
 * @description: This function deletes a single admin from the system
  * @returns next middleware function
 */

module.exports.deleteAdmin = asyncHandler(async (request, response, next) => { // Middleware function to delete a single admin
    
    const id = request.params.id;
    await Admin.findByIdAndDelete(id);

    return response.status(deleted).json({message: 'Admin Deleted'});
});

/**
 * @param {*} admin: The admin data
 * @param {*} statusCode: Represents the status code of the request
 * @param {*} next: Next middleware function
 * @function sendToken()
 * @description: This function signs a unique JSON Web token when Store managers register and login
  * @returns The response with the generated token
 */

const sendToken = (admin, statusCode, response) => { // Sends back the JSON Web Token
    const token = admin.getSignedToken(); // Get the signed token from the admin model

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if(process.env.NODE_ENV === 'production') {
        options.secure = true;
    }


    return response.status(statusCode).cookie('token', token, options).json({success: true, token});
}