import React from 'react';

const WelcomeScreen = ({ username }) => {
  console.log('WelcomeScreen rendered');
  return (
    <div>
      <h2>Welcome, {username}!</h2>
    </div>
  );
};

export default WelcomeScreen;