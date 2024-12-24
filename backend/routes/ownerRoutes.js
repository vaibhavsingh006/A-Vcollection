const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Owner = require('../models/owner');

// Register (Signup) Route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if owner already exists
        let owner = await Owner.findOne({ email });
        if (owner) {
            return res.status(400).json({ message: 'Owner already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new owner
        owner = new Owner({
            username,
            email,
            password: hashedPassword
        });

        // Save the owner in the database
        await owner.save();

        // Generate a JWT token
        const token = jwt.sign({ email, id: owner._id }, process.env.JWT_KEY, { expiresIn: '1h' });

        // Send success response along with token
        res.status(201).json({ message: 'Signup successful', token, redirectTo: '/admin' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find owner by email
        let owner = await Owner.findOne({ email });
        if (!owner) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the password with the stored hash
        const isPasswordMatch = await bcrypt.compare(password, owner.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Password does not match' });
        }

        // Generate JWT token
        const token = jwt.sign({ email, id: owner._id }, process.env.JWT_KEY, { expiresIn: '1h' });

        // Set token in cookies for session management
        res.cookie('token', token, { httpOnly: true });

        // Return success response with token
        res.status(200).json({ message: 'Login successful', token, redirectTo: '/admin' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;