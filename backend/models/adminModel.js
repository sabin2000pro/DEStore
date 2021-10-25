const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'You must specify the username']
    },

    email: {
        type: String,
        required: [true, 'You must specify the Admin e-mail'],
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please provide a valid e-mail address"]
    },

    password: {
        type: String
    },

    passwordResetToken: String,
    passwordResetExpires: Date
});

adminSchema.pre('save', async function(next) { // Hash Admin Password before saving to the database
    if(!this.isModified('password')) {
        return next();
    }

    // Generate Salt
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin; // Export the Admin Model