const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'You must specify the username']
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
    if(!this.isModified('password')) {
        return next();
    }

    // Generate Salt
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin; // Export the Admin Model