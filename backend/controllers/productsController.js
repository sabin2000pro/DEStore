// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A

const Product = require('../models/productModel');
const ok = 200;
const created = 201;
const deleted = 204;
const badRequest = 400;
const notFound = 404;
const serverError = 500;

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function verifyBody()
 * @description: This function verifies the request body before submitting the data
  * @returns next middleware function
 */

module.exports.verifyBody = (request, response, next) => { // Verify the body before creating a product
    const {name, image, description, price, quantity, saleOffer} = request.body;

    if(!name || !image || !description || !price || !saleOffer || !quantity) {
        return response.status(notFound).json("Please check your product creation entries again");
    }

    return next();
};

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function verifyBody()
 * @description: This function verifies the request body before submitting the data
  * @returns next middleware function
 */

module.exports.verifyQuantity = async (request, response, next) => { // Verifies the product quantity before sending e-mail if stock is low. Middleware function before creating and retrieving a new product
    try {
        const method = request.method; // The method being requested

        if(method === 'GET') {
            const id = request.params.id;
            const product = await Product.findById(id); 
            const {quantity, name} = product; // Extract the quantity and the name of the product

            if(quantity <= 3) {
                console.log(`LOW STOCK The product ${name} has a quantity of ${quantity}`);
                // Send E-mail
            }  
            
            if(quantity === 0) { // If there is no stock
                console.log(`Out of stock. Product is going to be ordered`);
                // Send E-mail for re-stock
            }
        }    
    } 
    
    catch(error) {

        if(error) {
            return response.status(notFound).json("An error processing the quantity")
        }
    }

    return next();
}

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds with a status code
 * @param {*} next 
 * @function validateQuantity -> Determines if the quality is > 5 then send back JSON.
 * @description: This function verifies the request body before submitting the data
  * @returns next middleware function
 */

module.exports.validateQuantity = async (request, response, next) => { // Middleware function to be added before creating a product. Admin cannot add more than 5 quantities
    try {
        const {quantity} = request.body;

        if(quantity >= 5) {
            return response.status(badRequest).json("You cannot create more than 5 products at once");
        }

    } 
    
    catch(error) {

        if(error) {
            return response.status(404).json("An error validting the quantity")
        }
    }

    return next();
}

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function getAllProducts() -> Retrieves all products from the database
 * @description: This function is used to retrieve all of the stored products in the database
  * @returns next middleware function
 */

module.exports.getAllProducts = async (request, response, next) => { // Returns all of the products
    try {    
        const PAGE_SIZE = 3;
        const page = parseInt(request.query.page || "0"); // Get the page from the request

        const total = await Product.countDocuments({}); // Count the number of documents
        const products = await Product.find({}).limit(PAGE_SIZE).skip(PAGE_SIZE * page); // Find all the products by limiting them

        return response.status(ok).json({products, total: Math.ceil(total / PAGE_SIZE)});
    } 
    
    catch(error) {

        if(error) {
            return response.status(serverError).json({message: 'Request Failed', error});
        }

    }
};

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function getProduct() -> Retrieves all of the products from the database
 * @type: Asynchronous Function
 * @description: This function verifies the request body before submitting the data
  * @returns next middleware function
 */
module.exports.getProduct = async (request, response, next) => {
    try {
        const id = request.params.id;
        const product = await Product.findById(id);
        return response.status(ok).json(product);
    }
    
    catch(error) {
        
        if(error) {
            return response.status(serverError).json({message: 'Request Failed', error});
        }
    }
};

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function createProduct()
 * @description: This function verifies the request body before submitting the data
  * @returns next middleware function
 */

module.exports.createProduct = async (request, response, next) => { // Middleware function to create a product
    try {
        let productCreated = false;
        const {name, image, description, price, quantity, saleOffer, colour} = request.body; // Extract body data
        const newProduct = new Product({name, image, description, price, quantity, saleOffer, colour}); // Create a new product with the corresponding data
        await newProduct.save();
        productCreated = true;

        if(productCreated) {
            return response.status(created).json("Product Created");
        }
    } 
    
    catch(error) {

        if(error) {
            return response.status(serverError).json({message: 'Request Failed', cause: error.toString()});
        }
    }
};

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function editProduct() -> Edits a product by sending a PATCH request
 * @description: This function verifies the request body before submitting the data
  * @returns next middleware function
 */

module.exports.editProduct = async (request, response, next) => { // Modifies a Product such as the price, description, URL
    try {
        const id = request.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(id, request.body);
        return response.status(ok).json(updatedProduct);
    } 
    
    catch(error) {

        if(error) {
            return response.status(serverError).json({message: 'Request Failed', error});
        }

    }
};

/**
 * 
 * @param {*} request - Receives client request
 * @param {*} response - Server responds
 * @param {*} next 
 * @function verifyBody()
 * @description: This function verifies the request body before submitting the data
  * @returns next middleware function
 */

module.exports.deleteProduct = async (request, response, next) => { // Function that deletes a product
    try {
        const id = request.params.id;
        const product = await Product.findByIdAndRemove(id).exec();
        let {quantity} = product;
        quantity -= 1;

        return response.status(deleted).send(`Product Deleted - Quantity of this product is now ${quantity}`);
    } 
    
    catch(error) {

        if(error) {
            return response.status(serverError).json({message: 'Request Failed', error: error.toString()});
        }

    }
};