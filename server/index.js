const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(cors());
const jsonParser = bodyParser.json({ limit: '10mb' });

//import Models
const userModel = require('./models/newUser');
const productModel = require('./models/ourProduct');


//mongoDB Connection
mongoose.connect('mongodb://localhost:27017/Grand-shopping');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});


// save the register data
app.post('/register', (req, res) => {
  const newUser ={
    username : req.body.username,
    phone : req.body.phone,
    query : req.body.query,
    password : req.body.password
  }

  userModel.create(newUser)
  .then(newUser =>{
    console.log('new user added to your DB', newUser);
    res.status(200).json({ message: 'User registered successfully' });
  })
  .catch(err => {
    console.error('Error creating a new user', err);
    res.status(500).json({ error: 'An error occurred while creating a user' });
  });
});

//login API
app.post('/api/login', async (req, res) => {
  console.log(req.body);

  const { query, password } = req.body;

  try {
    const user = await userModel.findOne({ query });
    const isPasswordValid = await userModel.findOne({ password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }


    if (isPasswordValid) {
      res.json({ message: 'Login Successfully' });
      console.log('login successfully')
    } else {
      res.json({ message: 'Invalid username or password' });
      console.log('invalid password');
    }
  } catch (error) {
    console.log('Something went wrong', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// user data fetching
app.get('/api/user/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      // Send the user data to the client
      res.json({ user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Add product route
app.post('/add/product', jsonParser, async (req, res) => {
  try {
    // Validate request body
    // console.log( { name, description, price, image } = req.body);


    // Create new product object
    const newProduct = {
      product_name: req.body.name,
      product_description: req.body.description,
      product_price: req.body.price,
      product_image: req.body.image
    };

    // Save new product to database
    const createdProduct = await productModel.create(newProduct);

    console.log('New product added to your DB:', createdProduct);
    res.status(200).json({ message: 'Product added successfully', product: createdProduct });
  } catch (err) {
    console.error('Error adding the product:', err);
    res.status(500).json({ error: 'An error occurred while adding the product' });
  }
});

//get all product from database
app.get('/api/getallproducts', async(req,res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})


//displat the product details
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const product = await productModel.findById(id);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
  } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


// Search products route
app.get('/api/products/search:keyword', async (req, res) => {
  const { keyword } = req.params;
  console.log(keyword);

  try {
      const products = await productModel.find({
          $or: [
              { product_name: { $regex: keyword, $options: 'i' } },
              { product_description: { $regex: keyword, $options: 'i' } }
          ]
      });
      res.json(products);
  } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


//order API
app.post('api/order',(req, res) => {
  const { itemName, address, quantity } = req.body;
  console.log(itemName, address, quantity);
})


//port address details
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});