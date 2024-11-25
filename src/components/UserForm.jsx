import React, { useState } from "react";
import '../styles/UserForm.css';
import { Link } from "react-router-dom";

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
            placeholder="Ex: TicTacChamp"
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <button type="submit">Set Name</button>
      </form>
      {displayName && <div className="welcome-message">Welcome, {displayName}!
      <Link to="/game"><button className="play-button">Click Here to Play</button>
      </Link><p className="timer-message">Timer Will Start Automatically</p></div>}
    </div>
  );
}

