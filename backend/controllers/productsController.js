const Product = require('../models/productModel');
const ok = 200;
const created = 201;
const badRequest = 400;
const notFound = 404;
const serverError = 500;

module.exports.verifyBody = (request, response, next) => {
    const {name, image, description, price, saleOffer} = request.body;

    if(!name || !image || !description || !price || !saleOffer) {
        return response.status(notFound).json("Please check your product creation entries again");
    }

    return next();
};

module.exports.verifyQuantity = (request, response, next) => { // Verifies the product quantity before sending e-mail if stock is low.
    const {quantity} = request.body; // The quantity

    if(quantity <= 3) {
        return response.status(200).json("Low Stock - E-mail will be sent");
    }

    
    return next();
}

module.exports.getAllProducts = async (request, response, next) => { // Returns all of the products
    try {
        const products = await Product.find();
        const length = products.length;
        console.log(length);

        return response.status(ok).json(products);
    } 
    
    catch(error) {

        if(error) {
            return response.status(serverError).json({message: 'Request Failed', error});
        }

    }
};

module.exports.getProduct = async (request, response, next) => {
    try {
        const id = request.params.id * 1;
        const product = await Product.findById(id);
        return response.status(ok).json(product);
    }
    
    catch(error) {
        
        if(error) {
            return response.status(serverError).json({message: 'Request Failed', error});
        }

    }
};

module.exports.createProduct = async (request, response, next) => {
    try {

    } 
    
    catch(error) {
        if(error) {
            return response.status(serverError).json({message: 'Request Failed', error});
        }
    }
};

module.exports.editProduct = async (request, response, next) => {
    try {

    } 
    
    catch(error) {
        if(error) {
            return response.status(serverError).json({message: 'Request Failed', error});
        }
    }
};

module.exports.deleteProduct = async (request, response, next) => {
    try {

    } 
    
    catch(error) {
        if(error) {
            return response.status(serverError).json({message: 'Request Failed', error});
        }
    }
};