require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const port = 3000;
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')
const ownerRoutes = require('./routes/ownerRoutes')
const cors = require('cors');
const product = require('./models/product')
const ownerLoginCheck = require('./middleware/ownerMiddleware')
const cookieParser = require('cookie-parser');
const path = require("path");



app.use(cookieParser());
app.use(express.json());

// Static files serve karna (React app ka build folder)
app.use(express.static(path.join(__dirname, "./")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./", "index.html"));
});

const allowedOrigins = [
    'http://localhost:5173', // Local frontend
    'https://a-vcollection-1.onrender.com', // Deployed frontend on Vercel
];

// Configure CORS middleware
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true); // Allow request
            } else {
                callback(new Error('Not allowed by CORS')); // Block request
            }
        },
        credentials: true, // Allow cookies
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);


// mongoose.connect('mongodb://localhost:27017/copyAVProduction')
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
})
    .then(() => console.log('mongodb connect'))
    .catch((err) => console.log('not connected - ', err))

app.get('/', async (req, res) => {
    // let data = await product.find();
    // res.send(data)
    res.send('backend Connected')
})


app.get('/logout', (req, res) => {
    try {
        res.clearCookie('owner', {
            httpOnly: true, // Same options as when the cookie was set
            secure: process.env.NODE_ENV === 'production', // Use secure only in production
            sameSite: 'lax', // Match the sameSite policy you used while setting the cookie
        });
        res.status(200).json({ message: 'Logged out successfully', redirectTo: '/' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while logging out' });
    }
});


app.get('/admin', ownerLoginCheck, (req, res) => {
    res.status(200).json({ message: 'Welcome to the owner dashboard!' });
})

app.use('/api', productRoutes)
app.use('/auth', authRoutes)
app.use('/owner', ownerRoutes)

app.listen(port, () => {
    console.log('running')
})

module.exports = app;