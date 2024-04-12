import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './assets/style2.css'

const Header = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from localStorage
        const storedUserData = localStorage.getItem('userData');

        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setUserData(parsedUserData);
        }
    }, []);
    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('userData');

        alert("Logouting....");

        // Redirect to the login page
        navigate('/');
    };
  return (
    <header>
      <h1>Grand Shopping Web</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/add-product">add Products</a></li>
          <li><a href="/search">Search</a></li>
          <li><a href="/cart">Cart</a></li>
          <li><p className="nav-usernam">{userData ? userData.username : 'User'}</p></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
