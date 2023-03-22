const mongoose = require('mongoose');

const RegisterSchema = mongoose.Schema({
    email: {
        type: String,
        required: 'email is required',
        trim: true
    },
    password: {
        type: String,
        trim: true,
    },
    isProfileComplete: {
        type: Boolean,
    },
    isSubscribed: {
        type: Boolean
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('RegisterUser', RegisterSchema);
