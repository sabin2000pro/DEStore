const fs = require('fs');
const path = require('path');
const Admin = require('../models/adminModel');

const importData = async () => { // Import Data from the database and write it to the file
    try {

    } 
    
    catch(error) {
        if(error) {

        }
    }
};

const deleteData = async () => {
    try {

    } 
    
    catch(error) {

    }
};

if(process.argv[2] === '--import') { // Import the data from the database and write it to the file
    return importData();
};

if(process.argv[2] === '--delete') {
    return deleteData();
}