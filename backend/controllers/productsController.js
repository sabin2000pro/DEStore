const Product = require('../models/productModel');
const ok = 200;
const created = 201;
const badRequest = 400;
const notFound = 404;
const serverError = 500;

module.exports.verifyBody = (request, response, next) => {
    const {name, image, description, price, quantity, saleOffer} = request.body;

    if(!name || !image || !description || !price || !saleOffer) {
        return response.status(notFound).json("Please check your product creation entries again");
    }

    return next();
};

module.exports.verifyQuantity = async (request, response, next) => { // Verifies the product quantity before sending e-mail if stock is low. Middleware function before creating and retrieving a new product
    
    const product = await Product.find();    

    if(quantity <= 3) {
        return response.status(200).json("Low Stock - E-mail will be sent");
    }

    return next();
}

module.exports.getAllProducts = async (request, response, next) => { // Returns all of the products
    try {
        const products = await Product.find();
        const length = products.length;
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
        const {name, image, description, price, quantity, saleOffer} = request.body;
        const newProduct = new Product({name, image, description, price, quantity, saleOffer});
        await newProduct.save();

        return response.status()
    } 
    
    catch(error) {

        if(error) {
            return response.status(serverError).json({message: 'Request Failed', cause: error.toString()});
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
        const id = request.params.id;
        await Product.findByIdAndRemove(id).exec();
        return response.send("Product Deleted");
    } 
    
    catch(error) {
        if(error) {
            return response.status(serverError).json({message: 'Request Failed', error});
        }
    }
};