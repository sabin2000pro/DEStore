const mongoose = require('mongoose');

// Copyright: All Rights Reserved - Sabin Constantin Lungu Edinburgh Napier University
// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A

const productSchema = new mongoose.Schema({ // The Product Description
    name: {
        type: String,
        required: [true, 'Product must contain a name'],
        unique: true
    },

    image: { // The Product Image
        type: String,
        required: [true, 'You must provide an Image URL for the product']
    },

    description: { // Prodcut Description
        type: String,
        required: [true, 'You must specify a description for the product'],
        unique: true
    },

    price: { // The price of the product
        type: Number,

        validate: function() {
            return this.price > 0.00;
        },

        message: 'Product price should be greater than £0.00'
    },

    priceDiscount: {
        type: Number,

        validate: function(val) { // Validate price discount
            return val < this.price;
        },

        message: 'Discount price should be below the regular product price'
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
        type: String
    }
    

});

const Product = mongoose.model('Product', productSchema); // Create a Schema out of the product
module.exports = Product; // Export the Product Model