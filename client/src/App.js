import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Pages/AuthPage';

const Main = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Main;
