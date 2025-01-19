const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const User = require('../models/user')
const Address = require('../models/address')
const protect = require('../middleware/authMiddleware')
const ownerLoginCheck = require('../middleware/ownerMiddleware')
// const cookieParser = require('cookie-parser');



// router.use(cookieParser());

// PUT (Update) a product by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    const updatedData = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
            new: true, // Return the updated document
            runValidators: true, // Validate the updates
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Failed to update product' });
    }
});


// DELETE a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// create product
router.post('/', ownerLoginCheck, async (req, res) => {
    try {
        const { name, description, image, price, size, category, newarrivals, bestselling } = req.body;

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
            bestselling,
            createdBy: req.user.id
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully!', product: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Failed to create product', error });
    }
});


// added to the cart
router.get('/addtocart/:id', protect, async function (req, res) {
    let user = await User.findOne({ email: req.user.email });
    console.log(user);

    try {
        const productId = req.params.id;
        console.log(productId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.stock <= 0) {
            return res.status(400).json({ message: "Product is out of stock" });
        }

        // Check if the product already exists in the cart
        const existingCartItem = user.cart.find((item) => item.productId.toString() === productId);
        if (existingCartItem) {
            // Update the quantity, but ensure it doesn't exceed the available stock
            if (existingCartItem.quantity + 1 > product.stock) {
                return res.status(400).json({ message: "Insufficient stock" });
            }
            existingCartItem.quantity += 1;
        } else {
            // Add a new item to the cart
            user.cart.push({ productId, quantity: 1 });
        }

        await user.save();
        res.json({ message: "Product added to cart" });
    } catch (err) {
        res.status(500).json({ message: "Error adding product to cart !" });
    }
})

// GET /api/cart
router.get("/cart", protect, async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user is authenticated and user ID is available
        const user = await User.findById(userId).populate("cart.productId");

        if (!user || user.cart.length === 0) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        // Fetch product details for each cart item
        const cartItems = await Promise.all(
            user.cart.map(async (item) => {
                const product = await Product.findById(item.productId);

                return {
                    _id: product._id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    quantity: item.quantity,
                };
            })
        );

        res.status(200).json({ cartItems });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch cart items" });
    }
});


// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products', details: err.message });
    }
});

// GET a product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch product', details: err.message });
    }
});


// =--------------------= address related
// add address here
router.post('/add-address', protect, async (req, res) => {
    try {
        const { addressLine1, addressLine2, city, state, pincode, contactNumber, isPrimary } = req.body;

        const address = new Address({
            userId: req.user._id, // current user
            addressLine1,
            addressLine2,
            city,
            state,
            pincode,
            contactNumber,
            isPrimary,
        });

        await address.save();

        // Add the new address to the user's addresses array
        const user = await User.findById(req.user._id);
        user.addresses.push(address._id);
        await user.save();

        res.status(201).json({ message: 'Address added successfully', address });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding address' });
    }
});

module.exports = router;
