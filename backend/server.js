// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A
// Purpose of File: server.js => Used to connect to the server

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'});
const port = process.env.PORT;
const connectDB = require('./database/db.js');
const app = express();

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
connectDB();

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', authRoutes);

const server = app.listen(port, (error) => { // Creates the Server
    if(!error) {
        console.log(`Listening for requests on port ${port}`);
    }

    else {
        console.log(`Could not listen for requests on port ${port}`);
    }
});

process.on('uncaughtException', (error, promise) => {
    if(error) {
        server.close();
        return process.exit(1);
    }
});

module.exports = server;