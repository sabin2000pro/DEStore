const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product must contain a name'],
        unique: true
    },

    description: {
        type: String,
        required: [true, 'You must specify a description for the product'],
        unique: true
    },

    price: {
        type: Number,
        required: [true, 'You must specify the price of the product']
    },

    quantity: Number,

    saleOffer: {
        type: String,
        required: [true, 'You must specify the type of sale offer for the product']
    }


});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;