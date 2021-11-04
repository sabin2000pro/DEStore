
// Fake Payment Model - NOT REAL - NOT USING STRIPE
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({ // Create payment schema

    cardholderName: {
        type: String,
        required: [true, 'You must specify the name of the Cardholder']
    },

    product: {
        type: String,
        required: [true, 'Please specify the product you are paying for']
    },
    
    cardType: {
        type: String,
        required: [true, 'You must specify the card type'],
        enum: ['VISA', 'Mastercard']
    },

    cardNumber: { //  Card Number
        type: String,
        maxlength: 19,
        minlength: 1,
        required: [true, 'You must specify your card number']
    },

    expiryDate: { // The expiry date of the card
        type: String,
        required: [true, 'You must specify your card expiry date']
    },

    code: {
        type: Number,
        required: [true, 'You must specify the CCV code at the back of your card'],
        unique: true,
        maxlength: 3
    },

    balance: { // Default Balance that customers can spend
        type: Number,
        default: 2000.00
    },

});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment; // Export the payment model