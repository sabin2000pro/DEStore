const mongoose = require('mongoose');

// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product must contain a name'],
        unique: true
    },

    image: { // The Product Image
        type: String,
        required: [true, 'You must provide an Image URL for the product']
    },

    description: {
        type: String,
        required: [true, 'You must specify a description for the product'],
        unique: true
    },

    price: { // The price of the product
        type: Number,
        required: [true, 'You must specify the price of the product']
    },

    quantity: { // The quantity of the product
        type: Number,
        required: [true, 'Admin - You must specify the amount of products you would like there to be in stock']
    },

    saleOffer: {
        type: String,
        required: [true, 'You must specify the type of sale offer for the product']
    },

    colour: {
        type: String,
        required: [true, 'You must specify the colour of the product']
    }

});

const Product = mongoose.model('Product', productSchema); // Create a Schema out of the product
module.exports = Product; // Export the Product Model