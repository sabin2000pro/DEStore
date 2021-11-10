const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI; // The connection string

// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A
// File Purpose: Creates a connection to the MongoDB Database

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

module.exports = connectDB; // Export the function to connect to the database