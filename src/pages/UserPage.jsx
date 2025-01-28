import React, { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
import WelcomeScreen from '../components/WelcomeScreen';
import '../styles/Pages.css'

const UserPage = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleSignUpClick = () => {
    setShowRegistrationForm(true);
  };

  const handleCancelClick = () => {
    setShowRegistrationForm(false);
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  return (
    <main>
      <h1 className="title">TickTockToe</h1>
      {isLoggedIn ? (
        <WelcomeScreen username={username} />
      ) : (
        <>
          {showRegistrationForm ? (
            <RegistrationForm visible={true} onCancel={handleCancelClick} />
          ) : (
            <>
              <button id="signup-button" type="button" onClick={handleSignUpClick}>Sign Up</button>
              <LoginForm onLogin={handleLogin} />
            </>
          )}
        </>
      )}
    </main>
  );
};

export default UserPage;