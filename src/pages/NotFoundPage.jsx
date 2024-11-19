import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main>
      <h1>Page Not Found</h1>

      <Link to='/'>Start Page</Link>
    </main>
  );
}
