const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'});
const port = process.env.PORT;
const connectDB = require('./database/db.js');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
connectDB();

const server = app.listen(port, (error) => { // Creates the Server
    if(!error) {
        return console.log(`Listening for requests on port ${port}`);
    }

    else {
        return console.log(`Could not listen for requests on port ${port}`);
    }
});

process.on('uncaughtException', (error, promise) => {
    if(error) {
        server.close();
        return process.exit(1);
    }
});