import { useState } from 'react';
import axios from 'axios';
import '../styles/UserForm.css'
import PropTypes from 'prop-types';


const RegistrationForm = ({ visible, onCancel }) => {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        birthday: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    if (!visible) {
        return null; // Don't render the form if it's not visible
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Clear local storage before logging in
            localStorage.clear();

            const response = await axios.post(`http://localhost:8080/api/register`, formData);
            console.log(`User registered successfully:`, response.data);
            // Store the username in local storage
            localStorage.setItem('username', response.data.username);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
            <input type="date" name="birthday" placeholder="Birthday" value={formData.birthday} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
            <button id="cancel-register-button" type="button" onClick={onCancel}>Cancel</button>
            <button id="register-button" type="submit">Register</button>
            
        </form>
    );
};

RegistrationForm.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default RegistrationForm;