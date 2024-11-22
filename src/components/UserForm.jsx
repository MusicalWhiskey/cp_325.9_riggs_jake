import React, { useState } from "react";
import '../styles/UserForm.css';

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem("username", username);
    setDisplayName(username);
  }

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {displayName && <div><p>Welcome, {displayName}!</p><br /><a href="/game">Ready to Play</a></div>}
    </div>
  );
}

