const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const protect = require('../middleware/authMiddleware')


// PUT (Update) a product by ID
router.put('/:id', protect, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE a product by ID
router.delete('/:id', protect, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// create product
router.post('/', async (req, res) => {
    try {
        const { name, description, image, price, size, category, newarrivals } = req.body;

        // Validate required fields
        if (!name || !description || !price || !size || !category) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Validate category
        if (!['men', 'women', 'kids', 'others'].includes(category)) {
            return res.status(400).json({ message: 'Invalid category. Must be one of men, women, kids, or others.' });
        }

        // Create a new product
        const newProduct = new Product({
            name,
            description,
            image,
            price,
            size,
            category,
            newarrivals, // Optional: defaults to 'no' if not provided
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully!', product: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Failed to create product', error });
    }
});

module.exports = router;
