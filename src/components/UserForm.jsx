import React, { useState } from "react";

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
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {displayName && <p>Welcome, {displayName}!</p>}
    </div>
  );
}

