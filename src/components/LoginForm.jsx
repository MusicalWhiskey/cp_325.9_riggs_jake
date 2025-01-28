import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Clear local storage before logging in
      localStorage.clear();

      const response = await axios.post('http://localhost:4000/api/login', credentials);
      console.log('User logged in successfully:', response.data);
      // Store the username in local storage
      const username = response.data.username;
      localStorage.setItem('username', username);
      onLogin(username);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="identifier" placeholder="Username or Email" value={credentials.identifier} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
      <button id="login-button" type="submit">Login</button>
    </form>
  );
};

export default LoginForm;