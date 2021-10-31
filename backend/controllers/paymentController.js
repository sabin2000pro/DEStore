const mongoose = require('mongoose');
const Payment = require('../models/paymentModel');

module.exports.getAllPayments = async (request, response, next) => { // Function to Retrieve All Payments - THIS CAN ONLY BE DONE BY STORE MANAGERS
    try {
        return response.send("All Payments Here");
    } 
    
    catch(error) {

    }
};

module.exports.createPayment = async (request, response, next) => { // Creates a Payment on the server
    try {

    } 
    
    catch(error) {

    }
};

module.exports.editPayment = async (request, response, next) => {
    try {
        const id = request.params.id;
    } 
    
    catch(error) {
        if(error) {
            return response.status(500).json({message: error.toString()});
        }
    }
}

module.exports.deletePayment = async (request, response, next) => { // Deletes a payment
    try {

    } 
    
    catch(error) {

    }
};