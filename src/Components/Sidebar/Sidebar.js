// Sidebar.js

import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../Stylesheets/Sidebar/Sidebar.scss";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? "sidebar active" : "sidebar"}>
      <div className="sidebar-toggle" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <a href="/" className="sidebar-link">
            Home
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/about" className="sidebar-link">
            About
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/services" className="sidebar-link">
            Services
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/contact" className="sidebar-link">
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
