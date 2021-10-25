const Admin = require('../models/adminModel');
const ok = 200;
const created = 201;
const deleted = 204;
const badRequest = 400;
const serverError = 500;

module.exports.register = async (request, response, next) => {
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

        }

    }
};

module.exports.login = async (request, response, next) => {

};

module.exports.forgotPassword = async (request, response, next) => {

}

module.exports.resetPassword = async (request, response, next) => {

}

const sendToken = (admin, statusCode, response) => {
    const token = admin.getSignedToken();
    return response.status(statusCode).json({success: true, token});
}