require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.json());


// --- ROUTES ---

// 1. Home Page - List all products
app.get('/', async (req, res) => {
  const products = await Product.find();
  res.render('index', { products });
});

// 2. Add Product Page - Show Form
app.get('/add', (req, res) => {
  res.render('add');
});

// 3. Handle Form Submission
app.post('/add', async (req, res) => {
  const { name, price, category } = req.body;
  await Product.create({ name, price, category });
  res.redirect('/');
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server is live at http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1); // Stop the app if it can't connect
  }
};

startServer();