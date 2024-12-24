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


app.use(express.json());
app.use(cors());


// mongoose.connect(process.env.MONGODB_URL)
mongoose.connect('mongodb://localhost:27017/copyAVProduction')
    .then(() => console.log('mongodb connect'))
    .catch((err) => console.log('not connected - ', err))

app.get('/', async (req, res) => {
    // let data = await product.find();
    // res.send(data)
    res.send('jdlkj')
})

app.use('/api', productRoutes)
app.use('/auth', authRoutes)
app.use('/owner', ownerRoutes)

app.listen(port, () => {
    console.log('running')
})                          