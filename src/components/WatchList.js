import React from 'react';
import Card from './Card';
import '../styles/WatchList.css'


const Watchlist = () => {
  const products = [
    { name: 'Product 1', price: 100 },
    { name: 'Product 2', price: 200 },
    { name: 'Product 3', price: 300 },
    { name: 'Product 4', price: 400 },
    { name: 'Product 5', price: 500 },
    { name: 'Product 6', price: 600 },
    { name: 'Product 7', price: 700 },
    { name: 'Product 8', price: 800 },
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
