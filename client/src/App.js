import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './COMPONENTS/Login';
import UserDashboard from './COMPONENTS/dashboard';
import Signup from './COMPONENTS/Signup';
import AddProduct from './COMPONENTS/addProduct';
import ProductDetail from './COMPONENTS/productDetails';
import SearchPage from './COMPONENTS/productSearch'
import OrderPage from './COMPONENTS/order'

const Main = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/user" element={<UserDashboard />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/add-product" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Main;
