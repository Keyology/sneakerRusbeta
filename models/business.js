const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const busisnessSchema = new Schema({

    account_id: {
        type: mongoose.Schema.Types.ObjectId,
    },


    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    street_address: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    zipCode: {
        type: String,
        required: true

    },

    country: {
        type: String,
        require: true
    },

    store_name: {
        type: String,
        required: true
    },

    phone_number: {
        type: String,
        required: true
    },

    instagram_handle: {
        type: String,
        required: true

    },

    createdAt: {
        type: Date,
        default: Date.now

    }


})

module.exports = mongoose.model('Busisness', busisnessSchema);