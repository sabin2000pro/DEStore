// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A

const Product = require('../models/productModel');
const User = require('../models/adminModel');
const sendEmail = require('../utils/sendEmail');
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
 * @function verifyStock()
 * @description: This function verifies the quantity of products that are in stock in the DE-Store System.
  * @returns next middleware function
 */

module.exports.verifyStock = async (request, response, next) => { // Verifies the product quantity before sending e-mail if stock is low. Middleware function before creating and retrieving a new product
    try {        
            const id = request.params.id; // Product ID
            const product = await Product.findById(id); 

            const {quantity, name} = product; // Extract the quantity and the name of the product
            const {email} = request.body; // Extract e-mail from the body
            const admin = await User.findOne({email}); // Find a user by e-mail address

           const lowStockMsg = `<h1>The quantity for the product ${name} is low in stock. More will be ordered soon. There are ${quantity} left in stock`;
           const outOfStockMsg = `<h1>Currently out of stock for the product ${name}. More stock will be ordered from the warehouse soon. </h1>`;

            if(quantity <= 3) { // If quantity is less than 3
                await sendEmail({to: admin.email, subject: "Low Stock", text: lowStockMsg});    
            }  
            
            if(quantity === 0) { // If there is no stock
                await sendEmail({to: admin.email, subject: "Out of stock", text: outOfStockMsg});    
            }

            return response.status(created).json("E-mail Sent");
        }   
    
    catch(error) {

        if(error) {
            return response.status(notFound).json({error: error.toString()})
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

        if(quantity > 5) {
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

module.exports.sortByPrice = async (request, response, next) => { // Sort Products By price
    try {
        const queryObj = {...request.query}; // Take out all of the request query objects
        const sort = request.query.sort;

        let queryStr = JSON.stringify(queryObj);
        let query = Product.find(JSON.parse(queryStr));

        if(sort) { // IF there is asort
            const sortBy = request.query.sort.split(',').join(' '); // Create the criteria for sorting by splitting by a comma and joining with an empty space
            query = query.sort(sortBy); // Sort by the specified field
        }

        const products = await query;
        return response.status(200).json({results: products.length, products});
    } 
    
    catch(error) {
        if(error) {
            return response.status(serverError).json({message: 'Request Failed', error});
        }
    }
}

module.exports.limitFields = async (request, response, next) => { // Function to limit fields
    try {
        const queryObj = {...request.query}; // The query object
        const excludedFields = ['limit', 'fields'];
        const page = request.query.page * 1 || 1; // The page from the request.query
        const limit = request.query.limit * 1 || 100; // The page limit
        const skip = (page - 1) * limit; // The previous page * limit
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        let query = Product.find(JSON.parse(queryStr)) // Parse the query string by finding all producgts
        query = query.skip(skip).limit(limit);

        if(request.query.fields) { // If there is a limit parameter
            const fields = request.query.fields.split(',').join(" ");
            query = query.select(fields);
        }

        const products = await query;
        return response.status(200).json({results: products.length, products});
    } 
    
    catch(error) {
        if(error) {
            return response.status(serverError).json({message: 'Request Failed', error: error.toString()});
        }
    }
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
        const PAGE_SIZE = 5;
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
        const {name, image, description, price, priceDiscount, quantity, saleOffer, colour} = request.body; // Extract body data
        const newProduct = new Product({name, image, description, price, priceDiscount, quantity, saleOffer, colour}); // Create a new product with the corresponding data

        await newProduct.save();
        return response.status(created).json("Product Created");
    
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
        const newPrice = request.body.newPrice;
        const newQty = request.body.newQty;
        const id = request.body.id;

        await Product.findById(id, (err, updatedProduct) => {
            updatedProduct.price = newPrice;
            updatedProduct.quantity = newQty;
            updatedProduct.save();

            return response.send("Data Updated");
        }).clone().catch(err => {console.log(err)});
    } 
    
    catch(error) {

        if(error) {
            return response.status(serverError).json({message: 'Request Failed', error: error.toString()});
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

        const admin = await User.findOne(); // Find a user by e-mail address
        let {quantity, name} = product;

        quantity--;
        const productDeletedMsg = `<h1>The product ${product} has been deleted from the inventory </h1>`;
        await sendEmail({to: admin, subject: "Product Deleted", text: productDeletedMsg});    

        return response.status(deleted).send(`Product Deleted - Quantity of this product is now ${quantity}`);
    } 
    
    catch(error) {

        if(error) {
            return response.status(serverError).json({message: 'Request Failed', error: error.toString()});
        }

    }
};