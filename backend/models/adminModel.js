const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        
    },

    email: {

    },

    password: {

    },

    passwordResetToken: String,
    passwordResetExpires: Date
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;