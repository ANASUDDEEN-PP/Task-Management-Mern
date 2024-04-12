import React, { useState, useEffect } from 'react';
import './assets/allproduct.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function DisplayProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/api/getallproducts')
            .then(response => {
                console.log(response.data)
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []); // Empty dependency array to run once on component mount

    return (
        <div className='main-section'>
            <div className="display-main-ctr">
                {products.map((product, index) => (
                    <div className="product-div" key={index}>
                        {/* Product Image */}
                        <img
                            src={product.product_image}
                            alt={`product-img-${index}`}
                            className="product-img"
                        />
                        
                        {/* Product Name */}
                        <h1 className="product-name">{product.product_name}</h1>
                        
                        {/* Product Price */}
                        <h2 className="product-price">${product.product_price}</h2>
                        
                        {/* Product Buttons (Add to Cart and View) */}
                        <div className="product-btn">
                            {/* Add to Cart Button */}
                            <button className="product-btn">Add to Cart</button>
                            
                            {/* View Button (Using React Router Link) */}
                            <Link className="view-btn" to={`/product/${product._id}`}>
                                View
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DisplayProducts;
