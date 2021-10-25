const Product = require('../models/productModel');
const ok = 200;
const created = 201;
const badRequest = 400;
const notFound = 404;
const serverError = 500;

module.exports.checkBody = (request, response, next) => {
    const {} = request.body;

    return next();
};

module.exports.verifyQuantity = (request, response, next) => {

    return next();
}

module.exports.getAllProducts = async (request, response, next) => { // Returns all of the products
    try {
        let productsRetrieved = false;
        const products = await Product.find();
        productsRetrieved = true;

        if(productsRetrieved) {

        }

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
    
};

module.exports.editProduct = async (request, response, next) => {

};

module.exports.deleteProduct = async (request, response, next) => {

};