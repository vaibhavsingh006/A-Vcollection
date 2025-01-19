// models/Address.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    contactNumber: { type: String, required: true },
    isPrimary: { type: Boolean, default: false }, // To mark the primary address
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
