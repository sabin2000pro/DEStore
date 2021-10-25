const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {

    },

    email: {

    },

    password: {
        type: String
    },

    passwordResetToken: String,
    passwordResetExpires: Date
});

adminSchema.pre('save', async function(next) { // Hash Admin Password before saving to the database

});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;