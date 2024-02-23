import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../Stylesheets/Sidebar/Sidebar.scss";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Sidebar = () => {
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
    <div className={isOpen ? "sidebar active" : "sidebar"}>
      <div className="sidebar-toggle" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <a href="/TablePage" className="sidebar-link">
            <HomeIcon />
            Home
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/Organization" className="sidebar-link">
            <BusinessIcon /> Organization
          </a>
        </li>

        <li className="sidebar-item">
          <a href="/login" className="sidebar-link" onClick={handleLogout}>
            <ExitToAppIcon /> Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
