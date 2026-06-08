const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('MongoDB Connected');
});

app.get('/products', async (req, res) => {

    const products = await Product.find();

    res.json(products);

});

app.post('/products', async (req, res) => {

    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description
    });

    await newProduct.save();

    res.send('Product Added');

});

app.post('/register', async (req, res) => {

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    await newUser.save();

    res.send('User Registered');

});

app.post('/login', async (req, res) => {

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if(user){
        res.send('Login Successful');
    }
    else{
        res.send('Invalid Email or Password');
    }

});

app.post('/orders', async (req, res) => {

    const newOrder = new Order({
        userName: req.body.userName,
        productName: req.body.productName,
        totalPrice: req.body.totalPrice
    });

    await newOrder.save();

    res.send('Order Placed Successfully');

});

app.listen(3000, () => {
    console.log('Server started');
});