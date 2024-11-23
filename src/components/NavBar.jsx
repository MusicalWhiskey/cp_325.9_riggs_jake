import { Link } from "react-router-dom";
import "../styles/NavBar.css";

export default function NavBar() {
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
