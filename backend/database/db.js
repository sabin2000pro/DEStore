const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI;

// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A
// File Purpose: Creates a connection to the MongoDB Database

const connectDB = async () => { // Function that connects to the database
    try {

        return await mongoose.connect(DB_URI, {

        }).then(conn => {

            if(conn.connection) {
                console.log(`Successfully connected to Database`);
            }


        }).catch(err => {

            if(err) {
                console.log(err);
            }
        });
    } 
    
    catch(error) {

        if(error) {
            console.log(error.toString());
        }

    }
};

module.exports = connectDB; // Export the function to connect to the database