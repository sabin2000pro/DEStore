const fs = require('fs');
const mongoose = require('mongoose');
const Admin = require('../models/adminModel');
const Product = require('../models/productModel');

const connectDB = async () => { // Function that connects to the database
    try {
        return await mongoose.connect("mongodb+srv://sabin2000:123mini123@cluster0.sjkmj.mongodb.net/destore?retryWrites=true&w=majority", {

        }).then(conn => {
            if(conn.connection) {
                return console.log(`Successfully connected to Database`);
            }

        }).catch(err => {

            if(err) {
                return console.log(err);
            }
        });
    } 
    
    catch(error) {
        

        if(error) {
            return console.log(error.toString());
        }

    }
};

connectDB();

const importData = async () => { // Import Data from the database and write it to the file
    try {
        let dataWritten = false;
        const admins = await Admin.find(); // Find all admins from the db

        if(admins.length > 0) { // If there are admins in the database
            // Write to the file
            return fs.writeFile(`${__dirname}/../data/admins.json`, JSON.stringify(admins), (err) => {
                console.log(`Data written to file success`);
                dataWritten = true;

                if(dataWritten) {
                    return process.exit(1);
                }
                
            })
        }
    } 
    
    catch(error) {

        if(error) {
            return console.log(`Error: ${error.toString()}`);
        }
    }
};

const deleteData = async () => {
    try {
        await Admin.deleteMany().exec();
        console.log('Admin data deleted from file');
    } 
    
    catch(error) {
        console.log(`ERROR - ${error.toString()}`);
    }
};

const importProducts = async () => {
    try {
        const products = await Product.find();

        if(products.length > 0) {
            return fs.writeFile(`${__dirname}/../data/products.json`, JSON.stringify(products), (err) => {
                console.log(`Data written to file success`);
                
                return process.exit(1);
            })
            
        }
    } 
    
    catch(error) {

    }
};

const deleteProducts = async () => { // Delete products from the file
    try {

    } 
    
    catch(error) {

    }
}

if(process.argv[2] === '--import') { // Import the data from the database and write it to the file
    return importData();
};

if(process.argv[2] === '--delete') {
    return deleteData();
}

if(process.argv[2] === '--importproducts') {
    return importProducts();
}

if(process.argv[2] === '--deleteproducts') {
    return deleteProducts();
}