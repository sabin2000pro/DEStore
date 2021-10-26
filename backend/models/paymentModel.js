
// Fake Payment Model - NOT REAL - NOT USING STRIPE
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({ // Create payment schema
    cardholderName: {
        
    },
    
    cardType: {

    },

    cardNumber: { // The card number

    },

    expiryDate: {
        type: Date,
        required: [true, 'You must specify your card expiry date']
    },

    code: {
        type: String,
        required: [true, 'You must specify the CCV code at the back of your card'],
        unique: true
    }
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;