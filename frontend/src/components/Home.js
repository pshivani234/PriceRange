import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import '../styles/Home.css';

const Home = () => {
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted Values:', { url, name, minPrice, maxPrice });

    try {
      const response = await axios.post('/add-product', {
        email,
        name,
        url,
        lowprice: Number(minPrice),
        highprice: Number(maxPrice)
      });

      if (response.status === 201) {
        toast.success('Product added to watchlist!');
        // Optionally, clear form fields after successful submission
        setUrl('');
        setName('');
        setMinPrice('');
        setMaxPrice('');
        setEmail('');
      } else {
        toast.error('Failed to add product.');
      }
    } catch (error) {
      toast.error('Failed to add product. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    toast.success('Logged out');
    navigate('/');
  };

  const handleWatchList = () => {
    navigate('/WatchList');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-title">
          <h1>Price Range</h1>
        </div>
        <div className="navbar-links">
          <ul>
            <li>
              <button onClick={handleWatchList}>Watchlist</button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="main-content">
        <h2>Enter Product Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Enter Email for Notification:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Enter Product URL:</label>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
          <div>
            <label>Enter Product Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Enter Price Range:</label>
            <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </div>
          <button type="submit">Add to Watchlist</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
