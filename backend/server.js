const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'});
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(morgan('dev'));

const server = app.listen(port, (error) => {
    if(!error) {
        return console.log(`Listening for requests on port ${port}`);
    }

    else {
        return console.log(`Could not listen for requests on port ${port}`);
    }
});

process.on('uncaughtException', (error, promise) => {
    
});