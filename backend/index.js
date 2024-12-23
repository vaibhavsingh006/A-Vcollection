require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const port = 3000;
const productRoutes = require('./routes/productRoutes')
const cors = require('cors');


app.use(express.json());
app.use(cors());


// mongoose.connect(process.env.MONGODB_URL)
mongoose.connect('mongodb://localhost:27017/copyAVProduction')
    .then(() => console.log('mongodb connect'))
    .catch((err) => console.log('not connected - ', err))

app.get('/', (req, res) => {
    res.send('fine')
})

app.use('/api', productRoutes)

app.listen(port, () => {
    console.log('running')
})                          