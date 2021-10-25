const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product must contain a name'],
        unique: true
    },

    image: {
        type: String,
        required: [true, 'You must provide an Image URL for the product']
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

    quantity: {
        type: String,
        required: [true, 'Admin - You must specify the amount of products you would like there to be in stock']
    },

    saleOffer: {
        type: String,
        required: [true, 'You must specify the type of sale offer for the product']
    }


});

const Product = mongoose.model('Product', productSchema); // Create a Schema out of the product
module.exports = Product; // Export the Product Model