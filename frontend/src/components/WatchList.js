import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Card from './Card';
import '../styles/WatchList.css';
import axios from 'axios';

const Watchlist = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Set a default email for testing purposes
    const loggedInUser = localStorage.getItem('loggedInUserEmail');

    // Function to fetch products based on user's email
    const fetchProducts = async () => {
      try {
        console.log(`Fetching products for email: ${loggedInUser}`);
        const response = await axios.get(`http://localhost:3000/products?email=${loggedInUser}`);
        console.log('Products fetched:', response.data);
        setProducts(response.data); // Set products fetched from backend
        toast.success('Products retrieved');
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts(); // Call fetchProducts on component mount
  }, []); // Empty dependency array means this useEffect runs once after initial render

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product._id !== productId));
  };

  const handleLogout = () => {
    toast.success('Logged out');
    navigate('/');
  };

  const handleHome = () => {
    navigate('/Home');
  };

  return (
    <div >
      <nav className="navbar">
        <div className="navbar-title">
          <h1>Price Range</h1>
        </div>
        <div className="navbar-links">
          <ul>
            <li>
              <button onClick={handleHome}>New Product</button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="cards-container">
        <h1>Products on Watch</h1>
        <div className="cards">
          {products.length > 0 ? (
            products.map((product, index) => (
              <Card key={index} product={product} onDelete={handleDelete} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
