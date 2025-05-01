import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <div className="logo">
        <img alt="Tickets!" />
        <h1>The Ticket Board</h1>
      </div>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
}

export default Navbar;
