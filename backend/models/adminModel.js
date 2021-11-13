const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const BYTES = 20;
const ROUNDS = 10;

// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'You must specify the username'],
        message: "Username should not be left empty"
    },

    email: {
        type: String,
        required: [true, 'You must specify the Admin e-mail'],
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please provide a valid e-mail address"]
    },

    password: {
        type: String,
        required: [true, 'You must specify the Admin Password'],
        message: 'Password should not be left empty'
    },

    role: {
        type: String
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

adminSchema.methods.comparePasswords = function(password) { // Method to compare passwords before signing in
    return bcrypt.compare(password, this.password); // Returns true or false if the passwords match
}

adminSchema.methods.getResetPasswordToken = function() { // Get the reset password token
    const resetToken = crypto.randomBytes(BYTES).toString("hex"); // Create the reset token
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest('hex');

    this.passwordResetExpires = Date.now() + 10 * (60 * 1000); // 1 minute before expiration
    return resetToken; // Return the reset token
}

adminSchema.methods.getSignedToken = function() { // Sign a JSON web token for the admin
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
}

const Admin = mongoose.model('Admin', adminSchema); // Create the Admin Model
module.exports = Admin; // Export the Admin Model