const Product = require('../models/productModel');
const ok = 200;
const created = 201;
const badRequest = 400;
const notFound = 404;
const serverError = 500;

module.exports.getAllProducts = async (request, response, next) => { // Returns all of the products
    try {
        const products = await Product.find();
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