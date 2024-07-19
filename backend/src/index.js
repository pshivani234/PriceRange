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




// to add a product
app.post('/add-product', async (req, res) => {
  try {
    const { email, name, url, highprice } = req.body;

    const checked = await ProductCollection.findOne({ url: req.body.url })
    if (checked) {
        return res.send("Product already exists");
    }
    else{
      const newProduct = new ProductCollection({
        email,
        name,
        url,
        highprice
      });

      // Save the product to the database
      await newProduct.save();

      // Respond with a success message or status code
      res.status(201).send('Product added successfully');
    }
  } 
  catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Failed to add product');
  }
});

//query to get products
app.get('/products', async (req, res) => {
    const userEmail = req.query.email; // email is passed as a query parameter
  
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
  
  // to delete product
  app.delete('/delete-product/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the product by ID and delete it
      const deletedProduct = await ProductCollection.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.status(404).send('Product not found');
      }
  
      res.status(200).send('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).send('Failed to delete product');
    }
  });


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


