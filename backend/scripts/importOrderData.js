const fs = require('fs');
const Order = require('../models/orderModel');
const mongoose = require('mongoose');

const connectDB = async () => { // Function that connects to the database

    try {
        let connected = false;

        return await mongoose.connect(DB_URI, {

        }).then(conn => {

            if(conn.connection) {
                console.log(`Successfully connected to Database`);
                connected = true;
            }

        }).catch(err => {

            if(err) {
                return console.log(err);
            }
        });
    } 
    
    catch(error) {

        if(error) {
            return console.error(error.toString());
        }

    }
};

const loadOrders = async () => {
    try {

    } 
    
    catch(error) {

    }
};

const deleteOrders = async () => {
    try {

    } 
    
    catch(error) {

    }
}