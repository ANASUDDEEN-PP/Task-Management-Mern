import React, { useState } from 'react';
import './order.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderForm = () => {
    // State to manage form inputs
    const [formData, setFormData] = useState({
        itemName: '',
        quantity: 0,
        address: ''
    });

    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can handle form submission, e.g., sending data to a server
        console.log('Form submitted:', formData);
        // Use axios.post instead of FormData
      axios
      .post('http://localhost:5001/api/order', formData)
      .then((result) => {
          alert('Order Placed successfully');
          console.log(result.data); // Assuming the server returns data
          console.log('Registered with:', formData);
          navigate('/user');
        
      })
      .catch((err) => {
        console.error('Something went wrong:', err);
      });
        // You can add further logic for form submission like API calls here
    };

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div>
            <h2>Order Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="itemName">Item Name:</label><br />
                    <input
                        type="text"
                        id="itemName"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity:</label><br />
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address:</label><br />
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Proceed To Payment</button>
            </form>
        </div>
    );
};

export default OrderForm;
