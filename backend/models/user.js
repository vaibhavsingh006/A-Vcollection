// models/User.js
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    orders: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
            },
            productquantity: Number,
            totalamount: Number,
            dateAdded: {
                type: Date,
                default: Date.now,
            },
            shippingAddress: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Address",
            },
        },
    ],
    contact: Number,
    profilePicture: Buffer,
    addresses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
        },
    ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
