import React, { useEffect, useState } from 'react';
import './assets/allproduct.css';

import Display from './displayProducts';

const AllProducts = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Fetch user data from localStorage
        const storedUserData = localStorage.getItem('userData');

        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setUserData(parsedUserData);
        }
    }, []);

    return (
        <div className="all-product-main-section">
            <div className='all-prd-one-sctn'>
                <h1 className="welcome-user">
                    Hai <span className='user-highlight'>{userData ? userData.username : 'User'}</span> <br /> Welcome Back !
                </h1>
            </div>
            <div className="product-display">
                <h1 className="all-prd-title">
                    Our Products
                </h1>
                <Display />
            </div>
        </div>
        
    );
};

export default AllProducts;
