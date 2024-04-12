// Import React and useState hook
import React, { useState } from 'react';
import axios from 'axios';
import './addProduct.css';
import { Link } from 'react-router-dom';


const AddProduct = () => {
  // Use useState hook to manage component state
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Read the image file as a base64 encoded string
      setProductImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the product object
    const productData = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      image: productImage,
    };

    // Example: Send productData to your backend using Axios or fetch
    console.log(productData);

    // Reset form fields after submission
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductImage('');

    try {
      const response = await axios.post('http://localhost:5001/add/product', productData);

      console.log(response.data); // Log the data received from the backend

    } catch (error) {
      console.error('Error during login:', error);
    }

  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label><br />
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Description:</label><br />
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Price:</label><br />
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Image:</label><br />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        {productImage && (
          <img src={productImage} alt="Product Preview" style={{ maxWidth: '200px' }} />
        )}
        <div>
          <button type="submit">Add Product</button>
        </div>
        <Link to='/user'>Back to Home</Link>
      </form>
    </div>
  );
};


export default AddProduct;
