// models/User.js
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
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
        },
    ],
    contact: Number,
    profilePicture: Buffer,
});

// // Hash password before saving
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 10);
// });

// // Compare password
// userSchema.methods.matchPassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };

const User = mongoose.model("User", userSchema);
module.exports = User;
