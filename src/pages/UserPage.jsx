import React, { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
import '../styles/Pages.css'

const UserPage = () => {
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);

    const handleSignUpClick = () => {
        setShowRegistrationForm(true);
    };

    const handleCancelClick = () => {
        setShowRegistrationForm(false);
    };

    return (
        <main>
            <h1 className="title">TickTockToe</h1>
            {showRegistrationForm ? (
                <RegistrationForm visible={true} onCancel={handleCancelClick} />
            ) : (
                <>
                    <button id="signup-button" type="button" onClick={handleSignUpClick}>Sign Up</button>
                    <LoginForm />
                </>
            )}
        </main>
    );
};

export default UserPage;