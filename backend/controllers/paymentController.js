const mongoose = require('mongoose');
const Payment = require('../models/paymentModel');
const created = 201;
const deleted = 204;
const serverError = 500;

module.exports.getAllPayments = async (request, response, next) => { // Function to Retrieve All Payments - THIS CAN ONLY BE DONE BY STORE MANAGERS
    try {
        const payments = await Payment.find();
        return response.status(200).json({payments});
    } 
    
    catch(error) {

    }
};

module.exports.createPayment = async (request, response, next) => { // Creates a Payment on the server
    try {
        const {cardholderName, cardType, cardNumber, expiryDate, code} = request.body;
        const payment = new Payment({cardholderName, cardType, cardNumber, expiryDate, code});
        await payment.save();

        return response.status(201).json("Payment Created");
    } 
    
    catch(error) {
        if(error) {
            return response.status(500).json({message: error.toString()});
        }
    }
};

module.exports.editPayment = async (request, response, next) => {
    try {
        const id = request.params.id;
        const newCardNumber = request.body.newCardNumber;
        const newCode = request.body.newCode;

        await Payment.findById(id, (error, updatedPayment) => {
            updatedPayment.cardNumber = newCardNumber;
            updatedPayment.code = newCode;

            updatedPayment.save();
            return response.send("Payment Updated");
            
        }).clone().catch(err => {console.log(err)});
    } 
    
    catch(error) {
        if(error) {
            return response.status(500).json({message: error.toString()});
        }
    }
}

module.exports.deletePayment = async (request, response, next) => { // Deletes a payment
    try {
        const id = request.params.id;
        await Payment.findByIdAndDelete(id);

        return response.status(deleted).json("Payment Deleted");
    } 
    
    catch(error) {
        if(error) {
            return response.status(serverError).json({message: error.toString()});
        }
    }
};