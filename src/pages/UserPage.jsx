import React, { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
import WelcomeScreen from '../components/WelcomeScreen';
import '../styles/Pages.css'
import LoginName from '../components/LoginName';
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
        <LoginName username={username} />
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
            <>
              <button id="signup-button" type="button" onClick={handleSignUpClick}>Sign Up</button>
              <p id="or-login">-Or Login-</p>
              {showLoginForm ? (
                <LoginForm onLogin={handleLogin} onCancel={handleCancelNewLogin} />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )}
            </>
          )}
        </>
      )}
    </main>
  );
};

export default UserPage;