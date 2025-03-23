//this component is for the nav bar at at the top of the page
import { useState } from "react";
import "./navbar.css";
export default function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="menu-button"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          ☰
        </button>
        {showDropdown && (
          <div className="dropdown">
            <a href="#about">About</a>
          </div>
        )}
      </div>
      <div className="navbar-center">
        <h1 className="navbar-title">Your Economy Dashboard</h1>
      </div>
    </nav>
  );
}
