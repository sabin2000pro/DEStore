// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A
// Purpose of File: server.js => Used to connect to the server

// GLOBAL MIDDLEWARE
const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const session = require('express-session');
const helm = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const pdf = require('html-pdf');
const pdfReport = require('./reports/report');
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
app.use(cors());
app.use(morgan('dev'));
app.use(mongoSanitize());
app.use(helm());
app.use(hpp());
app.use(cookieParser());

app.use(xss());
app.use(session({
    secret: 'my-secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false
    }
  }));

  const limiter = rateLimit({
   windowMs: 20 * 60 * 1000, // 20 Minutes
   max: 20
});

app.use(limiter);

  // Call function to connect to the database
connectDB();
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/orders', orderRoutes);

app.post('/create-pdf', (req, res) => {
    pdf.create(pdfReport(req.body), {}).toFile('report.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})

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