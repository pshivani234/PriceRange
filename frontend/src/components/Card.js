import React from 'react';
import '../styles/Card.css'
import axios from 'axios';

const Card = ({ product, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/delete-product/${product._id}`);
      onDelete(product._id); // Call onDelete with the deleted product ID
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>Current Price: {product.price}</p>
      <div>
        <span>
        <a href={product.url}>Visit Product</a>
        </span>
        <br />
        <br />
        <span>
          <button onClick={handleDelete}>delete</button>
        </span>
      </div>
    </div>
  );
};

export default Card;
