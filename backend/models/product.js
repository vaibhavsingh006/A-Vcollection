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
    },
    newarrivals: {
        type: String,
        enum: ['yes', 'no', 'Yes', 'No'],
        default: 'no'
    },
    bestselling: {
        type: String,
        enum: ['yes', 'no', 'Yes', 'No'],
        default: 'no'
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    variations: [
        {
            size: {
                type: String,
            },
            color: {
                type: String,
            },
            stock: {
                type: Number,
                default: 0,
            }
        }
    ],
    discount: {
        type: Number,
        default: 0,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
