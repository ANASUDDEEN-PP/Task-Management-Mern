import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './Pages/Dashboard/dasboard';
import AllTask from './Pages/Tasks/allTask';
import ViewTask from './Pages/Tasks/ViewTask/viewTask'
import NotFound from './Pages/notFound/notFound';

//Auth Pages
import Login from './Pages/Auth/Auth.jsx'

const Main = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Dashboard />}/>
          <Route exact path='/tasks' element={<AllTask />}/>
          <Route exact path="/tasks/:id/viewTask" element={<ViewTask />} />
          <Route exact path='*' element={<NotFound />}/>
          {/* Authentication Screens */}
          <Route exact path="/auth" element={<Login />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default Main;
