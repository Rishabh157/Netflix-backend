const mongoose = require('mongoose');

const userSubcription = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    cardNumber: {
        type: String,
        required: true,
    },
    expDate: {
        type: String,
        required: true,
    },
    cvv: {
        type: String,
        required: true,
    },
    plan: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('subscripion', userSubcription);
