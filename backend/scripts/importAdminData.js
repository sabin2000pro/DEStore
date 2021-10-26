const fs = require('fs');
const path = require('path');
const Admin = require('../models/adminModel');

const importData = async () => { // Import Data from the database and write it to the file
    try {
        const admins = await Admin.find().exec().then(docs => {}).catch(err => {});
        console.log(admins);


        if(admins.length > 0) { // If there are admins in the database
            // Write to the file
            fs.writeFileSync(`${__dirname}/data/admins.json`, JSON.stringify(admins), (err) => {

                if(err) {
                    console.log(err);
                }

            })
        }
    } 
    
    catch(error) {

        if(error) {
            return console.log(`Error: ${error.toString()}`);
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