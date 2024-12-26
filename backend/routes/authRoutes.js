// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register a new user

// router.post('/register', async (req, res) => {
//     try {
//         let { username, email, password } = req.body;
//         let user = await User.findOne({ email: email });
//         if (user) res.status(400).json({ message: 'User already exists' });

//         else {
//             bcrypt.genSalt(10, function (err, salt) {
//                 bcrypt.hash(password, salt, async function (err, hash) {
//                     if (err) {
//                         console.log('error hai password me ')
//                         res.status(400).json({ message: `password error, ${err}` });
//                     }
//                     else {
//                         let user = await User.create({
//                             email,
//                             password: hash,
//                             username
//                         })
//                         // res.send(user)
//                         let token = jwt.sign({ email, id: user._id }, process.env.JWT_KEY);
//                         res.cookie('token', token);
//                         res.cookie('owner', '');
//                         res.status(201).json({ message: 'Signup successful', redirectTo: '/' }); // Redirect to home
//                     }
//                 })
//             })
//         }
//     }
//     catch (err) {
//         res.send(err.send);
//     }
// })

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log('data', req.body)

        // Check if user already exists
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);
        // console.log('hash pass', hashedPassword)
        // // Create new user
        // const newUser = await User.create({
        //     email,
        //     password: hashedPassword,
        //     username
        // });

        const hashedPassword = await bcrypt.hash(password, 10); // bcrypt automatically handles the salt generation
        console.log('hash pass', hashedPassword)

        // Create a new user and save to the database
        const newUser = await User.create({
            email,
            password: hashedPassword,
            username
        });

        // Generate token
        // const token = jwt.sign({ email, id: newUser._id }, process.env.JWT_KEY);

        // // Send response with token in cookies
        // res.cookie('token', token, { httpOnly: true });
        // res.cookie('owner', '', { httpOnly: true }); // Optional, based on your need

        // Send success response with redirect information
        res.status(201).json({ message: 'Signup successful', redirectTo: '/login' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Login user and generate token

router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        console.log('Received login request:', req.body);
        // Find the user by email
        let user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Password does not match' });
        }

        // Generate a JWT token
        let token = jwt.sign({ email, id: user._id }, process.env.JWT_KEY);

        // Set cookies
        res.cookie('token', token, { httpOnly: true });

        // Send successful login response
        res.status(200).json({ message: 'Login successful', redirectTo: '/' });

    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;
