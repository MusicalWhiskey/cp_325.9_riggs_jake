import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        identifier: '', // This can be either username or email
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
            const response = await axios.post('/api/login', credentials);
            console.log('User logged in successfully:', response.data);
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
