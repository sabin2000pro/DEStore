// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A
// Purpose of File: server.js => Used to connect to the server

// GLOBAL MIDDLEWARE
const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const hpp = require('hpp');
const cors = require('cors');
const session = require('express-session');
const helm = require('helmet');
const xss = require('xss-clean');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'});

const port = process.env.PORT;
const connectDB = require('./database/db.js');
const app = express();
const notFound = 404;
// Routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(express.json());
app.use(morgan('dev'));
app.use(mongoSanitize());
app.use(helm());
app.use(hpp());
app.use(cookieParser());
app.use(cors());

app.use(xss());
app.use(session({
    secret: 'my-secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false
    }
  }));


  // Call function to connect to the database
connectDB();
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/orders', orderRoutes);

app.all('*', (request, response, next) => {
    response.status(notFound).json({message: "404 - Page not found"});
    return next();
})

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

module.exports = server; // Export server