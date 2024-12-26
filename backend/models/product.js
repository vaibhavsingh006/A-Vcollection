const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['men', 'women', 'kids', 'others'],
        required: true
    }, // Add category field
    newarrivals: {
        type: String,
        enum: ['yes', 'no'],
        default: 'no'
    }, // Make newarrivals optional
    bestselling: {
        type: String,
        enum: ['yes', 'no'],
        default: 'no'
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
