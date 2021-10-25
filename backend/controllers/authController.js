const Admin = require('../models/adminModel');
const ok = 200;
const created = 201;
const deleted = 204;
const badRequest = 400;
const serverError = 500;

module.exports.register = async (request, response, next) => { // Register a new Admin
    try {
        const {username, email, password} = request.body;

        if(!username || !email || !password) {
            return response.status(404).json({message: 'Please make sure you provide the correct details before registering'});
        }

        const newAdmin = new Admin({username, email, password});
        await newAdmin.save();

        return sendToken(newAdmin, created, response);
    } 
    
    catch(error) {

        if(error) {
            return response.status(500).json({message: error.toString()});
        }

    }
};

module.exports.login = async (request, response, next) => { // Function to login an Admin
    try {
        const {email, password} = request.body;

        if(!email || !password) {
            return response.status(404).json({message: "Please provide your e-mail and password before logging in"});
        }

        const admin = await Admin.findOne({email}).select('+password');

        if(!admin) {
            return response.status(404).json({message: 'No admin found with that e-mail address'});
        }

        const isPasswordMatch = await admin.comparePasswords(password);

        if(!isPasswordMatch) {
            return response.status(404).json({message: "Passwords do not match. Check your entries"});
        }

        return sendToken(admin, ok, response);
    } 
    
    catch(error) {
        if(error) {
            return response.status(500).json({message: error.toString()});
        }
    }

};

module.exports.forgotPassword = async (request, response, next) => {

}

module.exports.resetPassword = async (request, response, next) => {

}

const sendToken = (admin, statusCode, response) => {
    const token = admin.getSignedToken();
    return response.status(statusCode).json({success: true, token});
}