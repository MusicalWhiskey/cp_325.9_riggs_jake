import { Link } from "react-router-dom";
import "../styles/Pages.css"


export default function NotFoundPage() {
  return (
    <main>
      <h1>Page Not Found</h1>

      <button className="link-button" to='/'>Start Page</button>
    </main>
  );
}
