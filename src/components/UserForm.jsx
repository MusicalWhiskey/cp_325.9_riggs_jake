import React, { useState } from "react";

export default function UserForm() {
  const [username, setUsername] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem("username", username);
    alert(`Hello, ${username}! Refresh the browser to see updated username.`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
