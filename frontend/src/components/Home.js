import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../styles/Home.css';

const Home = () => {
  const [email,setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Values:', { url, name, minPrice, maxPrice });

    setUrl('');
    setName('');
    setMinPrice('');
    setMaxPrice('');
    setEmail('');
  };

  const HandleLogout = () => {
    toast.success("logged out");
    navigate('/');
  };

  const HandleWatchList = () => {
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
              <button onClick={HandleWatchList}>Watchlist</button>
            </li>
            <li>
              <button onClick={HandleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="main-content">
        <h2>Enter Product Details</h2>
        <form onSubmit={handleSubmit}>
        <div>
            <label>Enter Email for Notification:</label>
            <input type="email" value={email} onChange={(e) => setUrl(e.target.value)} />
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
