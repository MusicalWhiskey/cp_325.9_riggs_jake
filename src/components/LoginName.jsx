import '../styles/LoginName.css';
export default function LoginName({ username }) {
  return (
    <div>
      {username ? (
        <p id="login-name">{username} is logged in</p>
      ) : (
        <p id="login-name">Not logged in</p>
      )}
    </div>
  );
}