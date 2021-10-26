
// Fake Payment Model - NOT REAL - NOT USING STRIPE
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({ // Create payment schema
    cardholderName: {
        
    },
    
    cardType: {

    },

    cardNumber: { //  Card Number
        type: String,
        required: [true, 'You must specify your card number']
    },

    expiryDate: { // The expiry date of the card
        type: Date,
        required: [true, 'You must specify your card expiry date']
    },

    code: {
        type: String,
        required: [true, 'You must specify the CCV code at the back of your card'],
        unique: true
    },

    balance: {
        default: 1750.00
    },


});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;