import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/style.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (username === '' || password === '' || phone === '' || email === '') {
      toast.error('All fields are required to fill');
    } else {
      // Create an object with the form data
      const formData = {
        username,
        phone,
        email,
        password,
      };

      // Use axios.post instead of FormData
      axios
        .post('http://localhost:5001/register', formData)
        .then((result) => {
            alert('User Created Successfully');
            console.log(result.data); // Assuming the server returns data
            console.log('Registered with:', formData);
            navigate('/');
          
        })
        .catch((err) => {
          console.error('Something went wrong:', err);
          toast.error('Something went wrong');
        });
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        <h2>Signup</h2>
        <form>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Mobile Number"
          />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="button" onClick={handleRegister}>
            Register
          </button>
          <Link to="/" className="link-one">
            I don't have any account
          </Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;