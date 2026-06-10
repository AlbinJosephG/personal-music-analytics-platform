import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Music Wrapped</h2>

      <div className="nav-links">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/compatibility">Compatibility</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;