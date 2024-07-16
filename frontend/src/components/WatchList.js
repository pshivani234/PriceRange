import React, { useEffect } from 'react';
import Card from './Card';
import '../styles/WatchList.css'
import { useState } from 'react';
import LogIn from './LogIn';


const Watchlist = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (email) => {
    setLoggedInUser(email);
  };


  const products = [
    
  ];

  return (
    <div className="cards-container">
      <h1>Products on Watch</h1>
    <div className="cards">
      {products.map((product, index) => (
        <Card key={index} product={product} />
      ))}
    </div>
    </div>
  );
};

export default Watchlist;
