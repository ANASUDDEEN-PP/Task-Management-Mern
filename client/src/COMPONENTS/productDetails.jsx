import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    console.log(id)

    useEffect(() => {
        // Fetch product details from API using the product ID
        axios.get(`http://localhost:5001/api/products/${id}`)
            .then(response => {
                setProduct(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [id]); 

    const proceedToCheck = () => {
        navigate('/order')
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="all-dt-product-detail">
            <Link to="/user">Back to Home</Link>
            <div className="all-dt-product-image">
                <img src={product.product_image} alt={product.product_name} />
            </div>
            <div className="all-dt-product-info">
                <h1 className="all-dt-product-name">{product.product_name}</h1>
                <p className="all-dt-product-description">{product.product_description}</p>
                <p className="all-dt-product-price">${product.product_price}</p>
                <div className="all-dt-product-dtls-btns">
                    <button className="all-dt-add-to-cart">Add to Cart</button>
                    <button className="all-dt-proceed-to-chk" onClick={proceedToCheck}>Proceed to Check</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
