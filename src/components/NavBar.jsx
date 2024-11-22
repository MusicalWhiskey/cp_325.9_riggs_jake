import { Link } from "react-router-dom";
import "../styles/NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">Start</Link>
      <Link to="/game">Game</Link>
      <Link to="/scores">Scores</Link>
      <Link to="/support">Support</Link>
    </nav>
  );
}
