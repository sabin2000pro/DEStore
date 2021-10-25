const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI;

const connectDB = async () => { 
    try {
        return await mongoose.connect(DB_URI, {

        }).then(conn => {
            if(conn.connection) {
                return console.log(`Successfully connected to Database`);
            }

        }).catch(err => {
            if(err) {
                return console.log(err);
            }
        })
    } 
    
    catch(error) {
        if(error) {
            return console.log(error.toString());
        }
    }
};

module.exports = connectDB;