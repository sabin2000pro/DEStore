const Product = require('../models/productModel');
const ok = 200;
const created = 201;
const deleted = 204;
const badRequest = 400;
const notFound = 404;
const serverError = 500;

module.exports.verifyBody = (request, response, next) => {
    const {name, image, description, price, quantity, saleOffer} = request.body;

    if(!name || !image || !description || !price || !saleOffer || !quantity) {
        return response.status(notFound).json("Please check your product creation entries again");
    }

    return next();
};

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
            return response.status(404).json("An error processing the quantity")
        }
    }

    return next();
}

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

module.exports.createProduct = async (request, response, next) => { // Middleware function to create a product
    try {

        const {name, image, description, price, quantity, saleOffer} = request.body;
        const newProduct = new Product({name, image, description, price, quantity, saleOffer});
        await newProduct.save();

        return response.status(created).json("Product Created");
    } 
    
    catch(error) {

        if(error) {
            return response.status(serverError).json({message: 'Request Failed', cause: error.toString()});
        }

    }
};

module.exports.editProduct = async (request, response, next) => { // Modifies a Product such as the price, description, URL
    try {
        const id = request.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(id, request.body);

        // Send back response
        return response.status(ok).json(updatedProduct);
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