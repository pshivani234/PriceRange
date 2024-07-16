import React from 'react';
import '../styles/Card.css'

const Card = ({ product }) => {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>Current Price{product.price}</p>
      <div>
        <span>
        <a href={product.url}>Visit Product</a>
        </span>
        <span>
          <button>delete</button>
        </span>
      </div>
    </div>
  );
};

export default Card;
