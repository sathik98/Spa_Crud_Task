import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../Stylesheets/Navbar/Navbar.scss";
import org_logo from "../../Assests/Images/org_logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    // setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/TablePage" className="nav-links">
          <img src={org_logo} className="org_logo" alt="logo"></img>
        </a>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <a href="/TablePage" className="nav-links">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/Organization" className="nav-links">
              Organization
            </a>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-links" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
