
// eslint-disable-next-line react/prop-types
const WelcomeScreen = ({ username }) => {
  console.log('WelcomeScreen rendered');
  return (
    <div>
      <h2>Welcome, {username}!</h2>
    </div>
  );
};


export default WelcomeScreen;