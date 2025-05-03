import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <div className="logo">
        <img src="https://static-00.iconduck.com/assets.00/ticket-icon-2048x1280-axjsethv.png" alt="Tickets!" />
        <h1>The Ticket Board</h1>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/tickets">Tickets</Link>
        <Link to="/devices">Devices</Link>
      </nav>
    </header>
  );
}

export default Navbar;
