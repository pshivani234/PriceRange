import React, { useState, useEffect } from 'react';
import Card from './Card';
import '../styles/WatchList.css';
import axios from 'axios';

const Watchlist = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Set a default email for testing purposes
    const loggedInUser = 'user@example.com';

    // Function to fetch products based on user's email
    const fetchProducts = async () => {
      try {
        console.log(`Fetching products for email: ${loggedInUser}`);
        const response = await axios.get(`http://localhost:3000/products?email=${loggedInUser}`);
        console.log('Products fetched:', response.data);
        setProducts(response.data); // Set products fetched from backend
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts(); // Call fetchProducts on component mount
  }, []); // Empty dependency array means this useEffect runs once after initial render

  return (
    <div className="cards-container">
      <h1>Products on Watch</h1>
      <div className="cards">
        {products.length > 0 ? (
          products.map((product, index) => (
            <Card key={index} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
