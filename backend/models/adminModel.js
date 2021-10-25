const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        type: String,
        required: [true, 'You must specify the Admin Password']
    },

    passwordResetToken: String, // The password reset token for the admin.
    passwordResetExpires: Date // Expiry date for the password
});

adminSchema.pre('save', async function(next) { // Hash Admin Password before saving to the database
    if(!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // hash the password
});

adminSchema.methods.comparePasswords = async function(password) { // Method to compare passwords before signing in
    return await bcrypt.compare(password, this.password); // Returns true or false if the passwords match
}

adminSchema.methods.getSignedToken = function() { // Sign a JSON web token for the admin
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
}

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin; // Export the Admin Model