const mongoose = require('mongoose');
const Payment = require('../models/paymentModel');
const Admin = require('../models/adminModel');
const sendEmail = require('../utils/sendEmail');
const ok = 200;
const created = 201;
const deleted = 204;
const serverError = 500;

module.exports.getAllPayments = async (request, response, next) => { // Function to Retrieve All Payments - THIS CAN ONLY BE DONE BY STORE MANAGERS
    try {
        const payments = await Payment.find();
        return response.status(ok).json({payments});
    } 
    
    catch(error) {
        if(error) {
            return response.status(serverError).json({message: error.toString()});
        }
    }
};

module.exports.createPayment = async (request, response, next) => { // Creates a Payment on the server
    try {
        const {cardholderName, cardType, cardNumber, expiryDate, code} = request.body;
        const payment = new Payment({cardholderName, cardType, cardNumber, expiryDate, code});
        await payment.save();
        return response.status(created).json("Payment Created");
    } 
    
    catch(error) {
        if(error) {
            return response.status(500).json({message: error.toString()});
        }
    }
};

module.exports.getSinglePayment = async (request, response, next) => { // Returns a single payment from the database
    try {
        const id = request.params.id;
        const payment = await Payment.findById(id);
        return response.status(ok).json(payment);
    } 
    
    catch(error) {
        if(error) {
            return response.status(500).json({message: error.toString()});
        }
    }
}

module.exports.editPayment = async (request, response, next) => { // Function to edit a payment
    try {
        const id = request.params.id; // The ID
        const newCardHolderName = request.body.newCardHolderName;
        const newCardType = request.body.newCardType;
        const newCardNumber = request.body.newCardNumber;
        const newCode = request.body.newCode;

        await Payment.findById(id, (error, updatedPayment) => { // Update the Payment
            updatedPayment.cardholderName = newCardHolderName;
            updatedPayment.cardType = newCardType;
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