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



app.use(cookieParser());
app.use(express.json());

// const allowedOrigins = [
//     'http://localhost:5173', // Local frontend
//     'https://a-vcollection.vercel.app', // Deployed frontend on Vercel
// ];

// // Configure CORS middleware
// app.use(
//     cors({
//         origin: (origin, callback) => {
//             if (!origin || allowedOrigins.includes(origin)) {
//                 callback(null, true); // Allow request
//             } else {
//                 callback(new Error('Not allowed by CORS')); // Block request
//             }
//         },
//         credentials: true, // Allow cookies
//     })
// );

app.use(
    cors({
        origin: '*', // Allow all origins
        credentials: true, // Allow cookies
    })
);





// mongoose.connect(process.env.MONGODB_URL)
mongoose.connect('mongodb://localhost:27017/copyAVProduction')
    .then(() => console.log('mongodb connect'))
    .catch((err) => console.log('not connected - ', err))

app.get('/', async (req, res) => {
    // let data = await product.find();
    // res.send(data)
    res.send('jdlkj')
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