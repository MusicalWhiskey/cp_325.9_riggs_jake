import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <Link to="/">Login</Link>
      <Link to="/game">Game</Link>
      <Link to="/scores">Scores</Link>
      <Link to="/coffee">Coffee</Link>

    </nav>
  );
}
