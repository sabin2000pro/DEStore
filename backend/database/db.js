const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI;

const connectDB = async () => { 
    try {
        return await mongoose.connect()
    } 
    
    catch(error) {
        if(error) {
            return console.log(error.toString());
        }
    }
}