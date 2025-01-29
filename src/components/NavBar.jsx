import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import { useEffect, useState } from "react";

export default function NavBar({ username }) {
  return (

      <div className="navbar-container">
        <nav className="navbar">
          <Link to="/">START</Link>
          <Link to="/game">GAME</Link>
          <Link to="/scores">SCORES</Link>
          <Link to="/donate">DONATE</Link>
        </nav>
      </div>
  );
}