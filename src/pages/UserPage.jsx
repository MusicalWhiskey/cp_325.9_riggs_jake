// UserPage.js
import { useState, useEffect } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
import WelcomeScreen from '../components/WelcomeScreen';
import '../styles/Pages.css'

const UserPage = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUsername = localStorage.getItem('username');
    console.log('storedIsLoggedIn:', storedIsLoggedIn);

    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setShowLoginForm(false);
    }
  }, []);

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
    console.log('localStorage:', localStorage);
    localStorage.setItem('isLoggedIn', 'true');  };

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
      {isLoggedIn ? (
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
                <button id="login-button" type="button" onClick={() => setShowLoginForm(true)}>Login</button>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
};

export default UserPage;