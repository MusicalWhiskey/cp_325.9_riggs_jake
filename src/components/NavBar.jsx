import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <Link to="/game">Game</Link>
      <Link to="/chats">Chats</Link>
      <Link to="/scores">Scores</Link>
      <Link to="/">Start Page</Link>
    </nav>
  );
}
