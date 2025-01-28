import React, { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
import WelcomeScreen from '../components/WelcomeScreen';
import '../styles/Pages.css'

const UserPage = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleSignUpClick = () => {
    setShowRegistrationForm(true);
  };

  const handleCancelClick = () => {
    setShowRegistrationForm(false);
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    setShowLoginForm(false);
  };

  const handleChangeUser = () => {
    setIsLoggedIn(false);
    setShowLoginForm(true);
  };

  const handleCancelNewLogin = () => {
    setShowLoginForm(false);
    setIsLoggedIn(true);
  };

  return (
    <main>
      <h1 className="title">TickTockToe</h1>
      {isLoggedIn && !showLoginForm ? (
        <>
          <WelcomeScreen username={username} />
          <button id="change-user-button" type="button" onClick={handleChangeUser}>Change User</button>
        </>
      ) : (
        <>
          {showRegistrationForm ? (
            <RegistrationForm visible={true} onCancel={handleCancelClick} />
          ) : (
            showLoginForm ? (
              <LoginForm onLogin={handleLogin} onCancel={handleCancelNewLogin} />
            ) : (
              <>
                <button id="signup-button" type="button" onClick={handleSignUpClick}>Sign Up</button>
                <LoginForm onLogin={handleLogin} />
              </>
            )
          )}
        </>
      )}
    </main>
  );
};

export default UserPage;