const fs = require('fs');
const Order = require('./models/orderModel');
const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI;

const orders = JSON.parse(fs.readFileSync(`${__dirname}/data/orders.json`, 'utf-8')); // Read the Courses file
mongoose.connect("mongodb+srv://sabin2000:123mini123@cluster0.sjkmj.mongodb.net/destore?retryWrites=true&w=majority", {

    }).then(conn => {

         

        }).catch(err => {

            if(err) {
                return console.log(err);
            }
    });
    
const loadOrders = async () => {
    try {
        // Load orders from file
        await Order.create(orders); // Create orders
        console.log('Orders loaded into database');
        process.exit(1);
    } 
    
    catch(error) {
        if(error) {
            console.error(error);
        }
    }
};

const deleteOrders = async () => {
    try {
        await Order.deleteMany();
        console.log(`Orders deleted`);
        process.exit(1);
    }  
    
    catch(error) {
        if(error) {
            console.error(error);
        }
    }
}

if(process.argv[2] === '--importOrders') {
    return loadOrders();
}

if(process.argv[2] === '--deleteorders') {
    return deleteOrders();
}