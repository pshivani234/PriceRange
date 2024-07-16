// Your Express app setup (app.js or index.js)
const express = require("express");
const path = require("path");
const app = express();
const LogInCollection = require("./mongodb");
const ProductCollection = require("./product"); 
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Signup endpoint
app.post('/signup', async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    };
    try {
        const checking = await LogInCollection.findOne({ email: req.body.email });
        if (checking) {
            return res.status(400).send("User already exists");
        } else {
            await LogInCollection.insertMany([data]);
            return res.status(201).send("Signup successful");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error processing signup");
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ email: req.body.email });
        if (check && check.password === req.body.password) {
            res.status(200).send("Login successful");
        } else {
            res.status(400).send("Incorrect email or password");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing login");
    }
});




// POST route to add a product
app.post('/add-product', async (req, res) => {
  try {
    const { email, name, url, lowprice, highprice } = req.body;

    // Check if the email exists in your database (optional, based on your application logic)
    // This is to ensure you associate the product with the correct user if needed
    // Example: const user = await LogInCollection.findOne({ email });

    // Create a new product document
    const newProduct = new ProductCollection({
      email,
      name,
      url,
      lowprice,
      highprice
    });

    // Save the product to the database
    await newProduct.save();

    // Respond with a success message or status code
    res.status(201).send('Product added successfully');
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Failed to add product');
  }
});

app.get('/products', async (req, res) => {
    const userEmail = req.query.email; // Assuming the email is passed as a query parameter
  
    try {
      // Query products based on user's email
      const products = await ProductCollection.find({ email: userEmail });
  
      if (products.length === 0) {
        return res.status(404).json({ message: 'No products found for this user' });
      }
  
      res.status(200).json(products); // Respond with JSON array of products
    } catch (error) {
      console.error('Error retrieving products:', error);
      res.status(500).send('Failed to retrieve products');
    }
  });
  



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


